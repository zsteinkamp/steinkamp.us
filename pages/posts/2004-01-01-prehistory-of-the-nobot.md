---
layout: post
title: Pre-History of The Nobot
date: '2004-03-12 00:00:00'
excerpt: |
  I've had a website since 1994 or so, in some form or another. This post is all about the origins of this site and what came before what you are seeing today.
---

## Waaaay Back

The computer projects I remember being most excited about as a 9 or 10 year old involved drawing things on the screen. I was enamored with the first Macintosh only after I saw how you could use the mouse to draw on the screen. Computers as a visual medium have been a thing is what I'm trying to say.

## BBS Days

In the days of BBSing, in my case from like 1987-1992, I was a consumer. I was in awe of the ANSI graphics demos that others would put together and share in BBS forums, but has had no desire to make them myself. Exploring these spaces in other computers was fascinating enough for me I guess.

## University Dial-Up Internet

Then came the Internet. In 1994 or so I was living in Costa Mesa, CA going to community college. I had made a group of friends in the area, one of whom went to UC Irvine. He very graciously and serentipitously shared his UC Irvine dial-up internet login credentials with me so I could check it out. Forever in your debt, man!

In those days I was using Windows 3.11 then OS/2 Warp and then Windows 95 to dial in to the university's UNIX server. Initially with Windows 3.11, you had to use a chain of utilities such as Trumpet Winsock or WinPPP to establish the connection. From there, running apps on my computer that used that communications channel was absolutely mind boggling. This was an amazing world of whois, gopher, usenet, IRC, and finger. There were already huge communities of people out there, organizing around all kinds of topics in all kinds of mediums.

## Dawn of the Web

Then came Mosaic - this new software that let you browse Gopher sites and these other "web" sites that were kind of like Gopher but seemed to have fewer rules. I remember learning about HTML and bless the developers for putting "View Source" in an easy-to-find place. That started this whole thing.

My friend's UC Irvine account had the ability to host home directory web content, and so it began. For a while I was at `http://ea.og.uci.ecu/~eaeu692/` with fun "Hello, world!" variants and animated under construction gifs. "Zack's Home on the Web" or some such.

## The Nobot Chatterbox

I moved to San Luis Obispo to finish my degree at Cal Poly, and ended up in a great job in the Library building web apps. Great luck abounds! There was a computer in that room on the fast campus Internet that I could move my website to. I had a whole remote publishing thing set up to manage that, starting with running Microsoft Front Page on my Windows 95 machine at home talking with IIS on the Windows NT machine I used in the Library. This was the days of designing websites in Photoshop, then slicing up the image (with image rollovers of course!) and laying it out in deeply nested tables. Those were the days of `http://multiweb.lib.calpoly.edu/thenobot/`. I had posts, photos, and music hosted there.

It was in that time that I learned about programming in Perl, specifically writing CGI programs that could make dynamic web content. I decided to do an experiment and make it so any visitor to my website could change the article that was displayed or some other parts of the page. My friends and I had fun coming up with funny stories and posting there. A known feature was that posting replaced what was there, erasing it forever. There was a simultaneous safety and excitement around that. It was called "The Nobot Chatterbox".

## FreeBSD at Home

After I graduated, I started working at Yahoo!. Yahoo (not going to use the exclamation point everywhere sorry) was all about FreeBSD. Developers had one (1) FreeBSD mini-tower. All of the company's servers were FreeBSD. We got good at FreeBSD, and so I wanted to run it at home too. This was the early days of DSL, and so that combined with a dynamic DNS service, and I had my site running from home. That was the `http://nobot.2y.net/` days.

## Dreamhost

My parents had bought a business and needed website hosting. I didn't think my home internet was reliable enough for their business, so I set that up for them on a web hosting provider (Dreamhost). I realized I could piggy-back my personal site on their account for no extra money, so it soon moved there. It was rewritten from Perl to PHP somewhere around 2002 probably.

The site stayed on Dreamhost for a number of years. This also saw the beginning of `http://steinkamp.us/` (HTTP, not HTTPS at that time) with Dreamhost's cheap domain registration.

## Wordpress

At some point I was lured by the full-featured and free nature of WordPress, probably around 2007, and Dreamhost made it easy to use. So I provisioned a MySQL database with them and set up a WordPress blog as my homepage. This was OK but in hindsight, talk about some serious vendor lock-in! With content in a SQL database, portability is a serious challenge. Not to mention the esoteric and specific markup and styling, and leaving WordPress is painful.

## Jekyll + Markdown

Well that's what I experienced when I decided to get back to basics by moving to a Markdown-centric statc site built in the Jekyll framework in 2015 or so. I managed to botch exporting a significant chunk of posts from that old WordPress database, and so I have a large hole in my blog history prior to 2004.

## Next.js + Markdoc

Jekyll got the job done, but it felt very constrained. Doing things that I wanted to do in my site felt like hacks, and so I was open to options. I did a project with Next.js and Markdoc at work and thought it would be great for my site. Sure enough, here we are.

The heart of the site are Markdoc files, one for each blog post. Each one has flexible metadata ("frontmatter") in the file header, with extensible Markdoc content. Keeping things file-based gives me more confidence that moving to the next platform will be easier, or at least more reliable than extracting data from a MySQL database. [Have a look at the source code](https://github.com/zsteinkamp/steinkamp.us) to see the different tags (components) that I've made that keeps the markdown-based content semantic.
