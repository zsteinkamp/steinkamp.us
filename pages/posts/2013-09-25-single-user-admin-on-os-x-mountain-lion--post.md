---
layout: post
title: 'Single User Admin on OS X Mountain Lion '
date: '2013-09-25 19:08:07'
categories: post post
entry:
  id: 934
  source: post
  data:
    excerpt: It's easy to make a user an administrator on OS X using the GUI tools.  But
      if you do not have access to an existing admin account, this is impossible.  By
      booting into Single-User mode, you can make a non-Admin into an Admin using
      the command line.
    title: 'Single User Admin on OS X Mountain Lion '
    thumb_url: http://cdn-data.motu.com/site/images/news/osx-mountain-lion-icon.jpg
  created_at: '2013-09-25 19:15:54'
  updated_at: '2013-09-25 19:16:32'
  pub_date: '2013-09-25 19:08:07'
  disabled: 0
---
It's easy to make a user an administrator on OS X using the GUI tools.  But if you do not have access to an existing admin account, this is impossible.  By booting into Single-User mode, you can make a non-Admin into an Admin using the command line.

Here is how to do it.

<ol>
<li>Shut down the computer.</li>
<li>Hold down Cmd-s and power on the computer to boot into single-user mode.</li>
<li>Once the computer is done booting, you will be at a shell prompt, logged in as the root user.  Run the following commands:
<pre>
# fsck -fy
# mount -uw /
# launchctl load /System/Library/LaunchDaemons/com.apple.opendirectoryd.plist
# sudo dseditgroup -o edit -a yourlogin -t user admin
# sudo dseditgroup -o edit -a yourlogin -t user wheel
# reboot
</pre>
</li>
<li>The computer will now reboot back into the normal graphical mode.</li>
<li>Log in, and see that you are now an Administrator!</li>
