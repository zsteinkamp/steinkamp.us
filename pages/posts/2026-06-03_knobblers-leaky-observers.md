---
layout: post
title: "Knobbler's Leaky Observers: A Symbol Table Sequel"
date: '2026-06-03 12:00:00'
thumbnail: /images/2026-06-03-knobbler/studio-devices.jpg
tags:
  - Music
  - Nerd
  - Projects
  - Software
excerpt: |
  I thought I'd killed Knobbler's symbol-table leak. Then big sets kept getting slow anyway. The second culprit wasn't strings going out the network — it was LiveAPI observers leaking a handful of symbols every time I tore one down, and a scrolling mixer that tore them down by the thousand. The fix is a pattern worth knowing: bind by id, then pool.
---

[Knobbler](https://plugins.steinkamp.us/knobbler) turns a tablet into an auto-labeling, multitouch control surface for Ableton Live. A few weeks ago I [wrote about](/posts/2026-05-15-knobbler-and-the-max-symbol-table) chasing down a performance leak into Max's global **symbol table** — the process-wide hash of interned strings that never gets garbage collected, and that Max-in-Live shares with Live itself. The villain that time was *outbound OSC*: every distinct string my device emitted to a Max object got `gensym`'d into a permanent table entry, and a busy device emitted tens of thousands an hour. The fix was to build OSC packets as raw bytes and skip Max's atom system entirely. I shipped it, the table went flat in my tests, and I declared victory.

It was a premature victory.

{% captionedimage src="/images/2026-06-03-knobbler/studio-devices.jpg" alt="A studio desk: a monitor running Ableton Live with a multi-track mixer and meters, a Push controller, a phone, and two tablets each running Knobbler — one showing the multi-track mixer, the other the session clip grid" caption="The kind of session that exposed the leak: a big set on the monitor, with multiple tablets and a phone all running Knobbler at once. Every visible strip and clip cell is backed by a live LiveAPI observer — keeping the right ones alive, cheaply, is the whole story below." /%}

## The leak that wasn't fixed

Once the rawbytes pipeline was in, I went back to a real stress test: a friend's set with **37 tracks, 13 scenes, 432 clip cells**. Open it, connect the tablet, use the device the way you'd actually use it during a session — scroll the mixer, page through clips, poke around — and watch `; max size` (the message that asks Max to print its current symbol count).

It still climbed.

Not from outbound traffic this time — I'd fixed that, and re-measured to be sure. Connecting and sitting idle was clean. But *navigating* the device kept adding symbols. A fresh set + connect sat somewhere around 34–45k symbols. Scroll the mixer back and forth a few times and it would be at 60k. Page through the clip grid and it would jump by thousands per pass. Once it crept past ~100k, the whole environment — Live included — got noticeably sluggish, exactly the symptom that started the whole investigation. The string leak was real and worth fixing, but it had been hiding a second one underneath.

So back to the harness.

## Teaching the harness to ask about the LiveAPI

The test rig from last time (`k4-symbolTest`) is a `[v8]` object with one outlet wired to a `; max size` message; after every command it bangs that outlet so each operation prints the resulting symbol count. The delta is the signal: run an operation, see how many permanent symbols it cost. There's also a `prep`/`bench` pair — seed 200k shared-prefix symbols, then time re-looking-them-up — so a *slowdown* after an operation corroborates that it interned. As always: run it in a **fresh Ableton launch**, because the table is global and never resets until Live quits.

Last time I pointed the harness at string output. This time I pointed it at everything a navigation-heavy device does against the Live API — reads, path assignments, and the thing I suspected most, observers. The cleanest way to read the results is to sort every operation into one of two buckets: does it leave a permanent mark on the table, or not? (Live 12.4, Max 9.1.4, `[v8]`.)

**Free — leaves nothing behind (or a rounding-error handful):**

- Reading **59,715 distinct display strings** via `str_for_value` → **+13 symbols**. String reads don't intern.
- Reading **id-lists** (`clip_slots`, `devices`, `sends`, `scenes`) → **~0**. You can navigate the object graph by id for free.
- Creating **~234 observers** to fill the mixer page and keeping them alive → **+4**. Observer *creation* is essentially free.
- Re-pointing **one observer's `.id` 2,000 times** → **+8**. Reusing an observer is free.

**Interns — one permanent symbol per operation, forever:**

- Outletting **200,000 distinct primitive strings** (`prep`, the leak from last time) → **+200,002**. About 1:1.
- Assigning **1,000 distinct `api.path` strings** → **+1,014**. Path *writes* intern ~1:1.
- Creating **and then detaching 2,000 observers** → **+12,018** — about **six symbols per observer**, and the bench slowed from 95 ms to 144 ms. Observer *teardown* leaks, and detaching never gives the symbols back.

Two of those results reframed the whole problem.

**Reads are free.** I'd half-assumed that asking the LiveAPI for thousands of distinct device names, parameter values, and `str_for_value` display strings was quietly salting the table. It isn't — 59,715 distinct display strings cost *thirteen* symbols. In `[v8]`, those come back as `t_string` atoms, not `gensym`'d symbols. Same family as the `new String(...)` trick from last time. Id-list reads (`get('clip_slots')` and friends, which return arrays of numeric ids) are free too. So you can walk the entire object graph by id, reading names and values the whole way, for almost nothing. Good to *know*, but it meant my prime suspect was innocent.

**Creating an observer is free, but tearing one down leaks ~6 symbols — permanently.** This was the one. Spinning up 234 observers to populate a mixer page cost +4. But create-then-detach, 2,000 times, cost +12,018 — about six symbols per observer, and detaching never gives them back. Re-pointing an *existing* observer at a new target (`api.id = newId`) cost essentially zero.

That's a strange and specific shape, and it pointed straight at the part of my code I'd been quietly proud of.

## Where it bit: the windowing I thought was clever

Both the multi-track mixer and the session clip grid are *windowed*. I don't keep a live observer on every parameter of every strip in a 37-track set. I don't actually know whether Live's LiveAPI has a hard ceiling on how many observers can exist at once — I just bias conservative and don't want to find out, especially for multiplayer (several Knobbler instances on one set, all observing the same objects). So the windowing keeps observers only for the visible strips/cells plus a small warm margin, and as you scroll, it **evicts** observers that scrolled out of view and **creates** fresh ones for what scrolled in.

Read that last sentence again with the harness numbers in hand. *Evict* means detach — ~6 leaked symbols each. *Create* for the newly-visible ones is free, but the eviction is not. Every scroll pass detached a screenful of observers and leaked six symbols apiece, and a screenful is a lot of observers: per visible strip you've got volume, pan, mute, solo, arm, color, several sends, and meters. Scrolling back and forth across the mixer leaked 850–1,260 symbols *per pass*, unbounded. The clip grid was worse — paging through it added thousands at a time. My careful eviction logic, the thing keeping my observer count bounded, was the engine of the leak.

There was a smaller, separate cost too: I'd been binding those observers by **path** (`api.path = 'live_set tracks 4 mixer_device volume'`), and path *writes* intern ~1:1. Entering the mixer page alone cost +800 just from resolving all those distinct paths. So there were two things to fix.

## The fix, part one: bind by id, not path

Since id-list reads are free and path writes aren't, the first move is to stop naming objects by path. Resolve each object's id once — it's already known for tracks, and for their children it comes from a non-interning id-list read (`get('mixer_device')`, `get('volume')`, `get('sends')`, `get('clip_slots')`, and so on) — then create the observer against the empty path and assign the id:

```ts
const api = new LiveAPI(callback, '')  // the '' path is interned once, globally
api.id = volumeId                       // numeric — interns nothing
api.property = 'value'
```

The empty-string constructor path gets interned a single time for the whole process. Everything after that is numeric. This killed the per-object path interning *and* turned out to be about 1.7x faster, because the observer no longer has to resolve a path string into an object every time. Entering the mixer page went from +800 to +3.

That helped the clip grid's speed a lot, too — but its symbol count barely moved, because the clip grid's leak was never paths. It was the eviction churn. Which is the real fix.

## The fix, part two: pool the observers, re-point on scroll

The harness already told me the shape of the solution. **Teardown leaks; re-point is free.** So the windowing must never tear an observer down on scroll — it has to *reuse* the ones it already has.

So I rewrote the windowing as a pool. When the window moves, instead of "detach the cold ones, create the warm ones," it:

1. Computes `toAdd` (newly warm) and `toRemove` (now cold).
2. **Pairs them up** and, for each pair, re-points an existing observer at the new target — `api.id = newId; api.property = prop`. No teardown, no creation.
3. Parks any leftover removes in a **free pool**, and pulls from that pool to satisfy any leftover adds.
4. Only calls `new LiveAPI` when the pool is empty — a one-time growth, never on steady scrolling.

The key realization: when you scroll, the window size is *constant*, so `|toAdd|` always equals `|toRemove|`. Every scroll step is therefore pure re-pointing — zero teardown, zero leak, and faster than recreating. A fixed pool also **bounds the resident observer count by construction**, which is exactly what the original eviction was there to guarantee in the first place. I got the bounded footprint *and* the leak fix from the same structure.

Real teardown now happens in only one place: a genuine rebuild, when the track list or scene count actually changes. Even those got cheaper. The mixer keys its strips by **track id**, which is stable, so adding a track just creates one new strip and leaves the rest alone. The clip grid keys cells by **position** (column, row), which shifts when you insert a track — so its rebuild *parks* residents into the pool instead of detaching them, and re-points only the columns whose track id actually changed. Appending a track at the end touches nothing but the new column.

## The results

Same set — 37 tracks, 13 scenes, 432 clips, Max 9.1.4:

| Action | Before | After |
|---|---|---|
| Enter the mixer page | +800 | **+3** |
| Mixer scroll, per back-and-forth pass | +850–1,260 (unbounded) | **+0** |
| Clips scroll, per pass | +1,300–10,700 (unbounded) | **+0** |
| Add a track (mixer page) | — | **+68** (one new strip) |
| Add a track (clips page) | +4,000 | **+30–270** (one new column) |
| Session trajectory | climbs past 100k → degraded | **plateaus ~49k and holds** |

That last row is the whole point. What's left after the fix is *bounded, one-time first-touch* cost — Live interning its own clip and track objects the first time you ever observe them. It saturates once you've explored the grid once and then never climbs again. The table went from monotonically growing — which is a memory bug wearing a performance bug's clothes — to a flat plateau, comfortably under the threshold where things get slow.

## What I took away

- **Reads are cheap; lifecycle is expensive.** I'd been bracing for the wrong thing. Asking the LiveAPI for tens of thousands of distinct strings costs nothing; the cost is in *how you manage the observer objects*, not in what you read through them.
- **"Evict and recreate" is a trap when teardown isn't free.** It reads as tidy resource management. With a leaky teardown, it's an unbounded leak dressed as good hygiene. Pooling and re-pointing is both cheaper and safer.
- **The same structure can fix two bugs.** The observer pool flattens the symbol leak (a correctness-class memory bug) *and* keeps the resident observer count bounded *and* runs faster, all from one change. Those felt like three separate problems before; they had one answer.
- **Measure, then cut — again.** Last time the lesson was that `str_for_value` looked guilty and wasn't. This time my own clever windowing looked innocent and was the whole problem. The harness is the only reason I aimed at the right thing instead of the obvious thing.

I really did think I'd finished this story a few weeks ago. Turns out the symbol table had a sequel in it. This time I ran the numbers before I called it — and the plateau has held.
