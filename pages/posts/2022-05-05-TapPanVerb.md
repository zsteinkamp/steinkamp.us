---
layout: post
title: TapPanVerb - A Reverb + Delay Tap Field + Feedback Effect
date: "2022-05-05 12:00:00"
thumbnail: /images/tapPanVerb.png
---

Last week I had an idea for an effect. I was thinking that a reverb effect should give you control over the pan position of the reverb at a given time after the initial impulse enters the reverb. This could make for some neat movement, since it's not just panning the whole reverb signal -- each moment of the reverb's tail has its designated pan position.

After a walk through my current reverb plugins, I decided that I needed to build this if I wanted to hear it.

My first attempt was to mock up the idea with an audio effect rack with 5 chains. The chains were panned hard left, mid-left, center, mid-right, and hard right, giving me 5 positional sources. In each chain, I added a delay and a reverb. I set the delays to increasing values -- 100ms, 200ms, 300ms, etc. This ended up being a cool effect on its own -- with reverb blooms emerging across the stereo space, but my original idea was less bloomy and more smooth in its movement. So into Max For Live we go!

Here is the result of that design, with a demo for various settings:

## Feedback Sewerscape

![Demo A](/images/TapPanVerb/showoff-A.png)
{% audio src="/images/TapPanVerb/showoff-A.mp3" /%}

Hard panning left to right with a whip in the middle of the tap field, also showing off reverb and feedback pretty liberally.

## Life In a Cotton Ball

![Demo B](/images/TapPanVerb/showoff-B.png)
{% audio src="/images/TapPanVerb/showoff-B.mp3" /%}

Showing off just how rich a simple reverb can become when it is dispatched through dozens of taps, spread across space and time.

## An Impossible Cavern

![Demo C](/images/TapPanVerb/showoff-C.png)
{% audio src="/images/TapPanVerb/showoff-C.mp3" /%}

Turning a simple 808 pattern into something from a future factory robot rom-com.

## A Very Curious Diplomat

![Demo D](/images/TapPanVerb/showoff-D.png)
{% audio src="/images/TapPanVerb/showoff-D.mp3" /%}

A good demonstration of how panning + delay coefficient modification can make for interesting soundscapes, even with sparse source material.

## Installation

Visit the [source code repository](https://github.com/zsteinkamp/m4l-TapPanVerb) for download links and installation instructions.

## Implementation

I made some important design decisions along the way:

- The delay taps work as a bucket-brigade, with one tap sending its output to both the plugin output and the next tap in the sequence. The plugin input is connected to tap 1, which is connected to tap 2, and so on. This makes interesting delay modulation easier to implement, since each tap maintains its own delay line logic. It also allows for future ability to insert effects into the delay loop, which can produce cool effects in a bucket-brigade configuration.
- The reverb is at the front of the processing chain. With 128 possible taps, putting a reverb in each one overloads even a powerful computer. So the decision was between putting the reverb in front of the taps or behind. I chose the front, since the output could be much more "blurry" that way. By implementing a reverb mix control, it can be as edgy as you like.
- The feedback loop feeds into the reverb. This makes for even blurrier effects if you are using both feedback and reverb.
- The feedback loop is always modulating its delay frequency. I found this led to a more pleasant feedback sound, and avoids some howling overload situations. There is potential for adding more control over this modulation, currently set to modulate +/-50% of the delay time over a period of 2 seconds.

This was a great learning experience for me, since it gave me a chance to really get to know the `poly~` object, with sending messages to all or one of the internal voice instances. It was also cool to figure out how to implement the bucket-brigade taps in a way that can scale to any number of taps without modification.

[Clone the repository](https://github.com/zsteinkamp/m4l-TapPanVerb) to have a look at the device files. I've put them together with others in mind, with sensible organization and lots of comments. Let me know if you find something to improve, or if you have other ideas to make this even better. Email me at zack@steinkamp.us
