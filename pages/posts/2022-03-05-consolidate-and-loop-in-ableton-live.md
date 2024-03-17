---
layout: post
title: Consolidate and Loop in Ableton Live
date: '2022-03-05 12:00:00'
tags:
- Music
---

I'm an efficiency freak. In either my personal or professional life, I'm always looking for ways to eliminate steps in a process, especially if those steps are ones that a person has to take. Sometimes, process changes are big and fundamental and sometimes they are micro-efficiencies. A micro-efficiency may save 2 seconds of waiting time, or eliminate one mouse click. If that savings happens frequently, then the investment in finding the efficiency can pay off. Another advantage of finding micro-efficiencies for human-computer interactions is that the human can spend more time thinking like a human vs. having to switch to thinking like a computer. In creative activities, this can preserve creative flow, resulting in an increase in joy in the world.

This is one of those things.

Ableton Live has a function called "Consolidate", which will either crop or combine multiple MIDI or Audio clips. I use this function quite a bit with MIDI clips. One problem with Ableton's implementation of this function is that the newly consolidated clip never has "Loop" enabled, which is something that 95% of the time I want to enable.

The process to Consolidate and then Loop a clip is to press Cmd-J (consolidate), then Shift-Tab twice (enter the clip edit pane), then Cmd-L (loop). This is cumbersome in that it requires many keystrokes, usually with two hands. It takes time and brain space to execute this keystroke dance.

I've filed an enhancement request with Ableton to map Cmd-Shift-J to Consolidate + Loop, but I'm not sure if we will get that any time soon. In the meantime, I've been looking for solutions to make this a single-keystroke operation. One solution is a utility called MIDIStroke to map a MIDI message to the sequence of keystrokes, but it's not as reliable as I'd like. I've also gone deep in the Live API rabbit hole to see if I can do something in Max For Live, but there is no support in the API for dealing with multiple selected clips.

Today I had the idea to try Apple's "Automator" app to implement a shortcut. Automator can do many things, including add an item to the whole system or an application's "Services" menu. I've used this in the past for other productivity tasks, and it seemed like it could be a good choice. It seems to work well.

## Download and Install

- Download the [Consolidate and Loop .zip file](/images/consolidateAndLoop/ConsolidateAndLoop.zip).
- Double-click the file to uncompress it.
- Double-click the `Consolidate and Loop.workflow` file.
- The system will ask you if you want to install it, click Install.
  ![Screenshot of confirmation](/images/consolidateAndLoop/install.png)
- If you switch to Ableton Live, you should now see it in the Services menu.
  ![Screenshot of Services menu](/images/consolidateAndLoop/services_menu.png)

## Mapping a Keystroke

To map a keystroke to this new Service, do the following:

- Open System Preferences.
- Go to the Keyboard preferences.
- Select the "Shortcuts" tab.
- Select "Services" from the left column.
- Scroll to the bottom of the right column, and select "Consolidate and Loop".
- Click the "Add Shortcut" button, then press Cmd-Shift-J.
  ![Screenshot of Keyboard shortcut](/images/consolidateAndLoop/key_shortcut.png)

So now back in Ableton Live, you can now press Cmd-Shift-J to Consolidate + Loop a selection and stay in the creative flow.

## Do It Yourself

If you want to go through the steps yourself to learn how to create a similar Service in the future, here you go. Do the following:

- Open Ableton Live and make a selection in a MIDI track. It can be empty.
- Launch the Automator app.
- Create a new "Quick Action".
- Set up its basic settings (Workflow receives "no input" from "Ableton Live Suite 11")
- Add a "Watch Me Do" action.
- Click Record.
- Switch to Ableton Live.
- Press Cmd-J, Shift-Tab, Shift-Tab, Cmd-L.
- Stop recording.
- Save the action as "Consolidate and Loop".

It will now appear in Live's Services menu.
