---
layout: post
title: Actual Room Reverb
date: '2021-03-03 12:00:00'
categories: post
entry:
  source: post
  data:
    thumb_url: https://photos.steinkamp.us/photo/2021-03-03_room-reverb/2021030408155275--7795515852288585693-IMG_1899_HEIC.JPG?size=300x300&crop
---

This was some of the most fun I've had with music making recently.

After watching [this video](https://youtube.com/watch?v=SA6Emhn7bMs) from the great producer, engineer, and mixer Sylvia Massy where she demonstrates re-amping a synth line to give it power and space, I tried the same thing with one track of the song I was working on at the time, [100 Squares](https://open.spotify.com/track/5QasBwoeE4WYOqQPu4tBMD?si=YlJP2JI1Rv6gQlhGYvESJQ).

{% bandcamp src="https://bandcamp.com/EmbeddedPlayer/track=378566830/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" /%}

You can hear the net effect on the arp'd synth line starting at about 1:45. For that one, I connected my bass combo amp to the speaker out on my main audio interface. I put one mic directly in front of the speaker cone, and one off-axis. I set my phone with [Rode iXY](http://www.rode.com/microphones/ixy) in the adjacent room, and started recording. Playing back the track in the computer, I recorded the signals from the on- and off-axis mics, then imported and time-aligned the room recording. This worked well, but it got me thinking -- could I make a reverb send out of this? Yes!

To make the reverb send, attach another interface (I used my old Scarlett 2i2) to your computer.

Head over to the Audio Midi Setup app and add this interface to your Aggregate Device, so that you can address its inputs and outputs in Ableton Live. You don't have to have a second interface, since you could just use the headphone output on your computer to monitor what is happening, but that's less convenient.

![Diagram of the setup](/images/room_audio_midi.png)

I put the bass amp in the living room, with the mic stand with two Shure SM57s in an X-Y pattern near it, but pointing toward an open space in the room. Experiment with rooms and relative speaker/mic locations!

![The Mics](https://photos.steinkamp.us/photo/2021-03-03_room-reverb/2021030408155275--3718474167161792980-IMG_1900.HEIC)

![The Room](https://photos.steinkamp.us/photo/2021-03-03_room-reverb/2021030408155275--7795515852288585693-IMG_1899.HEIC)

The bass amp input comes from one of the outputs on the Scarlett, and the two mics feed the two inputs of the Scarlett.

![Scarlett](https://photos.steinkamp.us/photo/2021-03-03_room-reverb/2021030408155275--6544226813501110196-IMG_1901_HEIC-XL.jpg)

Back in Ableton, create a new Return Track (Cmd-Option-T) and set its output to the Scarlett output. Setting the Pre/Post Toggle to "Pre" allows you to hear the effect in isolation, so do that while you are experimenting, but it's not required to make this work. This track I'll call the "Room Send".

![Return Track](https://photos.steinkamp.us/photo/2021-03-03_room-reverb/2021030408155275--8885037713138693610-IMG_1902_HEIC-XL.jpg)

Then create a new Audio Track (Cmd-T) and set its input to the Scarlett inputs (stereo pair). Change the monitoring mode to "In" so that you can hear what is coming from the mics all the time. This channel is the actual Return from your interface, called "Room Return". You could use the External Audio Effect device instead of this second track, but I wanted to record the audio returning for further manipulation/editing, so this approach gives you that flexibility.

![Audio Track](https://photos.steinkamp.us/photo/2021-03-03_room-reverb/IMG_1905_HEIC.JPG)

At this point, loop-play a sound (e.g. a drum loop) on another track, and start increasing the send level to your Room Send track. You will probably need to go fiddle with the interface output level, mic input levels, and all the settings on your amp to find a nice level and balance.

Once you find this balance, you can treat this channel as any other Reverb send track, except this one is perfect!

Add EQ and other effects to the return channel to further shape the sound. Experiment with different rooms and amp/mic placements for different effects.

Here's a video of the setup, with enabling and disabling the send as well as walking into the new Reverb Chamber.

{% youtube src="https://www.youtube.com/embed/ImgVmL1Sgr8" title="Video" /%}
