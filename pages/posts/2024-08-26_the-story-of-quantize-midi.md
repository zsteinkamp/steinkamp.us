---
layout: post
title: The Story of Quantize MIDI
date: '2024-08-26 12:00:00'
thumbnail: /images/quantize/device.png
tags:
- Music
- Projects
- Nerd
excerpt: |
  All about the Max for Live device that can variably quantize a MIDI note stream in real time.

---

I was making mashed potatoes.

I was making mashed potatoes in the Chamba, a fantastic clay pot from Colombia that we procured as a result of Naomi's first job at the fancy kitchen store in town giving them as a new hire gift.

![Chamba!](/images/quantize/chamba.jpg)

The potatoes were boiling in the water and the lid was on. The Chamba lid fits "pretty well", so there is a tiny gap where starchy bubbles were forming and popping.

I put my ear up to it and heard an amazing and super random sizzling sound, as the thousands of bubbles each found their individual demise on their own damn schedule.

Out comes the iPhone, load up the sound recorder app, hold the phone mic right up to the bubbles. Look at the size of that waveform! It's loud when you're 5mm away.

{% audio src="/images/quantize/potatoBubbles.mp3" /%}

With the sound recorded, it's an easy "Save to Files..." away and one tap to store on my NAS at home in the "sounds" folder, where my main music computer can see it easily. No cloud necessary.

This got me thinking of what I might do with this cool recording. It was so random! In Ableton Live, you can easily do a transient detection on the audio, then snap those transients to a grid or a groove, in varying intensity. That could be interesting to remap the pops to a swung groove, each one unique, but a repeated pattern eventually emerging.

This then got me thinking ... what about the transition from unquantized to quantized? In Ableton Live it's a static property of a clip or a groove; it cannot be automated. If I wanted to morph my bubbles from unquantized to quantized, I would need to chop up the recording into segments, each of whom have their unique quantize amount set. So it would be a stair-step at best, and very cumbersome to manage.

So this got me thinking about the flexibility of MIDI in this situation, and Ableton Live's "Slice to MIDI" function where an audio sample is split on its transients and mapped to different one-key zones in a sampler. The original timing is preserved, so this could be the ideal input case to a device that can morph between unquantized and quantized.

I looked for a while for an existing device that could do that, but none had the concept of adjusting the quantization amount in real time, so I got to building it!

I love a challenge like this.

The first solution idea I came up with had a fatal flaw -- it could not handle simultaneous notes properly. This showed up as a garbled emission of note-ons and note-offs as several notes were quantized to the same time value, the net result being a huge repetition of near-zero-length notes being received by the downstream device.

After a couple more major iterations, I settled on a design using Max's [poly~] container to house 128 instances of a note delay. This many instances is necessary so that if a given note is repeated several times before the first note is actually played by the delay, then several notes will stack up simultaneously and be emitted in a huge burst of note-ons. The way that I wanted it to work was that in the case of several notes being input prior to the first note actually making it through the delay would be that only that one note should play, not the N more stacked up that would be quantized to play at that exact moment.

{% youtube src="https://www.youtube.com/embed/qPgCE0wBLYE" title="Demonstration with audio" /%}

So the approach of choosing a [poly~] target based on MIDI note number felt like the right solution.

With the large number of [poly~]s, there is a danger of the device being a CPU hog. 

Following the example of the optimization in Live 12 to the multimapper (as in the LFO device) where [poly~]'s mute and DSP states were actively managed to minimize CPU usage, and there is no noticeable CPU usage on my MacBook Air.

Each of the [poly~]s has a pair of [delay] nodes - one for note-on, and one for note-off. I preferred the idea of the note duration being retained, rather than quantizing the note-offs separately. Perhaps I'll add that in a future version.

So thanks to some mashed potatoes in the Chamba, we can have Quantize MIDI.

Please let me know if you have any questions, problems, suggestions, or cool uses for Quantize MIDI!
