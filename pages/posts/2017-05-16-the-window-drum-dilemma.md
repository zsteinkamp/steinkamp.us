---
layout: post
title: The Window Drum Dilemma
date: '2017-05-16 04:40:21'
tags:
  - Nerd
  - Music
excerpt: |
  Ever have a deep bass sound that's stunning in the studio, but falls
  flat on "regular" speakers? Perhaps this post can offer a solution to fix that.
---

It was a Thursday night. I was sound-making. I had an idea to get some sounds from my kitchen. Maybe something with a bowl. Maybe dropping something on the floor. Silverware can make some cool sounds. I had my Rode i-XY plugged into my phone. The Rode i-XY is a stereo mic with integrated app. It records with great detail and clarity, and it's pretty straightforward to move recordings to my computer using FTP (though AirDrop would be even easier).

As I walked into the kitchen, the sliding door caught my eye. Hmm, glass has a cool sound -- and a big piece of glass might have a really cool sound. So I spent some time [carefully] hitting the glass in different ways with my fist, and with the i-XY in different positions, recording all the time.

I was really curious what this might sound like, so I transferred the recording from my phone to my computer. The result was way more awesome than in real life. It was this huge and deep sound. Very powerful!

Once the next opportunity for song-making opened up, I knew that this Window Drum would be one of the sounds to use. I worked from 6pm to 5am on a Friday, then again from 10am to 4pm on the song. It was really coming together, using some synth sounds, basic sine waves, recordings of the house floor, recordings of my bike, and some incredible sounds that Bahar made on her daff (a Persian drum that is kind of like a two foot diameter tambourine). It was all sounding great.

I bounced the project to an AIFF file and uploaded it to SoundCloud so I could listen to it in different places. This is a very important part of song-making that not too many people talk about. A song that sounds awesome in a studio on expensive speakers may not sound great in the car, or in the kitchen, or on the tiny speaker on your phone. It's important to audition a mix on many different devices and make small adjustments to come up with a good compromise.

Another reason to audition on different systems is to expose flaws. That's what happened here.

The Window Drum was absolutely booming on my expensive studio speakers. I then took it to my living room where I have a nice setup, but the bottom end is taken care of by a single subwoofer. Both the left and right channels go into the subwoofer, the bass component of the sound is merged to mono and sent through its amplifier and out the big speaker, and the remaining signal is passed through to the left and right speakers.

On my living room setup, the sound was lifeless. The top end was great, but the bottom end was completely missing. Gone.

Taking a look at the Window Drum sound up close told the whole story:

You can see in the image that the left and right channels were almost perfectly out of phase. The left and right channels recorded by the i-XY were picking up the window at different locations since the mic was so close to the window, and since it was vibrating, different phases. When this signal was merged down to mono by the subwoofer, the sounds were canceling each other out. Flatline.

So the dilemma here: How to preserve the cool spatial quality of the sound and have a booming bottom end?

Well, we mostly get spatial information from higher frequencies. It's difficult for us humans to pinpoint the location of a deep bass sound, but we are very good at pointing to a bird chirping in a tree. If I could separate the high and low frequencies from the sound, I could keep the high frequencies spread in stereo, and at the same time do something to the bass to bring it in phase.

The solution was to split the output on this track to two busses. Bus A would be dedicated to treble. Bus B would be for bass.

Bus A was simple to make -- just an EQ with a hard low-cut. I chose 75Hz just because.

Bus B had a similar but opposite EQ, with a high-cut set to 75Hz, and a few dB of boost on the bottom end for reasons that will soon be clear.

If I made Bus B a mono channel, Logic would sum the left and right signals together and I'd be back at square one with no bass. I had the idea that I could pan Bus B hard left (could have just as well have been right) so that only the left channel would be represented. This channel was routed to a third bus, set up to be mono. Since only the left channel of the original was used, this mono bass channel would not have any phasing issues.

This seemed to do the trick. After some tweaks in the EQ and volume to bring the bass energy back to the low-end, the it sounded great in the living room. You can see by this close-up of the tail of the sound, that it's now mostly in-phase.

Listening to it back to back with the original reveals some difference, but the final product is still spacious and powerful, but it holds up well in less-than-ideal listening environments.
