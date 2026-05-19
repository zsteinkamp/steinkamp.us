---
layout: post
title: Knobbler, the Max Symbol Table, and a Migration to v8
date: '2026-05-15 12:00:00'
thumbnail: /images/2026-05-15-knobbler/max-size-output.png
tags:
  - Music
  - Nerd
  - Projects
  - Software
excerpt: |
  A puzzling benchmark led me down a rabbit hole into how Max stores strings, why my device was slowly poisoning the Max environment, and what I learned migrating 5,000 lines of TypeScript from [js] to [v8].
---

Knobbler is the Max for Live device I've been maintaining for several years. It pairs with the Knobbler companion app on iPad, iPhone, or Android to turn the touchscreen into an auto-labeling, auto-coloring, multitouch control surface for Ableton Live. Under the hood there's about 5,000 lines of TypeScript that compiles to JavaScript and runs inside Max's `[js]` JavaScript engine. It sends and receives a fair amount of network traffic — meter levels alone can update 33 times a second per visible track.

Performance has always mattered. I'd done a round of benchmarking earlier this year comparing Max's older `[js]` engine to the newer `[v8]` engine, which uses Google's V8 (the same JavaScript engine that runs in Chrome and Node.js). The results were puzzling. `[v8]` came out 3-4x slower than `[js]` on basically every operation that touched the LiveAPI or the outlet bridge. The only thing it was faster at was pure JavaScript computation, where its modern JIT compiler ate `[js]`'s lunch.

That didn't sit right. V8 is famously fast. Why would the actual hot path of a Max for Live device get *slower*?

I tabled the question and shipped the benchmarks as-is. The optimistic note in my notebook said something like "v8 has Task memory leak issues anyway — wait for Max 9.1." So I waited.

## The benchmark that made no sense

Months later, I came back to it. I wanted to revisit the dream of moving to v8 for the modern JS features and better garbage collection. I emailed [Joshua Kit Clayton](https://cycling74.com/about), who works on JavaScript at Cycling '74 (the makers of Max), with the harness code and asked what was going on.

He came back within a day. He'd run the benchmark himself, in the opposite order — `[v8]` first, then `[js]`. The results flipped. `[v8]` was now *2x faster* than `[js]`, not 3-4x slower. The *only* difference was which engine ran first.

Then he explained why. My benchmark was specifically polluting Max's *global symbol table*. And this happens regardless of which JS engine you use — it's a Max-level thing, not a v8-vs-js thing. Whichever engine ran second was paying the inflated cost of looking up symbols in a hash table that the first run had bloated.

## What the symbol table actually is

Max has a global hash table of interned strings called the **symbol table**. Every time a `[js]` or `[v8]` script does something like:

```js
outlet(0, ['/mixer/meters', '[0.12,0.45,...]'])
```

…the strings `/mixer/meters` and `[0.12,0.45,...]` get *interned* — converted into permanent entries in this hash table — before they can be sent as Max atoms. The table is process-wide, never garbage collected, and lives for the life of Max.

Symbols aren't just a string-deduplication mechanism. They're also how Max's `[send]`/`[receive]` system works internally. So every property name, every message selector, every patch object's scripting name is in there too. It's load-bearing infrastructure.

Joshua's specific diagnosis cut even deeper:

> If the strings that are turned into symbols hash to the same value because they have the same prefix, then there will be collisions that then compare the strings to see if a new symbol needs to be generated. So in general, it's not good form to create lots of symbols with the same prefix.

The hash function Max uses is *prefix-sensitive*. So if you keep emitting strings like `[0.12,`, `[0.45,`, `[0.33,` — all the same `[0.` prefix — they all hash to nearby buckets. Each lookup has to walk a longer linked list before it finds a match or decides to make a new entry. The entire Max environment slowly gets slower.

And what was my Knobbler doing? Sending things like this every 30ms:

```js
outlet(0, ['/mixer/meters', numArrToJson(meterBuffer)])
// produces: ['/mixer/meters', '[0.12,0.45,0,0.33,0.81,...]']
```

About 33 fresh JSON strings per second per device, all with the same prefix, all permanently bloating Max's global symbol table. About 120,000 new dead symbols per hour of meter use. The Max environment got slower and slower the longer Knobbler ran.

Oh. My. Goodness.

## Testing what actually bloats

First I needed a way to *see* the table. Turns out Max will tell you: send the message `; max size` (the leading semicolon makes it a global send to the `max` object) and Max prints the current symbol count to the Max window.

{% captionedimage src="/images/2026-05-15-knobbler/max-size-message.png" alt="A Max message box containing the text '; max size'" caption="The message box that asks Max how big its symbol table is." /%}

After a clean launch I'd see something like `1973 static symbols` and `40789 symbols in memory`. Run a suspect code path, send `; max size` again, and any growth in that second number is symbols the path leaked into the table.

{% captionedimage src="/images/2026-05-15-knobbler/max-size-output.png" alt="The Max console showing two pairs of '1973 static symbols' / '40517 symbols in memory' and '1973 static symbols' / '40789 symbols in memory' messages" caption="Two checks a few seconds apart: 272 new symbols snuck into the table between them." /%}

With that I wrote a small test harness that does three things:

1. **prep** — pre-create 200,000 shared-prefix symbols (`sym_0` through `sym_199999`) and intern them.
2. **bench** — outlet those same 200,000 symbols and time how long it takes. After a clean Max launch this is the baseline.
3. **stress** — exercise some candidate code path that *might* leak symbols. Then run **bench** again. If the second bench is slower, the stress polluted the table.

Each test needed a fresh Live launch to reset the symbol table. The results came out crystal clear:

| What the stress did | Bench time before | Bench time after | Verdict |
|---|---|---|---|
| `outlet([addr, freshString])` × 50k | 91ms | 103ms | Bloats (+13%) |
| `outlet([addr, freshString])` × 500k from `[v8]` | 91ms | **301ms** | **Bloats (+230%)** |
| `outlet([addr, new String(s)])` × 500k from `[v8]` | 91ms | 89ms | **No bloat** |
| `dict.set(fixedKey, freshString)` × 50k | 100ms | 100ms | **No bloat** |
| `dict.set(freshKey, fixedVal)` × 50k | 91ms | 98ms | Bloats (+8%, mild) |

Two findings stood out.

**Max Dict values don't intern.** I had wondered about this — Dicts have existed since Max 6, predating the modern `t_string` atom type. Their internal string storage *could* have used regular symbols, in which case writing high-cardinality strings into a Dict would just move the leak. It doesn't. Dict values are safe.

**`[v8]`'s `new String(...)` doesn't intern either.** Wrapping a JS string in `new String(...)` makes `[v8]` emit a `t_string` atom instead of `t_symbol`. Same string contents, different atom type, no gensym call, no bloat.

Both of those findings pointed at clean architectures for fixing the leak.

## A wrong turn, then the right turn

My first design used Dicts as an intermediate. Each Knobbler module would write its payload to a shared per-instance Dict (keyed by OSC address), then emit a tiny fixed control message saying "hey, dict has data for `/mixer/meters`, please ship it." A separate `[v8]` adapter would read the Dict and send to `[udpsend]`, the Max object that puts OSC bytes onto UDP.

It worked. But it added a layer — a per-instance Dict, a control message, a sender adapter object in the patcher — and it only existed because half the codebase was still on `[js]`. Once I made the call to migrate *everything* to `[v8]` (Ableton Live 12.4 ships Max 9.1.4, which fixes the v8 memory leak issues that had been blocking me), the Dict layer became unnecessary.

I tried `new String(...)` instead. Have modules call `outlet([addr, new String(JSON.stringify(value))])` directly. v8's atom would be a `t_string`, `[udpsend]` would do its normal OSC formatting, no leak. Beautiful.

I deleted the entire Dict architecture and shipped the simpler version.

Then I turned it on and Live filled the console with:

```
udpsend: OpenSoundControl: unrecognized argument type
udpsend: osc unrecognized argument type
udpsend: OpenSoundControl: unrecognized argument type
... (hundreds more)
```

Turns out `[udpsend]`'s OSC packer doesn't know how to encode `t_string` atoms. It knows symbols. It doesn't know strings. The `new String(...)` trick is symbol-safe at the JS side but breaks the rest of the pipeline.

Tempting workaround: convert the `String` back to a symbol just before handing it to `[udpsend]`. There are objects in Max that'll happily do that. But the moment you do, you've reinvented the leak — every unique string gets `gensym`'d on the way through, and the symbol table fills up just as fast as it did before. The problem just moved one hop down the chain.

So close.

## rawbytes to the rescue

`[udpsend]` in Max 9 has a `rawbytes` message that takes a list of byte values and ships them as a UDP packet, completely bypassing its OSC formatter. If I build the OSC packet bytes myself in JavaScript, I can hand `[udpsend]` the raw bytes and skip every part of the Max atom system for the variable-content payload.

OSC binary format is pretty simple: a null-terminated address string padded to 4 bytes, a comma-prefixed type tag string padded the same way, then the args (32-bit big-endian for ints and floats, padded strings for strings). About 50 lines of TypeScript to build the packet.

The final architecture ended up cleaner than either of the earlier attempts. There's a single helper `osc(addr, value)` that everything goes through:

```ts
export function osc(addr: string, val: any) {
  if (typeof val === 'number') {
    // Numeric args are symbol-safe via udpsend's normal path
    outlet(OUTLET_OSC, [addr, val])
    return
  }
  // Strings, objects, arrays — build the packet bytes and send rawbytes
  const bytes = buildOscPacket(addr, val)
  outlet(OUTLET_OSC, ['rawbytes', ...bytes])
}
```

Numeric values take the fast path with no overhead — Max never interns numeric atoms, so they can't touch the symbol table no matter how many you send. Anything else gets packaged as raw OSC bytes and skips Max's atom system entirely. The wire format on the network is identical to what `[udpsend]` would have produced — the receiving app didn't have to change a thing.

## The migration gotchas

Moving 11 JavaScript modules from `[js]` to `[v8]` surfaced a small parade of latent bugs that `[js]` had been forgiving about. If you're considering the same migration, watch for these:

**`[v8]` is stricter about types at the LiveAPI boundary.** `LiveAPI.id`'s setter requires an integer. `[js]` happily accepted the strings that `LiveAPI.get(...)` returns and converted them implicitly. `[v8]` doesn't. I had a utility function whose declared return type said `number[]` but was actually returning `string[]` — `[js]` had been tolerating the lie for years. The fix cascaded automatically to dozens of call sites once I made the function honest.

**LiveAPI observer args come in the documented order.** A property observer's callback receives `[propertyName, value]`. That's what `[v8]` delivers. `[js]` delivered them *reversed* — `[value, propertyName]` — and code in my codebase had quietly grown up around the wrong order. One specific case: my sidebar mixer's track-change handler was checking the wrong array index, so the strip silently stopped updating on every track switch.

**`refresh` is reserved.** Several modules had a `function refresh()` invoked via a Max message from the patcher. Under `[js]` this worked fine. Under `[v8]`, the message never reaches user code. Max intercepts `refresh` before dispatch — even an `anything()` catch-all doesn't see it. Cost me hours. The fix: rename `refresh` to anything else.

## What it taught me

Going in, I thought I was investigating a minor performance question. Coming out, I'd touched almost every module in the codebase and learned a stack of things I hadn't known:

- Max has a global symbol table whose performance characteristics affect everything in the Max environment, not just my device.
- That table's hash function is sensitive to shared string prefixes in a way that punishes high-cardinality structured data like JSON.
- The fix isn't avoiding strings — it's avoiding *interning* them. Either don't make them into Max atoms at all (rawbytes), or use atom types that don't intern (`t_string`, but only if the receiver knows what to do with it).
- The newer `[v8]` engine isn't a drop-in replacement for `[js]`. It's stricter about types, dispatches messages slightly differently, reserves some message names, and exposes behavior that `[js]` was quietly papering over.
- Reaching out to experts is almost always worth it. Joshua's two-sentence email saved me weeks of guessing. (See also: the [trail work post](/posts/2026-03-03_how-i-got-into-trail-work) and Troy.)

A friend at Cycling '74. A test harness I can run again any time. A symbol-safe outbound OSC pipeline I can trust. And the warm feeling of finally understanding *why* my benchmarks were lying to me a year ago.

Not bad for a debugging session that started with "wait, why is `[v8]` slower?"
