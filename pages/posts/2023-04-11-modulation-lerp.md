---
layout: post
title: "New Max for Live Device: Modulation Lerp"
date: "2023-04-11 12:00:00"
thumbnail: /images/lerp/lerp.png
---

Yesterday after work I was reading my personal email, and a very sincerely
interesting email was waiting for me. My strategy of putting my email address
everywhere has been paying off in the contacts I've been making, and today was
no exception.

Good Ben Sulzinsky shared an idea of his for a modulation machine that I loved
from the beginning. His idea could be accomplished a string of the stock Live
LFOs, but the ergonomics of that solution were really lacking.

Ben's idea was to have explicit controls for lower and upper bounds (`Input A` or
`Input B` -- neither has to be greater than the other) and a third control `A <=> B` for
the linar position between `A` and `B`. So with `A <=> B` at 50%, then a
value halfway between `A` and `B` would be returned. At 0%, then `A` would be
returned. You guessed it -- 100% `A <=> B` means that `B` is returned.

![Lerp close up](/images/lerp/lerp.png)

This gives you some neat shaping abilities if you manually control `Input A` and
`Input B` but have an LFO modulating `A <=> B` for a vibrato that you can really
control the shape of.

Or connect LFOs to all three inputs and get some neat effects that are halfway
to FM for your modulation data.

{% video src="/images/lerp/lerp.mov.mp4" type="video/mp4" autoPlay=true loop=true /%}

It can be pretty hypnotizing...

{% video src="/images/lerp/lerp2.mp4" type="video/mp4" autoPlay=true loop=true /%}

You can [download the device or read more about Modulation Lerp on its GitHub page](https://github.com/zsteinkamp/m4l-Modulation-Lerp).
