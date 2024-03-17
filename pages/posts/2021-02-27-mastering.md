---
layout: post
title: What I Know About Mixing And Mastering Right Now
date: '2021-02-27 12:00:00'
tags:
  - Music
---

I've just learned some things about mastering and I thought I'd write them down.

During my last project, I took several recordings I think sound really good in the genre I'm working in (dub-ish techno?) and looked at their waveforms. What struck me is that for the most part, they peak at around -4db. This was a very important piece of information. Looking at my prior work, I had always set the limiter to peak at -1.0db, and my songs always sounded so bassy. If I brought up levels of non-bass instruments to have a pleasant balance, the loudness (LUFS) was always too high. Until I saw that pros master songs at -4db peak, I just thought their good sounding, loud, balanced bass tracks were magic.

Armed with this new information, I was able to produce some songs that started to sound "good" or "real" to my ears. My prior work was too quiet, too boomy, not really present. But this was just the beginning of a new plateau of learning.

My prior mastering chain was a Utility device for overall level setting, another Utility for master fades on the song boundaries, a couple of gentle compressors -- both at maybe 30% wet, 2:1 ratio, doing maybe -6db of compression. Following that, I had been using a free Max4Live device called "Color Limiter" or the stock Ableton Limiter, followed by the [Youlean Loudness Meter](https://youlean.co/youlean-loudness-meter/) and Ableton's Spectrum device.

There's a lot of great information for music-makers on YouTube, and after the 1000th time seeing people who produced really great music using FabFilter plugins, I decided to give them a try. I downloaded their "Mastering Bundle" (EQ, Compressor, Multiband Compressor, and Limiter) which have a 30 day fully functioning demo mode (all plugins should have this). WOW. The interface is perfect, with such easy controls and so much information displayed, not only in the controls but in the signal passing through the device, and how it's being modified. It makes it so easy to make more informed movements in the software, rather than just guessing what might be the right thing to do. And the sound! Whoa, the difference is noticable even to my untrained, unprofessional ears vs. the Limiters I had been using. After only a couple of days, I plonked down the $500 to keep the plugins.

My new chain is still a pair of Utility devices (overall level, master fades), but now with the FabFilter Compressor, followed by the FabFilter Multiband Compressor, FabFilter Limiter, Youlean Loudness Meter, and Spectrum.

When developing a song, I'll try to target the kick peaks at about -12db on the Spectrum device on the kick channel/buss, and bass/subbass somewhere between -18db and -12db. Other instrument levels follow that "to taste". I mix as I work on the song.

Moving down to the Master bus, I'll set up the compressor like before -- 30-50% wet, 2-4:1 ratio, threshold down to -6db or so. The FabFilter multiband gets split into 5 bands -- sub, body, mid, presence, and air. The lowest band is critical -- set the fastest attack and release times, amount and gain so that the bass overall stays within a few dB between quiet and loud hits. Other bands to taste, but this device is really critical to evening out your mix across different parts of your song. It's as important as the limiter, IMO, when it comes to the loudness and balance of your final mix.

Moving on to the FabFilter limiter, I'll first set it to max out at -4dB. I'll loop the loudest part of the song, and adjust the various limiter settings (EXCEPT for input gain -- we will use that later) along with the initial Utility device so that it's doing 3-6dB of limiting, and hitting -13dB-ish LUFS short term (as reported by the limiter or Youlean Loudness Meter). At this point, I may need to revisit the mix levels and the multiband compressor settings to get something that works well. It's a process of iteration, fine tuning, revisiting, repeating.

Once the loud part of the song sounds GOOD and is hitting -13db LUFS short term, then it's time to play the whole song and automate the Limiter input gain to try to stay close to that -13db / -14db LUFS range that you should be shooting for so that Spotify doesn't have to adjust your song volume. I use a knob on my Push2 controller and do my best. It doesn't have to be perfect, and you know when the quiet/loud parts are, so you can use that to level out the overall dynamics.

After recording that automation, play the whole song again start to finish, and now look at Youlean Loudness Meter's "Integrated LUFS" reading. It should be -13.5db or so for streaming services. If it's too low or too high, you can adjust the level of the first Utility device in the mastering chain. Since that signal is getting compressed, you may need to adjust more than the difference between your actual integrated LUFS and the target. For example, if your song reads -15db LUFS (1.5db too quiet), you may need to add 3db on the first Utlity to overcome the compressors in the chain. This may necessitate revisiting mix levels, multiband compressor settings, etc. It's all connected, and prepare to have to make several iterations.

So that's it ... that's what I'm doing now to get my songs sounding polished. I used to have to render a song maybe 10 times before loudnesspenalty.com showed that it was within .7db of Spotify's target, and the other service numbers would be all over the place. With this new technique, my render nails the target loudness, as reported by loudnesspenalty.com, and the numbers are very even across the different services.

Hopefully I'll look back at this in a month or a year and shake my head at what an idiot I was, since this is a lifelong learning and improving process.
