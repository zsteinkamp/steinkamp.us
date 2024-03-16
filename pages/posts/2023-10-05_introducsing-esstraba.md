---
layout: post
title: 'Introducing Esstraba!🎉'
date: '2023-10-05 12:00:00'
thumbnail: '/images/esstraba/screenshot.png'
---

Continuing on my apparent obsession with filesystem-based applications ([musics](https://github.com/zsteinkamp/musics), [photodirs](https://github.com/zsteinkamp/photodirs), etc...), I present Esstraba!🎉 your self-hosted Strava bulk download zip file viewer.

![Esstraba!🎉 in action](/images/esstraba/screenshot.png)

[Check out my Esstraba!🎉](https://esstraba.steinkamp.us/)

## Umm ok, and, so, um, why?

This is for the people that have some of their most treasured memories in Strava -- pre-dawn trail runs with friends, PRs, races you trained for months to prepare for. These are memories I want to keep forever and to revisit any time.

![Memories](/images/esstraba/memory.jpg)

Strava may not be around forever, so I don't want to risk losing access to these important moments. Thankfully, Strava has built a bulk-export feature. This is fantastic! Thank you to whomever at Strava pushed that one through.

## Enter Esstraba!🎉

Esstraba! is a Strava bulk download zip file viewer. Simply extract the downloaded `.zip` file to the `data/` directory and run `make prod`. This will start two docker containers -- one that knows how to read the files in the `data/` directory, and one to provide the web frontend.

It gives you lightning fast filter and sort capabilities, to comb through your entire corpus of activities instantly.

![Filtering and Sorting](/images/esstraba/list.png)

Tapping an activity row brings you to the activity page. On this page, you can interact with your route plotted on a 3-D topographic map. Relevant statistics are shown, the activity Description, an elevation chart, and any photos that are attached to the activity.

The 3-D map works on both desktop and mobile (hat tip to [Mapbox](https://mapbox.com/)).

![Esstraba!🎉 in action](/images/esstraba/screenshot.png)

You can navigate between photos with arrow keys, and return to the list where you left off with the Esc key or back button.

![Esstraba!🎉 Photos](/images/esstraba/photo.png)

### [Esstraba! on GitHub](https://github.com/zsteinkamp/esstraba)

Sooo, do you want your own Esstraba!🎉?

[Or check out my Esstraba!🎉](https://esstraba.steinkamp.us/)
