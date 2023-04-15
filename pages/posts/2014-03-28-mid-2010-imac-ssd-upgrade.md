---
layout: post
title: Mid-2010 iMac SSD Upgrade
date: '2014-03-28 16:02:29'
excerpt: Upgrading from a regular hard drive to an SSD seemed complicated at first on this computer, but with the right tools and instructions it was easy.
---
Our almost four year old iMac has felt a little sluggish compared with my work laptop (a new MacBook Air).  I upgraded it to 8GB of RAM soon after we got it, which brought a good speed improvement, but it seems that it's been chugging away at reading and writing to the hard drive lately.  It came with a 500GB Western Digital hard drive (aka "spinning rust") that can transfer about 120 MB/second with a 9 millisecond (ms) average seek time.  

A traditional hard drive stores data on spinning platters, and reads data using a read/write head -- much like a record player.  In order to read data from different places on the disk, a traditional hard drive has to reposition, or "seek", the read/write head, and wait until the right section of the spinning platter is under the head before it can start.  It's incredible that this can be done in 9ms (0.009 seconds) on average, but in computer time that's very very slow.  Because data is scattered all over the platters, there is a lot of seeking that happens when you launch applications, open documents, or reboot the computer.

In the last few years, Solid State Drives (SSDs), have become increasingly common.  SSDs store data on computer chips, like the memory card in a digital camera.  There are no moving parts, so they are not fragile like a traditional hard disk.  The biggest advantage of an SSD is that it can read and write data from anywhere on its chips in the same amount of time, regardless of where on the chips the data is stored.  A read or write operation on an SSD takes a fraction of a single millisecond, and because of they do not rely on spinning platters beneath a read/write head, can transfer data at a much higher rate than a traditional hard drive.  

On the downside, SSDs tend to be more expensive than hard drives.  Budget hard drives cost roughly $0.05 per gigabyte, where consumer-level SSDs are ten times that at about $0.50 per gigabyte.  Hard drive prices are starting to flatten out, but SSDs continue to get cheaper over time as manufacturers scale their production.

So rather than spend $2000 on a new computer, I thought I would try replacing the old mechanical hard drive with an SSD.  After doing a bit of research, I settled on the Samsung 840 EVO drive, in the same 500GB capacity as the drive that was in the computer.  It has been <a href="http://www.anandtech.com/show/7173/samsung-ssd-840-evo-review-120gb-250gb-500gb-750gb-1tb-models-tested">benchmarked at over 500 MB/sec</a>, which is 4x faster than the drive it would replace.  The seek time is irrelevant with an SSD, so any disk operation will see an average of 9ms improvement, which is huge.  For less than $300 this was worth a try.

I found some pretty good video instructions on how to replace the hard drive in this generation iMac.  

{% youtube src="//www.youtube.com/embed/MeLchCCtHy8?rel=0" title="Video" /%}

I ended up using only a single suction cup to remove the glass (most instructions call for two).  After removing the 8 T-10 screws, I carefully lifted the display.  I only needed to disconnect the screen temp sensor and data cable in order to get the job done.  Everything else could be done with the screen propped up.  The SSD is a 2.5" form factor, but the old hard drive was a 3.5".  Adapters exist, and the $15 "EZConvert MB882SP-1S-2B" from Icy Dock worked perfectly.  I removed the old drive, transferred the T-8 mounting pins and bracket to the SSD/Adapter, and installed it.  

There is a temperature sensor that connects to the original hard drive, but there is nowhere to connect it to the new drive.  If you leave it disconnected, the hard drive cooling fan will run at maximum (loud) speed.  When Apple shipped these iMacs with the SSD option, they just jumped the two pins on the temperature connector, so I did just that with a short length of bell wire (solid copper core wire) in the end of the connector that would have connected to the hard drive and secured that with some electrical tape.

Everything buttoned back up easily.  Since we have an external drive connected to the computer that does Time Machine backups, restoring to the new drive was a snap.  Boot the computer holding down the "Option" key, boot to the Time Machine volume, start Disk Utility and partition/format the new SSD, then restore the data from the backup to the new drive.  The restore took about 6 hours in our case.

I went to sleep while it was restoring, and woke up to a computer that was indistinguishable from where I powered it down last night to start the job.  Amazing!

The one final step was to enable [TRIM support](http://en.wikipedia.org/wiki/Trim_(computing)) on the SSD.  By default, OSX only recognizes Apple SSDs as having TRIM support.  There are a few utilities to enable TRIM for non-Apple SSDs.  I chose [Trim Enabler](http://www.cindori.org/software/trimenabler/) and it worked fine.  Install the software, launch it (hold down the Control key while opening it since it isn't digitally signed) and flip the switch "On".  Reboot the computer, and hold down Command-S to enter single-user mode, then run:

```
  > fsck -fy
  > reboot
```

Look for the line "** Trimming unused blocks." in the fsck output.  This completes the TRIM process by adding TRIM information to existing data on the drive.

The computer now boots in about 10 seconds, where it would previously take over a minute.  It is now totally silent, and will run cooler.  All in all, this was an easy and fun upgrade!
