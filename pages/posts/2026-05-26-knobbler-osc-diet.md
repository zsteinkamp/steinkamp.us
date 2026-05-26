---
layout: post
title: "Knobbler's OSC Diet: From One Message at a Time to Columnar"
date: '2026-05-26 12:00:00'
thumbnail: /images/2026-05-26-knobbler-osc-diet/columnar-code.jpg
tags:
  - Music
  - Nerd
  - Projects
  - Software
excerpt: |
  Knobbler pushes a firehose of OSC between a Max for Live device and a tablet app. Over a few years the wire format evolved through five distinct tricks — single messages, coalescing, batching, chunking, and finally a columnar encoding — each one solving a specific kind of waste. Here's the progression, with real payloads and the bytes saved at each step.
---

[Knobbler](https://plugins.steinkamp.us/knobbler) turns a tablet into an auto-labeling, multitouch control surface for Ableton Live. A Max for Live device on the Live side talks to the companion app over [OSC](https://en.wikipedia.org/wiki/Open_Sound_Control) (Open Sound Control — small messages over UDP). It is a _chatty_ relationship: thirty meter updates a second per visible track, the whole clip grid lighting up as scenes fire, names and colors streaming in as you scroll the session.

I've [written before](/posts/2026-05-15-knobbler-and-the-max-symbol-table) about a different axis of this problem — how emitting strings to Max objects slowly poisons the symbol table. This post is about the _shape of the payloads_ themselves. Over a few years the wire format grew up through five distinct techniques, and the fun part is that each one targets a specific, nameable kind of waste — and each is easy to demonstrate with a real payload and a byte count.

The throughline: **feature code never changed.** Every module just calls [`osc(address, value)`](https://github.com/zsteinkamp/m4l-Knobbler4/blob/4c3a28799a5eec9c2effefcd7912426d154dc943/src/utils.ts#L217). All five optimizations live in one outbound pipeline that decides how that turns into bytes on the wire.

## 1. One message at a time

The naive baseline: every value is its own OSC packet.

```
/val1 0.5
/val2 0.32
/val3 0.81
… (29 more)
```

When the app connects, the device pushes the state of all 32 mapped-parameter slots. That's 32 separate UDP datagrams, each carrying an address (`/val12`), a 4-byte float, and OSC's padding overhead — call it ~16–20 bytes of packet to deliver 4 bytes of payload. Thirty-two tiny packets to say "here's the current state."

It works, and for a single knob move it's exactly right. The waste shows up when _many_ values change at once, or when _one_ value changes _constantly_.

## 2. Coalescing: collapse rapid repeats

Drag a slider and your finger can generate a hundred or more touch events a second. Each one wants to send `/val7 <new value>`. But the app on the other end can't render faster than the display refresh, and the intermediate values are stale the instant they're produced.

So the pipeline **coalesces per address**: a leading-edge throttle that sends immediately, then suppresses further sends to the same address for ~15 ms, keeping only the latest value and emitting it on a trailing edge. A 200-event-per-second drag becomes ~66 sends a second, no perceptible latency, and the app still lands on the exact final value when you let go.

Same idea protects the meters — they fire every few milliseconds during playback; coalescing keeps them to a sane rate.

## 3. Batching: one envelope for many values

Coalescing fixes _one address changing fast_. Batching fixes _many addresses changing at once_ — like that connect-time push of 32 slots.

Numeric values that land in a short (10 ms) window get folded into a single `/batch` envelope:

```
/batch {"/val1":0.5,"/val2":0.32,"/val3":0.81, … }
```

Thirty-two packets become **one**. The byte count is similar, but the _packet_ count — and the per-packet kernel/network overhead, and (crucially for Max) the number of times we cross the JS→Max boundary — drops by 32×. On a busy connect or a page switch, that's the difference between a smooth fill and a visible stutter.

## 4. Chunking: when one message is too big

Some payloads aren't a stream of scalars — they're a whole _structure_. The navigation tree, the list of scenes, the clip grid. These can be many kilobytes, and a UDP datagram has practical size limits; past them, packets get fragmented or silently dropped, and a half-delivered structure is worse than none.

So large arrays are **chunked**: split into a `/foo/start` (count), a series of `/foo/chunk` pieces each kept under ~1 KB, and a `/foo/end` carrying a checksum. The app reassembles the pieces and verifies the checksum before using them — if a chunk went missing, it re-requests rather than rendering garbage.

```
/nav/devices/start 142
/nav/devices/chunk [ …~1KB… ]
/nav/devices/chunk [ …~1KB… ]
…
/nav/devices/end  1734892461
```

(This one bit me in production: a user with a deep set saw blank panels because a structure was overrunning what the app could receive. Chunking — plus a UTF-8 encoding fix — was the cure. A good reminder that "it works on my set" is not a size test.)

## 5. Columnar: stop repeating yourself

Here's the one I just shipped, and the most satisfying. Several of those structures are **arrays of objects** — and JSON arrays of objects repeat every key, in every record:

```jsonc
// /clips/update — six clip cells changed state
[ {"t":0,"sc":0,"s":2,"n":"Kick","c":"5480E4","hsb":1},
  {"t":1,"sc":0,"s":1,"hsb":1},
  {"t":2,"sc":0,"s":2,"n":"Hat","c":"00BFAF","hsb":1},
  … ]
```

Every record re-sends `"t":`, `"sc":`, `"s":`, `"hsb":`… The _keys_ are often more bytes than the _values_. With N records you pay for the schema N times.

The fix is a columnar encoding — the same idea a database or a CSV uses. Name the columns once, then send rows of bare values:

```jsonc
// /columnar  →  [ originalKey, columns, ...rows ]
[ "/clips/update",
  ["t","sc","s","n","c","hsb"],
  [0, 0, 2, "Kick", "5480E4", 1],
  [1, 0, 1, null,   null,     1],
  [2, 0, 2, "Hat",  "00BFAF", 1],
  … ]
```

The keys appear _once_. Absent fields (that second cell never changed its name or color) become `null` and are dropped again on the receiving side, so the decode is lossless — a present `0` stays `0`, an absent field stays absent. The app pulls the original key back out and re-dispatches the reconstructed array to exactly the handler that always processed it. Nothing downstream knows the difference.

{% captionedimage src="/images/2026-05-26-knobbler-osc-diet/columnar-code.jpg" alt="The columnar decoder in the Knobbler app's OscHandler: it parses the flat array, reads the column names, and rebuilds each object row, skipping null fields" caption="The whole trick on the receiving side: read the columns once, rebuild the rows, drop the nulls. The original handler never learns it arrived columnar." /%}

The savings scale with the record count and with how key-heavy the schema is. For the example above, the object form runs ~330 bytes; columnar lands near ~170 — roughly **half**. A 95-scene `/clips/scenes` list (`{"n":…,"c":…}` per scene) drops by a third. The more records, the closer you get to "keys paid once" instead of "keys paid N times."

And because I shaped the envelope as a flat array rather than a nested object, a large columnar payload still flows through the chunker from step 4 — so the two stack: shrink the structure, _then_ split whatever's left. Fewer chunks also means fewer chances for a dropped piece to fail a checksum.

## The part that makes it maintainable

Two things kept this from becoming a tangle:

- **It's all in the send pipeline.** Feature code calls `osc('/clips/update', cells)`. The pipeline detects an array of objects, columnarizes it, chunks it if it's still big, and emits. Decode is symmetric on the app side. No feature ever learned about any of this.
- **Every step is capability-negotiated.** On connect, the app advertises what it understands (`batch`, `cNav`, `chunkAny`, `col`, …). The device only uses an encoding the connected app can decode, and falls back gracefully otherwise. So a new device and an old app — or vice versa — still talk; they just talk plainer.

So, five distinct kinds of waste leading to five chained solutions: too many packets for one value, too many packets for many values, payloads too big for a packet, and schemas repeated per record. None of it changed what Knobbler _does_ — it just made the firehose fit comfortably through the pipe, transparently and reliably.
