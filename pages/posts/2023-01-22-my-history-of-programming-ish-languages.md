---
layout: post
title: 'My History of Programming(-ish) Languages'
date: '2023-01-22 12:00:00'
tags:
- Memories
- Nerd
- Software
---

I thought it would be good to write down the programming languages I've used and the context that I learned them in. So here we are.

## 1980 - Logo (Turtle Graphics)

My earliest computer programming memory was from a computer lab with Apple ][ computers in some school at night when I was 6 years old. I was there for a computer class (I can't remember the lead-in to that), and was blown away by being able to type things and have the computer draw what I asked it to. I learned the 'repeat' command either this time or the 2nd time I was in front of Logo, and stars were born [on the screen].

## 1981 - Visicalc / Lotus 1-2-3

While for some it may seem a stretch...

Lawyer: "Objection!"

Judge: "I'll allow it. Let's hear what he has to say. Mister Steinkamp, you know you're on thin ice here. You better have a good story."

Me:"

While for some it may seem a stretch, I feel that these spreadsheets count as a programming language for two main reasons. Number one, spreadsheets have a well defined vocabulary for constructing a chain of dependencies, which can include values or functions (complete with logical constructs!) This is a lot like a programming language with variables and methods, with a recalculation layer on top. Number two, anyone who has spent any amount of time close to any business knows that today, Excel remains the world's most popular business application development platform in existence, by a huge margin. Most businesses run on spreadsheets! (This is not necessarily a good thing!)

My dad would sometimes go into the office on weekends and bring me along. He worked for the Gap in their main warehouse and distribution center in Kentucky doing "logistics". He very irresponsibly sat me down in front of an IBM PC one day instead of the usual Apple ///. So I poked around and discovered it had Lotus 1-2-3. I was hooked as soon as I figured out I could use a formula to fill a cell with as many asterisks as the number in its neighboring cell.

```
=REPT("*", A1)
```

```
    |    A     |     B     |
----------------------------
  1 |        8 |  ******** |
----------------------------
```

Most kids liked action figures and stuff. I liked maps and Legos and computers.

## 1982 - BASIC

I don't recall the exact event, but one day a Commodore VIC-20 materialized at our house. It was easy to hook up to our TV ... a majestic 13" black-and-white beauty that received 3 channels. Luckily one of those was Channel 3, which is what the VIC-20's RF Modulator used.

The memory of sitting down at home with the nice spiral bound manual, typing in a program, and RUNNING it. Hook, line, and sinker!

The VIC-20 soon became a Commodore 64, and the joy of BASIC only intensified. It had sprites, sound, and more color than the VIC-20. I eventually bought Commodore's "[Super Expander](https://en.wikipedia.org/wiki/Super_Expander_64)" cartridge, which added a lot of graphics and sound commands to the BASIC language, so making programs got even funner.

## 1987 - AutoLISP

One day my dad brought a floppy with AutoCad 2.18 home from work. I dug into this amazing software and got really good at using it. I bought a book that mentioned the LISP programming or scripting language embedded in AutoCAD. I bought a book just on AutoLISP to really learn what it was capable of. It was mostly over my head at the time, but IIRC I did some interactive drawing automation thing with it.

## 1993 - Visual Basic

During middle and high school, my zest for computers was stronger than ever, but I was less interested in programming them. I worked as a service tech for Fry's Electronics, fixing customer's computers or helping them to make the right kind of upgrade for what they needed.

After high school, I worked as a temp assembling computers at the company where my dad worked (WYSE Technology). When I moved away to go to college, I got a job at a corporate travel agency doing IT work for them. This was everything from network and phone systems, to generating custom reports for their corporate customers.

I picked programming back up for the latter part. The environment there was all IBM equipment, with all the office PCs (IBM PS/2 Model 30) connected via Token Ring to an IBM AS/400, which ran the travel reservation system and had a 9600 baud modem connection to the main airline reservation system.

They wanted to re-do some reports that needed data from the AS/400. When I started, this was a manual process using a 3270 terminal emulation program on one of the PCs to query then export data to CSV, then load it into Excel. I figured out that we could purchase some software that would then let me write some Visual Basic code in Excel to automatically query the data from the AS/400 and download it directly into Excel sheets. It could then iterate over all of this customer data, and automatically print reports with charts and graphs that were sent to each customer. If they were a large customer, it would automatically print them in color.

I later learned standalone Visual Basic and made a talking clock using samples of myself saying the numbers 0-19, 20, 30, 40, 50, "am", and "pm", and a TCP/IP-based chat app.

## 1996 - C

My first exposure to C was in a CS 101 class. I remember being a little in awe of the language and a little intimidated by it. It was so serious! Whereas other languages I'd learned in the past like BASIC or Logo were a little silly in comparison.

Though I had it in school, I didn't REALLY learn C until I started at Yahoo! in 1999. The entire page serving layer was written in C. Yes, we were generating HTML in C. I got really good at C.

## 1996 - Javascript

I was lucky in that I was in college when web browsers started to become more well known. Javascript was invented in 1995, and started showing up in browsers shortly after that. In the beginning, I only did simple stuff with Javascript like image "rollovers" (changing an image when the mouse moved over it, like for a button). Software like Macromedia Dreamweaver or Microsoft Front Page would generate Javascript for pages, so my skills with the language were pretty limited, since the rollovers were handled already. ("mmpreloadimages" anyone?).

I learned more Javascript around 2001 when we started to use it at Yahoo after the company started a partnership with some broadband providers. I led a project to adapt My Yahoo to be able to take advantage of the fact that these users would have been sent IE6 on a CD, and would have faster internet connections. This meant we could use CSS and Javascript!

## 1997 - Perl

I picked up some Perl here and there in different opportunities to use UNIX systems in school.

Though I didn't REALLY learn it until I started at Yahoo! in 1999. The team I was on had a layer of our system that was a Perl server that generated personalized page templates. I got really good at Perl in this job. I changed teams and did a heck of a lot more perl building a hierarchical availability reporting system. I remember zoning out at some family parties thinking about building recursive functions to walk scalar and array references through the data structure.

Perl was a powerhouse for its time, but the language itself is pretty nasty ergonomically, especially in the hands of someone who knew it well enough to use its myriad special variables and symbols. "use English;" was not used enough.

## 1999 - C++

My first team at Yahoo also had a good chunk of C++ in our stack, used in a service that managed user preferences. Coming from C, C++ was an amazing language. There was a great C++ culture at Yahoo, with a whole army of in-house standard libraries for nearly everything we would want to do (yutString anyone???). Learning about templates was so mind-opening -- this was super powerful stuff.

With the help of the great Kevin Athey, I built a declarative middleware layer for the configuration service we used C++ for. This eliminated tons of boilerplate code for request URI=>function mapping, user authentication, request parsing, and other things from the codebase and moved it to an XML file that was read at server startup into a data structure. It was here that Kevin taught me about bitmasks, since each optional middleware step was internally represented by a bit in a vector, so we could use a long int to store each URI's middleware configuration. Cool stuff.

Like our C code, the C++ code was built into an Apache web server extension and scp'd to the production servers directly from our development machine.

## 2001 - PHP

In 2001, Yahoo hired Rasmus Lerdorf, the inventor of the PHP language. Shortly after that he gave a tech talk to the engineering team showing off what PHP was capable of. This was futuristic stuff for me ... being able to write what looked like HTML combined with C code to make dynamic server-rendered web pages. No need to recompile for an hour to fix a misspelled word!

I did a project with Rasmus and his team to bundle the PHP interpreter into a shared object (.so file) so that we could use PHP as a snippet template language inside of the My Yahoo C code. This eliminated tons of tedious memory manipulation from the C code, since we no longer had to malloc and free bytes to assemble the HTML that made our pages. We could just prepare a data structure and hand it off to the PHP interpreter module with the filename of the snippet to process, and we got back a char\* that we could then add to our server output. Magic!

When I left Yahoo to help start Dipity, we chose PHP as our server-side language. It's there that I really learned to regret using PHP for a large codebase. The nature of the language is perfect for smaller sites and pages, but things got messy pretty quickly with how we used PHP for our large product. Live and learn!

## 2009 - ActionScript (Symantec)

After Dipity, I joined Symantec to work on a new product targeted at doctors and hospitals. This product integrated with digital medical imaging devices and provided storage (on-prem transparently sync'd with cloud storage), analytics, viewing, and sharing.

I worked on all parts of this product, but one of the more interesting parts was the image viewing function. Most of the files that our beta customers were working with were monochrome, high bit-depth images. When displaying monochrome images, consumer-grade computers and monitors are limited to 8 bits-per-pixel, which gives 256 possible shades of gray (from pure black to pure white). Radiologists use wildly expensive computers and monitors to display images that could have 16 bits of monochrome data per pixel, which gives 65,536 possible shades.

We wanted radiologists to be able to view and manipulate images in a familiar way on regular computers. At the time, Adobe Flash was really the leading way to provide a very rich and interactive experience in web browsers.

I did a deep dive into Flash's abilities when it came to high bit depth images, and was really surprised at its level of support. We could load these 16-bit mono images and display them, but what really took the cake was support for transformation matrices that allowed for real-time manipulation of how the high bit depth data was mapped to the low bit depth display.

Building and delivering the .swf that allowed this stays with me as one of the cooler projects I've done in my career.

## 2010 - Ruby (Groupon)

I joined Groupon at perhaps the steepest part of its growth curve. The product was already in market and was seeing massive success. At the time, Groupon's claim to fame was that it was the fastest business in the history of the world to hit $1B in gross receipts. Aside from maybe a half dozen full-timers, the majority of the dev team were from a couple of Chicago-based consulting shops (8th Light, Obtiva) who had some really forward-thinking concepts around software development -- such as a heavy reliance on unit tests, CICD, and a general mindfulness around the craft of creating software that I hadn't seen before. The product was completely built on Ruby on Rails.

This was my first exposure to Ruby, and it was very odd! For example, the loop/iteration syntax was strange, compared to the C-style languages I had worked with previously. Rails was this half-awesome (magic!), half-evil (magic!) framework that on its surface made simple things very simple, but complex or high-load use cases required a very deep understanding of the framework and language.

My job centered around helping to scale the technology platform, and not so much the product itself. This was a fantastic place to learn and grow, and is one of the top places where I can point to important projects and friendships that I built.

I really learned to love Ruby in this job. It has a wonderful consistency in its design (e.g. _every_ type, even primitives, is an object), and some really beautiful features that make programming even more interesting (e.g. `method_missing`). It's still my go-to language for getting things done in a computer, particularly since it's pre-installed in OSX.

## 2014 - Java (Datatorrent)

I had a fairly brief stint at a job where Java was the language of choice. This was in the "negatives" column for me when choosing the job, but the product was awesome and it was backed by some people I really respected. It's just a language, right?

With my experience with C++, the language of Java wasn't too difficult to pick up. However, getting things done in Java was tedious - not because of the language design but because of everything around the language. All the XML scaffolding needed to build a project, the slow-as-mud IDEs, and the vast wasteland of libraries led to a relatively dim developer experience that I hope to not repeat.

## 2017 - Node.js (Splunk)

Another new job, another new language.

I started at Splunk to help bootstrap a set of tools to be used by its 2000+ person sales team. The group in charge of these tools didn't have any technical staff, so the first of the tools was built by a consulting shop. Splunk rightfully realized that building things in-house was going to lead to better outcomes, so I was the first hire to transition into a home-made model.

The consultants had chosen Node.js for the backend and React for the frontend. I had experience with Angular in the past, but React was philosophically very different and a new challenge to learn. I already knew Javascript, so Node.js was fairly easy to pick up.

I really think Node.js is overall very well done. It's super capable, promotes an async-first mindset, and has a really engaged and thriving community behind it. Perhaps the worst part of working in Node.js is that the community also seems to skew toward younger developers, so there have been some pretty serious bumps in the road, mostly centered around package distribution security.

## 2022 - Ruby with Sorbet (Stripe)

Despite "still being Ruby", writing code at Stripe felt like learning a whole new language. Stripe developed an add-on for Ruby called [Sorbet](https://sorbet.org/), which adds type checking to the language. This makes Ruby feel a lot like Java in more ways than the ergonomics of typing code. The scaffolding required to build and maintain the types requires some hefty background processing and deep integration with an IDE to work well.

I did come to appreciate the confidence that types bring to software development, so IMO this is a net win -- as long as there is time and space to adapt to the infrastructure and behavioral changes required to embrace it.
