---
layout: post
title: 'Stepwise Chord Ripper'
date: '2023-09-09 12:00:00'
thumbnail: '/images/KeyStepperChordRipper.png'
tags:
- Music
- Software
---

I just finished a marathon session with Max For Live and have two new devices to
show for it.

![Key Stepper](/images/KeyStepperChordRipper.png)

## Download the Devices

- ### [KeyStepper](https://github.com/zsteinkamp/m4l-KeyStepper)
- ### [ChordRipper](https://github.com/zsteinkamp/m4l-ChordRipper)

What I wanted was a way to play a chord of MIDI notes on one track, and have the
individual notes from the chord sent to different tracks, so that I could have
different instruments playing the different notes from the chord.

Once the notes were at the destination track, I also wanted to be able to
sequence patterns of note pitch variations and rest patterns in arbitrary length
looping patterns. Rather than using a free-running step sequencer for this, I
wanted the step sequencer to only advance when it received a note-on event. This
would let me build in an additional layer of rhythmic variation beyond what a
simple arpeggiator would allow. The notes advancing the step sequencer could
have an interesting rhythm themselves.

This combination would allow me to take a 4-bar chord drone, distribute its
four constituent notes across 4 tracks, then experiment with different patterns
of notes on and off, and different length repeating loops (e.g. a 13 step loop
played over a 16 beat section repeats in many many different ways).

The possibilities are pretty endless. :)
