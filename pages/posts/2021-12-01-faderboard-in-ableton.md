---
layout: post
title: Vestax Faderboard (-ish) In Ableton Live
date: '2021-12-01 12:00:00'
categories: post
entry:
  source: post
---

## ===================
## UPDATE AVAILABLE

I've re-implemented this as a self-contained M4L device with more similar functionality to the original Faderboard, along with some additions like MIDI note control and multiple outputs.

[Read about the updated version here.](/post/2022/01/08/Faderboard-Version-3.html)

## ===================
## Original post is below...

Hainbach [released a video today](https://www.youtube.com/watch?v=E1Kr0EJwZ-c) on the Vestax Faderboard. As soon as I saw how it worked, I knew that this was something very cool and interesting.


{% youtube src="https://www.youtube.com/embed/E1Kr0EJwZ-c" title="YouTube video player" /%}

What Hainbach demonstrated over the next half hour was mesmerising and even before the video was done, I was planning out how I would make one of these in Ableton Live.

tl;dr I have made something fairly similar. You can [download it here](/audio/zsFaderboard.alp). Just double-click the file to see the contents. The CC to Note and a sample device (a recording of a singing bowl I made) are included.

Here is a demo of it working. The automation lines are each controlling one of the note voices. You can see the row of knobs at the bottom of the screen changing. Sharp rises in the automation give percussive effects with this singing bowl recording. I have 8 MIDI hardware knobs mapped to the 8 note knobs in the interface.

{% youtube src="https://www.youtube.com/embed/wC8h_WrjJrE" title="YouTube video player" /%}

## The Story

While thinkiing about how I would make a Faderboard, the first challenge I could see in replicating it was to have some kind of knob device that both initiated a sustained MIDI note, but could also control that note's volume as it played. As far as I know, there is nothing that already does this in Ableton Live.

After some Googling, I found a M4L device linked from [this discussion](https://forum.ableton.com/viewtopic.php?t=156544) (the download link doesn't work from the page, but I figured out how to download it -- It's bundled in the .zip file below). The device is called 'CC to Note'.

This device was the perfect starting point -- it was a knob and a note value (pitch). When the knob is turned past zero, a MIDI note of the selected pitch is sent. If you place a Sampler (or Simpler) device in this chain, then it seems you are getting somewhere. The knob in the CC to Note device could be mapped to control volume of the sampler. If there were 8 CC to MIDI devices, then we could have 8 knobs and 8 different notes, and we'd be there, right?

Wrong. While it does work to trigger 8 notes, there is only one single, global volume control for the sampler device. There is no per-voice volume. :(

## Enter the MPE

I had an idea that perhaps this problem could be solved by MPE. In MPE, individual notes can carry individual pressure, bend, and slide messages. Simpler and Sampler have been enhanced in Live 11 with good MPE support, so if I could make the CC to Note Max4Live device also emit MPE data when the knob changes position, perhaps I could map MPE Pressure to note volume. So I modified the device to do this. It was much easier than I thought, especially having found a good basic MPE patcher in the M4L community site.

Now what I SHOULD have done was check to see just what could be controlled with MPE in Sampler and Simpler. The only parameters that support MPE messages have to do with note pitch, not volume. Damnit, oh well. At least I learned some cool stuff about M4L and MPE.

## Strength in Numbers

Now we're at Plan C, which was the original Plan A but I rejected it because I didn't want to have 8 copies of the Sampler device. Well, that's what I ended up doing. Going back to the original CC to Note device, but this time in an Instrument Rack. The Instrument Rack has 8 chains, one for each voice. In each chain, there is a CC to Note device followed by a Simpler.

The different CC to Note devices are configured for notes C3, D3, E3, F3, G3, A3, B3, C4. To edit those values, you will need to click into each chain and change it.

The 8 knobs on the 8 CC to Note devices are mapped to the Instrument Rack knobs 9-16. This way, you can MIDI-map 8 fader or knob hardware controllers to the 8 voice knobs. I have 8 knobs on my BCR-2000 mapped to control these knobs.

Instrument Rack knobs 9-16 are also mapped to control their respective Chain Volume, which now gives us the volume control over each voice.

The rest of the Instrument Rack knobs control:
1. Pitch Shift (+/- 48 semitones)
2. Filter Cutoff
3. Filter Resonance
4. Filter Drive
5. Loop Start
6. Loop Length
7. Loop Fade
8. Instrument Volume

[Download an Ableton Live Pack (.alp) here](/audio/zsFaderboard.alp). Double-click the downloaded file to install it into your Ableton Live library. Requires Live 11.

## M4L Device To Trigger a Note + a Dial

Select and copy the block below to the clipboard, then choose "File ... New From Clipboard" in Max.

```
----------begin_max5_patcher----------
1055.3ocyXs0bZqCD9Y3WgGedkjwxFv39FTt7V+CzoSFCnjnViDisLMsc5+8
iz9IykDHwT6bN8g7sYWK+sWDZ0B+paG+kpm3E9dev6ydc57qtc5PlrF53z63
uI8oUYoEzx7k7uqV9U+d3QZ9SZx7Oy7x46pLKK2HjYbM8JgNih0zJMu8Mrfp
UduRpKD+jaeDK31fCDnJ0OmAXR+isbDw998L+48ki3Rltgdn+3bQZl2DU15J
WsMUu5Qg7g6x4qzffQFG5whCshngVLzDCdew9B+taWKzqY0ksoq9lWfWPcqL
CupBC6hElFWT5GYECBZTQISrie6FtrrxcoRoRmpEJI87Jy6Ry2Giu3c1lqzJ
atseIeRo4dexnUbXM7BtDLeTpDRIQeJi5GS40.apbtMC1K2L5O3PYJ23NMO+
NSTrLie7Kb5VRzYhnWeqpG969LUp9v91Y1XhRnLfkbgzoHcGe8coZctXYole
3+JbaQt8Ha8Nqjqtuxbk8SyyxMtH7i2DZCvO9OPN0IbpyfXtS3rtvIbpicBm
5DGi2vbDy.wLGwLPLCDybDy.wLGwLPLyQLCDCFC.ujXJPnLiv4.goE.gxXfP
YBnwEjH3bgHhPDYt3CwkK5PT4hMDZfFWoDkPWgD0QT+bUQT8b0PT6bUPT.AM
QfLRLEHTlQ3bfvzBfPYLPnLAzzGjQho.gxLBmCDlV.DJiABkIflAfLRLEHTl
Q3bfvzBfPYLPnLAzLDjQho.gxLBmCDlV.DJiABkIflXPFIlBDJyHbNPXZAPn
LFHTl.ZFAxHwTfPYFgyABSKFs+z8ImzDRg1zVFG1FF7Zq4kceNYUYJ4CWrO5
Iqr3QUttdKspUUHdDcCPknctib0ioxG390robxUcCYzq01UH0UhldeYBM8P+
lMCg4BshzCUh8EHVXbcmeXz++yOfqacCUEd6f2gBRsGmJ9ujwoZkpwEN9Tvy
p+7kCZmAuWZNw1JCeiOrLH48X1aynlbSje1RSzYl16pJMAMb95DJkiiZ970q
sWdbkyWe76boYm6aCMrIQ+aT7UL5bz0O4b3exjyu8TyidszvbO32qpLAuGiQ
+xqjOpz+VWIeokVUCBNyyJMSJTn+AJzAua2YuQrVboyVm4iCg+Gc1hkfuvJK
7v2QpsaqXScgrtYNqctApgyn3pKrXphz+7eqdheym7jO+WDhHzZ+zhUgpLeU
U.V8y53c3v0ZdgVH2eN9y6ay5co8i55ng0vOUASibj8W.3M8jMZXMzQI0zOM
MgX0vOgsfehpgeFzB9oN6OwsjeXugeF0B9YTMxmjVvOw+Q9AcHR2tcGOuvsX
xElFmeUkaUG0iTERnRWp6my2IJN95b+zbSKJso+TYNZi8zPL+k+F0ZdtrTPq
sqM4LtjZJaa4UrME4A06t6u69urHXoTH
-----------end_max5_patcher-----------
```

## Feedback Please!

Please let me know if you use it, how it works for you, and if you have ideas on how it can be done with just a single Simpler or Sampler device. zack@steinkamp.us Thanks!
