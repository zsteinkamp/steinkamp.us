---
layout: post
title: 'What I Learned At Stripe'
date: '2022-11-10 12:00:00'
toc: true
thumbnail: 'https://marketplace.mypurecloud.com/e381987c-6f3e-4fc7-b562-8526d3e0ac45/companylogo_bf4b0be5.jpg'
tags:
  - Work
  - Philosophy
---

In February 2022, I left my job at Splunk to take some time first to relax then to [focus on finding a fantastic next job](/post/2022/02/06/what-comes-next.html). I managed to do both during my three months of funemployment, landing a job at Stripe in the [Atlas](https://stripe.com/atlas) team in May. I was [laid off](https://techcrunch.com/2022/11/03/stripe-cuts-14-of-its-workforce-ceo-says-they-overhired-for-the-world-were-in/) in November 2022, along with most people who were hired during this time.

Despite it being a very short stint in my career, what I learned at Stripe was nothing like I had experienced in more than 20 years in the industry. The intent of this post is to capture those learnings, both to organize and solidify them in my own mind and to spread these ideas to more people, since they really worked to build an exceptionally high-functioning environment.

So here we go with the big things that I think made my team at Stripe run better in certain ways than any team I've been a part of:

## Gratitude built-in

Stripe installed or built an extension to Slack where if a person types `/++ @teammate Some nice words` in a public Slack channel, the mentioned teammate and their manager receive a notification of those nice words. This is also stored in a central system and shows up on the employee's company profile page, and is also available to managers during annual performance reviews. This is a great low-friction way of promoting a positive, grateful culture in the company.

The Atlas team also reinforces this in their Friday wrap-up meetings in a segment called "Mad Props". The /++ feedback is collected by the meeting DRI (see below) into a meeting doc, and others from the team can add their own kudos and mad props to that section. The person doing the thanking reads or mentions their items for the team to hear in the meeting.

This practice normalizes gratitude in the team, and sets a mild expectation for recognizing the people who helped you that week. It builds community, camaraderie, and warm feelings in the team, which contributes to a high-functioning team.

{% captionedimage src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Ty_Logo.svg" alt="ty" caption="Default thank you emoji." className="float-right w-40 ml-8" /%}

One thing I was surprised to see on my first day at Stripe was the default "thank you" emoji in Slack is the Ty Beanie Baby heart. I was initially afraid to use it (sending hearts to coworkers?!?!?!), but in time I learned to see it as a tool for elevating the good vibes. Once I got over the initial shyness around using it, I felt more liberated to share my gratitude in this very strong way.

## The DRI

Each task and project in the team has a single person who is responsible for that thing in that moment - the Directly Responsible Individual, or DRI. The DRI for something may shift as time passes, and this fact is communicated clearly to the team and stakeholders when it happens.

This helps to avoid the tragedy of the commons where shared ownership results in no ownership. It also builds on a culture of top-to-bottom responsibility, which builds more capable team members and gives higher quality output. A common question asked in team meetings when a great idea is presented is "who wants to DRI that idea?" This way, fewer great ideas fall between the cracks of responsibility between people.

## Hiring for growth, diversity, and EQ

So many companies hire solely on technical aptitude, then design the role of the engineer as an implementer of others' ideas. Stripe (and specifically the Atlas team) biases hiring much more strongly on aspirations, track record, taste, and potential. Of course, the technical bar is still very high, but it's not the only bar.

The team is filled with enthusiastic, energetic, fantastic communicators who are motivated to deliver ideal user experiences. In the right environment, people with these skills are able to produce a better product and build a better team culture than a dull, code-focused, command-and-control kind of environment.

## Learning in public

First, some context: The Atlas team works differently than any other team I've ever worked in. The engineers in the team take on a lot of the duties that would normally be filled by product managers. The team has product managers, but they are more strategically focused and help to support the engineer DRIs as product ideas are developed and shipped.

Because engineers are shepherding conversations with product management, design, legal, or other teams to shape the implementation of a product idea, it's helpful to write down questions or decisions as they come up, then invite others from the team to review and comment. This is usually done in a "Project Brief" document, which follows a common template of problem, context, solution, task checklist, and metrics.

This builds awareness through the team of what is happening, and provides teammates from all disciplines to share their thoughts, questions, doubts, or ideas with the engineer DRI, all with the net result of shipping a better product to our end-users.

The team also embraces mentorship, pairing, and teaching opportunities at every turn. Weekly team meetings regularly have teaching/learning segments, Slack Huddles are used for quick pairing sessions, and the team regularly "mobs" documents to help shape ideas or wordsmith messages in real time.

## Shipped emails

A project in the Atlas team was considered done when a Shipped email was sent. This message, sent either to a team-specific group or a company-wide group (depending on impact) summarizes the problem and context around the problem, describes the solution approach (usually with screenshots or screen recordings), and quantifies the impact with metrics. It usually ends with a "we haven't won yet..." section where future phases or strategies may be laid out.

It's not uncommon for a project to _begin_ with writing (but not sending!) the Shipped email, serving as a north star for understanding the scope and goals of a project.

Shipped emails are echoed automatically to a Slack channel, and there is invariably a great react-ji storm underneath, along with a discussion or kudos thread.

## Dates have a % confidence

I'm generally [not a fan](/post/2019/08/24/on-dates.html) of assigning due dates to development tasks, since so much of a project is unknown when we start it. We probably have a rough idea of magnitude, but so often project managers push for specific dates, which sets the team up for failure. The Atlas team does track date estimations, but those dates are always accompanied with a confidence level in that date. It is understood and embraced that these numbers will change over time, and changes are always communicated clearly in writing, and sometimes discussed in weekly "Ships Review" meetings.

At a higher level, this is a good example of embracing the reality of the world when doing project management. So many companies get this wrong, and suffer as a result.

## Direct user feedback

The practice of soliciting direct feedback from end-users percolates all the way through Stripe, into every corner.

The most obvious example is in the weekly all-hands meetings, led by the company founders. In this one-hour meeting, there is always a 20 minute section where an actual Stripe customer is invited to talk about their experiences with Stripe, with the entire company listening. This really sets a precedent for teams to follow.

The Atlas team would regularly hold open customer calls, with members of all disciplines in the team encouraged to attend and participate. Hearing the actual words of the customer, seeing their expressions, hearing their emotions helps to really hit home the impact the team is having.

We would also funnel in-app customer feedback directly and immediately to a Slack channel, along with a Twitter search bot that would post to the same channel if anyone tweeted about our product. New account sign-ups also are sent in real time to a Slack channel, including business name and description. This energizes the team, knowing they are working on a live product with an amazing breadth of customers.

## Keep it positive, keep it public

The team culture in Atlas was always positive and light-hearted, but never insensitive or snarky. Hiring people who know how to communicate challenges in a positive way helps to reinforce this. Keeping team channels public helps to keep everyone on the straight and narrow in avoiding badmouthing other people or teams in the company. Shit-talking was culturally unacceptable in the team. If a private DM conversation started to go in that direction, someone would speak up to take the conversation to a public channel, and things returned to a more constructive tone.

## Friction logs

When I started in the team, my first task was to "friction log" Stripe Atlas. This means I was to select an end-user persona (bonus points from the team for something cute or funny), and go through the Atlas product flow as that user, taking very detailed notes along the way of anything that was not perfect.

The team absolutely devours this information, since everyone is very aware of the tendency of developers who are very close to a product to start to become blind to its frictions. Our job as a team is to deliver the most friction-free experience to our users, and this practice helps to support that.

Friction logging is a Stripe-wide practice, so people from our team would regularly friction log offerings or dependencies from other teams, since we are their end-users. This feedback was always welcome and frequently resulted in improvements delivered in short order.

## More open data warehouse

Every company I worked at prior to Stripe built huge walls around their data warehouse. This resulted in a severely limited flow of information through the organization, forcing teams to use their intuition more than data analysis, since the data team would always have a miles-long backlog of requests to fulfill.

Stripe is the fist place I've worked where the data warehouse is open to everyone to query and extract information that is relevant to their job. Of course, there are still strict access controls and auditing around company data, but access to relevant datasets are granted by default to team members.

It's quite common for batch or cron jobs to execute a warehouse query to extract their working set of data. This completes a feedback loop of data ingestion and processing that only benefits the end-user.

There are fantastic interactive query building and sharing tools, as well as well-understood SDKs for developers to integrate into asynchronous tasks, and a featureful charting tool for teams to build dashboards to their heart's content.

By removing the moat from around the warehouse, the power of information can be used in multitudes more instances and situations. Companies that lock down their warehouse are absolutely shooting themselves in the foot.

## Monorepos work, to a point

Stripe, for the most part, is built in a monorepo. Thousands of engineers work on a single repo, which houses backend and frontend code. The backend code serves the Stripe API, runs batch jobs, cron jobs, the admin interface, and interactive data manipulation tasks in dozens of services running slices of the same codebase. The frontend code exists in a few layers, with the company-standard UX building blocks alongside specific product implementations.

The advantage of such a system is that presenting a cohesive interface - whether it's the look and feel of the Stripe UI or how data is modeled in backend systems - is the nature of the beast. A consistent interface is a big contributor to the sense of quality. Security controls can easily be applied globally, versus visiting 100 different teams with 500 different repos written in 10 different major or homegrown frameworks.

The downside is that this is an exceptionally active repo. Hundreds of pull requests are merged each day, so any branch that you're working on for more than a couple of days faces a large risk of merge conflicts or worse. If there is an issue with a single deploy, it stops the company from shipping changes to the affected service.

I think I joined Stripe toward the end of the useful life of its monorepo, and there was a project well underway to pull some core product / business functions into specific repos that could be insulated from the chaos of the monorepo (and vice-versa!).

## Actual CICD can work

When pull requests are merged to the main code branch, that triggers a test and deploy run. Of course, this practice requires good automated test coverage. It's pretty clear that the efficiencies gained from automated deploys outweigh the cost of writing more tests or employing dedicated QA people.

Stripe is literally continuously deploying code to production. As soon as one deploy finishes, the next build begins - usually with dozens of merged pull requests that were waiting to go. Only whale customer mandated seasonal freezes slow down the pace of deployment.

One big CICD risk-mitigating tool in Stripe's toolkit is a very well engineered feature flag system. This allows the team to deploy entirely new features or product flows, but to only expose that new code to specific test accounts. The downside is that there is more complexity in running old and new code paths, but it is offset by a clear confidence in the operation of the new code in the production environment.

Actual CICD also encourages iterative development, since the overhead of shipping an incremental change is very low. This also promotes higher quality work, since the developers can more efficiently take smaller steps on their way to delivering a new feature.

## Remote development can work

Cloud hosts, provisioned on-demand with a branch checked out and ready to go were the main vessels of development. This is a boon for productivity maximization, since if you were blocked on someone on a project you were working on, you could switch instantly to a different project, already running and ready to go on a second remote devbox.

## Big investments in dev tooling pay multiples

Stripe's developer tools were absolutely next-level -- with tight integration between VSCode, Sorbet (the company's type safety layer for Ruby), Typescript, mountains of auto-generated files (e.g. .`proto` files for protocol buffers), and the dozens of services up and running on the devbox, viewable and controllable from within VSCode. Stripe's investment in dev tooling made for a very homogenous codebase, since idioms were super strictly enforced by the auto-generation layers.

---

_Stripe colleagues, what did I miss? Email me :) zack@steinkamp.us_
