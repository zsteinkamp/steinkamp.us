---
layout: post
title: Filesystem Apps - Own Your Own Data
date: '2024-03-05 12:00:00'
excerpt: |
  Cloud services will come and go, but your memories are yours forever. Take
  charge of your media legacy with Filesystem Apps.
thumbnail: /images/fsapps/photodirs.png

---

In the past few years, I've built a few applications that I call "Filesystem Apps".

![Photodirs Screenshots](https://github.com/zsteinkamp/photodirs/raw/main/images/light-mode.png)

A Filesystem App is an application that presents a specific and useful interface to a directory or directory hierarchy. The directory structure and the files it contains are the entirety of the long-term state of the application. For example, if you keep your photos organized into directories representing albums, you could imagine a file viewer tailored for this purpose.

This is in contrast to most applications that store their state in proprietary databases or in cloud services. Those services and apps will be obsolete one day - then what do you do with all the time you've invested in their platform? You have to repeat it with the next thing. What a drag!

Filesystem Apps keep your files under your control. When implemented well, Filesystem Apps retain (or even improve!) the end-user's control of their own data. Source data should always be able to be mounted read-only. If the user wants to allow write access, native metadata management (e.g. modifying EXIF data to set title or description) should be preferred over metadata sidecar files. When metadata sidecar files are unavoidable, they should follow simple conventions with future application in mind. They should be in YAML format for simple human and machine parsing. This should lead to emergence of metadata standards.

Filesystem Apps will not appeal to everyone. Their appeal will be with people who want to retain control of their source data, regardless of future application. They appreciate the security that Filesystem Apps can offer, keeping your data fully within your control but presenting an ideal experience to interact with those files. A Filesystem App power user will appreciate the ability to use standards-compliant metadata mechanisms and/or a text editor as a CMS, with instant updates.

Filesystem Apps are delivered as Docker images or over the AWS Marketplace (in the future!). When run as a Docker image, simply run `make` and follow the prompts to configure your source directory. When run from the AWS Marketplace, you just need to configure the S3 bucket to act as your source data.

## Photodirs

![Photodirs Screenshots](https://github.com/zsteinkamp/photodirs/raw/main/images/light-mode.png)
![Photodirs Screenshots](https://github.com/zsteinkamp/photodirs/raw/main/images/photo-page.png)

Photodirs is a Filesystem App centered around browsing images and videos, as well as serving images with dynamic resizing and video transcoding. It combines a modern web interface to your media files, organized by their directory structure. You can create an `album.yml` file that contains metadata around the directory title, description, thumbnail images, etc. Photodirs is also a full-featured photo hosting solution, with dynamic resizing and transcoding. It has native HEIC, RAW, and wide video format support. Metadata such as title and description are read from the media files themselves, keeping your annotations and titles inside your files for future use.

Photodirs is always watching its source directory, so putting new images online is as simple as creating a folder and copying in some images or video files. There are no other actions to take.

To get started, [clone the repository](https://github.com/zsteinkamp/photodirs) and run `make` to configure the source directory and choose options, like read-only or read-write.

[Source Code](https://github.com/zsteinkamp/photodirs) | [Example Site](https://photos.steinkamp.us/)

## Esstraba

![Esstraba Screenshot](https://github.com/zsteinkamp/esstraba/raw/main/screenshot.png)

Esstraba is a Strava archive export viewer. Point Esstraba at your downloaded .zip file, and it will give you a fast-filtering view of every activity, leading to a detail page showing your stats, media, and a stunning 3d route map, powered by MapBox.

Strava allows you to download your archive once per week, so keep that in mind.

Run `make` to configure your source .zip location and Esstraba will start up.

[Source Code](https://github.com/zsteinkamp/esstraba) | [Example Site](https://esstraba.steinkamp.us/)

## Musics

![Musics Screenshot](https://github.com/zsteinkamp/musics/raw/main/public/screenshot2.png)

Making music is a hobby of mine. As with any art, it's not done until it's shown to the public. As part of the music-making process, I like to listen to my work-in-progress in different places and situations, like the car or in different headphones. Uploading those songs to services like SoundCloud or Bandcamp takes time, so I had the idea to just build a web frontend to the directory where I render my work-in-progress music to. This would let me open it using any web browser anywhere in the world. I think providing that look into work-in-progress is an interesting thing for an artist to ponder.

Clone the repository and run `make` to set up the source directory.

[Source Code](https://github.com/zsteinkamp/musics) | [Example Site](https://musics.steinkamp.us/)

## steinkamp.us

![steinkamp.us Screenshot](https://github.com/zsteinkamp/steinkamp.us/raw/main/screenshot.png)

My blog platform is somewhat filesystem-based. The posts are written in Markdoc (an extension of Markdown created at Stripe) and each in its own file in its source code repository. This makes writing posts a breeze in my favorite text editor, and revision history is stored in GitHub. This approach maximizes portability through the Markdown standard files that can easily be used with future content systems.

[Source Code](https://github.com/zsteinkamp/steinkamp.us) | [Example Site](https://steinkamp.us/)

## What's Next?

What other filesystem apps can you think of? Let me know here!
