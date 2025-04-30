---
layout: post
title: Version Updates in Max for Live
date: '2025-04-30 12:00:00'
thumbnail: /images/m4l-versions/version-arrows.png
tags:
  - Music
  - Nerd
  - Projects
  - Software
excerpt: |
  This post details a system I've put together to provide notifications inside of my Max for Live devices when I publish a device update.
---

This post details a system I've put together to provide notifications inside of my Max for Live devices when I publish a device update. This is a top-to-bottom system -- from the device filename, to how I manage the source files, to releases, and a website that brings it all together for the public.

## Versions

In order to have an update notification system at all, you need the notion of a version. I have settled on a versioning scheme that increases a number with each release. The first release is "v1", the second is "v2", and so on.

The device version is expressed inside the device for reasons related to the update mechanism. A message containing the device name and version is in gold in the screenshot below:

![Version in the Max Patcher](/images/m4l-versions/patcher-outer.png)

This version is also carried through to GitHub, where the device source and releases are kept.

This version included in frozen device filenames, e.g. `Knobbler4-v34.amxd`. Those versioned files are stored in each device's GitHub repository in a `frozen/` directory.

![Version in the frozen/ directory](/images/m4l-versions/frozen-files.png)

I use GitHub's Releases feature to manage device releases. When creating a release, I create a tag that is identical to the version string, e.g. `v34,` and associate it with the release.

![Version consistency in tags and releases](/images/m4l-versions/version-arrows.png)

## Web Service

Now that the device knows its own version, we need a mechanism for it to check to see if there is a newer version available. This requires an Internet connection to a service that knows the latest version number.

I have dozens of Max for Live devices that I distribute this way, and I wanted a single place for people to be able to get information about them and download them. So I built [plugins.steinkamp.us](https://plugins.steinkamp.us/). It uses GitHub as its source of truth for documentation and releases, so just by creating a new release or changing some documentation in GitHub, plugins.steinkamp.us will be updated. You can [use or fork the GitHub repo](https://github.com/zsteinkamp/plugins) for your own purposes.

One feature that I built into plugins.steinkamp.us to support version checks is a URL that returns the latest release number for a given plugin. For example:

```
> curl https://plugins.steinkamp.us/version/m4l-Knobbler4
34
```

This can provide the necessary information to something in Max that decides if the currently running version of a device is the most latest version.

It should be possible to use GitHub's API directly rather than running a custom web service. Perhaps someone can make that for the community? :)

## Max Implementation

So putting all of the above together, we can now architect something in Max to fetch the most recent version number of the device we are in, compare it with the running device version, and alert the user if an update is available.

This is the first layer of doing that. The gold button contains the device name and version and is "baked in" to distributed devices. That message is sent into the "About XXXX" patcher, which we will explore below. That patcher has an outlet which is used here to change the text and border color of the Help (?) button.

![Version in the Max Patcher](/images/m4l-versions/patcher-outer.png)

Inside the "About XXXX" patcher, we have the following objects which receive the device name-version string from the parent patcher, sets a displayed comment in the About window, and most importantly, request the latest version and determine if an update is available.

![Internal Implementation](/images/m4l-versions/patcher-inside.png)

Here is how it shows up to the user:

Normal help (?) button:

![Help Button](/images/m4l-versions/help.png)

Button showing update is available:

![Alert Button](/images/m4l-versions/alert.png)

Clicking that button displays this pop-up window, showing "Update Available. Download now."

![About page](/images/m4l-versions/about.png)

Clicking that button leads to my website, where downloads are highlighted prominently.

![About page](/images/m4l-versions/plugin-site.png)

Updates can then be easily downloaded, and the updated user on their way with a better device. :)
