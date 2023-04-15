---
layout: post
title: 'Ye Olde Yahoo!'
date: '2022-11-10 12:00:00'
thumbnail: '/images/yahoo.png'
---

Early Yahoo! was a very special place. It was magical and rudimentary at the same time. I joined probably past the true magical era, and was hired in Yahoo!'s first hyper-growth, bulking-out phase (empno 850) at the beginning of 1999. 

What made it special? We were inventing how internet-connected distributed apps can work at scale (well, one way!). Nobody had ever solved problems like these before, and Yahoo! made some very smart decisions along the way. 

I was hired to work on My Yahoo!, a customizable internet start page. My good buddy (since middle school) Derek was a very early Yahoo! employee, and he was my first way in to the company, along with my dear friend Mona who was working on a partnership between Yahoo! and MTV. Derek set me up with a conversation with JohnR, the manager of the My Yahoo! engineering team so that I could learn what an engineer did. I left the conversation thinking I should be a product manager, but he asked me to return for an engineering role interview, and the rest is history.

The My Yahoo! team was a great group, and a great blend of young upstarts (Ben Garrett to the courtesy phone!)  and experienced wizards (looking at you, Kevin Athey!). Our tech stack was in C, C++, and Perl. The C and C++ code were compiled into Apache modules and deployed to our 50 or so Pentium III servers that served the world. The Perl code was run as a standalone HTTP server.

What was in these different codebases? Well, the C code was the front-end (!!!) where all of the HTML was assembled that we sent to our clients. Needless to say, the engineers in my team had to be really really really good at keeping track of malloc()s and free()s. The "config" server layer, which managed user preferences for our Internet start page, was written in C++. It had a HTML template language that we could work in, so it was a lot easier to get things out than the C code at the expense of server efficiency. The Perl layer was an intermediary that rendered per-user templates for the C layer based on user preference changes. The templates were cached in the C layer, and a smart cache expiry system managed it.

When we wanted to push changes, we would compile the Apache module on our work computers (beige box Pentiums running FreeBSD 4), go to lunch since it took up to an hour to compile, then run a script to 'scp' the built Apache module to each production server, which we all had direct SSH access to. There was no CI or build team. Automated tests were absolutely not a part of the stack. Each engineer could deploy their code at any time. I don't recall a time where there was a problem with someone reverting someone else's change unintentionally... we were all careful.

That was a pretty magical time for me. I was learning a ton, was soon to be managing half the team, and feeling like a contributor. Yahoo! hired Rasmus Lerdorf, the inventor of PHP, and he sat in a cube next to me. Shortly after he was hired, he gave a lunchtime tech talk (Yahoo! had a great lunchtime tech talk culture!) about PHP, which was new to me at the time. He talked about its capabilities, and its performance. That gave me an idea that maybe my team could write little HTML snippets in PHP files, and compile and assemble them in the C layer. This would give us a flexible and high performance way of building our pages to send, with the ease of editing PHP files instead of pushing bytes around in memory in the C code.

Rasmus was into it, and I worked with him and one of his team members (Brian France) to build the loadable wrapper for the PHP interpreter. It took just a couple weeks, and we had something that worked great. This was one of my early clear memories of feeling the happiness of helping my team to move faster and better. I think it was an important moment because that has been one of my favorite parts about what I do since then.

Eventually Yahoo! got too big and too slow and business was getting tough (Google was a big player starting around 2004) and the company started hiring more managers. I had access to the HR system and at one point there was an *average* of 2 direct reports to each manager.

Interviewing at Yahoo! was completely unstructured and we were just told to do our best when interviewing people. There was no training, and little to no guidelines. We might strategize a bit as a team around who was going to talk about what, but it was purely on us to do that if we wanted to. That being said, in the early days the amazing-to-stinker ratio was fantastic, but that changed as the company fell off its pedestal.

I had a few different jobs at Yahoo! After my stint on the MyYahoo! team, I joined the "YMon" (Yahoo! Monitoring Platform) team where I was fortunate enough to learn from Mamad Zadeh, a real guru of software engineering. Jan Koum was a teammate, and he went on to start a little company called WhatsApp. I then moved into the core 10-person information security team, known as the Yahoo! Paranoids, where I got to focus on security concerns with newer web technologies like DHTML and Flash. Arturo Bejar ran the team (a superstar in his own right) along with Scott Renfro, who was a brilliant and humble manager. I learned a lot from these guys.

I left Yahoo! at the end of 2006, but I will be forever grateful to the people who helped me to start what has been a very fortunate and fulfilling career.

