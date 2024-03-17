---
layout: post
title: 'Single User Admin on OS X Mountain Lion '
date: '2013-09-25 19:08:07'
excerpt: |
  It's easy to make a user an administrator on OS X using the GUI tools.  But
  if you do not have access to an existing admin account, this is impossible.  By
  booting into Single-User mode, you can make a non-Admin into an Admin using
  the command line.
thumbnail: /images/osx-mountain-lion-icon.jpg
tags:
  - Nerd
---

It's easy to make a user an administrator on OS X using the GUI tools. But if you do not have access to an existing admin account, this is impossible. By booting into Single-User mode, you can make a non-Admin into an Admin using the command line.

Here is how to do it.

- Shut down the computer.
- Hold down Cmd-s and power on the computer to boot into single-user mode.
- Once the computer is done booting, you will be at a shell prompt, logged in as the root user. Run the following commands:

```
fsck -fy
mount -uw /
launchctl load /System/Library/LaunchDaemons/com.apple.opendirectoryd.plist
sudo dseditgroup -o edit -a yourlogin -t user admin
sudo dseditgroup -o edit -a yourlogin -t user wheel
reboot
```

- The computer will now reboot back into the normal graphical mode.
- Log in, and see that you are now an Administrator!
