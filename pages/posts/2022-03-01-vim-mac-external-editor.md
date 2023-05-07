---
layout: post
title: Using Terminal vim as an External Editor on Mac
date: "2022-03-01 12:00:00"
categories: post
entry:
  source: post
---

If you're reading this, then please allow me to welcome you -- a fellow person of specific needs and preferences!

It has bothered me several times in the past that I can't use my text editor of choice everywhere I can edit text. There is an insect brain muscle memory that comes from being a long-time vim user. For example, I regularly find myself resorting to vim commands/shortcuts in places like GMail. I think it's just my body trying to get me back to using `mutt` to read email again. Regardless, this isn't about email unfortunately.

The problem du jour for me has been working on [Javascript-based devices in Max/MSP](https://github.com/zsteinkamp/m4l-zs-Knobbler3) and being stuck inside of Max's lame notepad-like editor for my code. Max allows you to choose an external editor, but it only allows you to choose `*.app` files as the editor. Since vim is a command-line tool, this doesn't just work.

I set out today to solve this problem once and for all, and eventually pieced a solution together from bits and pieces I found online. The solution is to use Automator to create an "Application" that runs a shell script that runs an Apple script that activates Terminal.app and tells it to run vim to edit the file in question.

## Step-By-Step

1. Open Automator

2. Create a new Application

3. From the Library, choose "Run Shell Script".

4. Ensure you are running `/bin/bash` as the shell, and that you have the "Pass input" dropdown set to `as arguments`.

5. Paste this script code:

```
osascript <<END
tell application "Terminal"
  activate
  do script "/usr/bin/vim $@;exit"
end tell
END
```

6. Save this Automator app somewhere.

7. Now you can tell the application you are using to use this new app as its external editor.

8. ...

9. Profit!

Here is a screenshot of the Automator window where you build the app:
![Screenshot](/images/automator-vim.png)
