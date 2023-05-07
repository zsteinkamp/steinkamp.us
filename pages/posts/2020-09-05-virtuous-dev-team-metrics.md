---
layout: post
title: Virtuous Dev Team Metrics
date: "2020-09-05 12:00:00"
---

As the leader or member of a software development team, you may be encouraged, inspired, or even forced to track particular metrics of the team’s performance. This post seeks to identify those metrics that lead to the best outcomes for the team, the products they are building, and for the business. We will also look at some "industry standard" metrics and we will see how they can be counterproductive, since they don't actually lead to a stronger team, and are susceptible to being gamed.

## The Power of Measurement

The Observer Effect is not contained to the field of physics. It is very much a real part of social dynamics, where a person will undoubtedly change their behavior if they know that behavior is being scrutinized, especially if there is a reward or punishment tied to that behavior.

As software developers, we take pride in being professional and scientific. Measuring system performance, error rate trends, or end-user activity are table stakes for running a successful service. The benefit of collecting, analyzing, and taking action on this data is clear.

Teams will feel this benefit, and be inspired to look inward and start to measure themselves. This brings the team into a dangerous space. The path to a high functioning team is fraught with peril, mostly due to the sheer number of deceptively toxic metrics to track in the team's behavior.

The number of metrics that a team can truly focus on is limited, and it is just human behavior to focus on outlier measurements (particularly "good" or "bad") when making decisions, perhaps ignoring the context that produced those metrics.

The mere act of measuring something will change your team's behavior. Most developers are motivated people who want to do the best job. By measuring something, you are indicating that the thing being measured is important to assessing whether "a good job" is being done, and so the team will naturally optimize for that thing.

It is your job as the manager or member of the team to wisely choose what you are going to measure, and fully understand the consequences of measuring. Developers are humans and want to be seen as good, both by their peers and by their manager.

Team metrics must be virtuous and immune to gaming.

## What Are We Optimizing For?

This is the first question the team needs to answer. Professional software developers exist because computers are the most important productivity tool in existence today. By developing more and increasingly sophisticated software, businesses can run more efficiently, satisfy their customers better, or find new customers. Therefore, a team of software developers should be striving to deliver maximum value to the business that is employing them and should also seek to improve their own skills.

## And Now, The Virtuous Metrics

### Virtuous Metric: Business Value

Just as any other professional, a professional software developer trades their time and skills for money. By quantifying the impact an individual or team has on the business, it is easy to see where an investment is wise.

Business Value is sometimes easy to measure. For example, a team dedicated to optimizing a product recommendation engine is very close to the money stream of the company, and can very scientifically measure their impact on company revenue, especially if they are willing to segment users into an experiment group and control group.

It can also be very hard to measure. For example, an advanced R&D team may have many expensive and unproven ideas they are trying out, but the potential benefit to the business may be huge. This potential impact is what the business is investing in, and just like any other investment, there is a possibility of loss. Possible financial upside multiplied by the potential for success (0 < n < 1) can help to guide the value estimate here.

Even more difficult to measure is the business impact of supporting systems, like network infrastructure, database administration, or an identity/login system. These are systems that are absolutely required for a business to exist, but are not tied to any kind of money flow. In these cases, Business Value is a more tricky metric. Teams in this category should be tracking how their work leads to more efficiency in terms of time, accuracy, or correctness, and quantifying the value of that. For example, a networking team may track the negative business value of outages, seeking to drive that to zero. A login team may track how improvements in their service streamline the experience of end-users, and perhaps results in quantifiable time savings.

By shining a light on Business Value, the team will understand their contribution to the success of the organization, and inevitably shape their behavior in a way to optimize this.

All of these improvements to Business Value are made by individuals in a team. Each individual brings with them a unique and ever-changing blend of capabilities. For those capabilities that are relevant to the task at hand, we should all be striving for improvement. Not just in terms of what a person is already good at, but also in terms of what they are not yet good at.

### Virtuous Metric: Capability Breadth and Depth

It shouldn't be controversial that a more capable team will be able to deliver more Business Value than a less capable team. Therefore, it should be our goal as software developers and managers to make ourselves and our team more capable. With a little bit of effort, it is easy to measure and track individual and team capability.

Let's start with technical capability. First, make a list of important technical competency areas for your team, and sort them in some meaningful way. If you're a web development team on a React, Node.js, and MySQL stack in Amazon AWS using EKS, this may include things like Usability, Design/UX, CSS, Javascript for user interaction, React, API requests and data transformation, API design, Security Policy, Controllers, Models, MySQL administration, Docker, Kubernetes, AWS Administration, Network Security, etc. This list will change and evolve through time.

Next, for each item in the list, write three short descriptions to describe what it means to be at novice, intermediate, and expert level capability for that item. Get suggestions, corrections, and buy-in from your team, since this is something you're going to be tracking.

Once the team is satisfied with this enumeration of skills and descriptions of competency levels, have each person in the team rate themselves for each category on a scale of 0-3, with zero being completely unfamiliar, up to 3 being an expert. The manager should rate the individuals in the team too. After that, have a level-setting conversation where any differences in perception are ironed out between team member and manager (sometimes easier said than done!).

This is now the go-to guide to decide what a person should learn next. If the focus is on breadth, then look to improve the capability in areas adjacent to more capability. If you want to focus on depth, take action to change those 1's and 2's to 3's through pairing, training, or projects.

This capability matrix can be revisited periodically in order to quantify that team member's journey to more capability, and should be tracked through time to clearly demonstrate the employee and manager are doing their job to improve capability.

The team now also has a tool to quantify important skills. The values for individuals can be summed to provide a whole-team view of capability. This can help show where the team needs to improve skill, either through cross-training, training courses, or hiring.

Along with technical skills, a team can also develop a soft-skill matrix. This may include things like: collaboration, presentation skills, organizational influence, leadership, reliability, or whatever else the team holds dear.

The important aspects with any of these capability matrices is that they are concise in their wording, they are accepted by the people that they apply to, and that they list capability areas that are important to the high functioning of the team.

Do you have other virtuous team metrics? Please let me know. I can't think of anything else. zack@steinkamp.us

## Deceptively Toxic Metrics

Most well-intentioned software team managers inadvertently end up creating counterproductive behaviors through the act of measuring the team. In looking at a few common measurements and how they do not serve the ultimate goal of the team, we should keep the following factors in mind:

- People, for the most part, care about how they are seen by others
- Managers, for the most part, care about how their team is seen by others
- Our lives are chaotic

### Toxic Metric: Velocity / Story Points

Any up-and coming manager who just got their Scrum Master certificate is undoubtedly excited to start tracking velocity. It seems so straightforward on paper: the team meets before each Sprint (planning or work interval) to estimate task size, and assigns a number of points to the task (usually following some makes-us-feel-smart system like using Fibonacci numbers). The team then gets to work trying to deliver those tasks. By summing the numbers of points that the team and individuals in the team delivers in that work interval, the notion of Velocity can be divined. The theory states that through time, the team will eventually demonstrate its normal velocity, and thus be able to set expectations outside the team for how much work is going to get done. Individuals will also inevitably have their "personal velocity" made known. Welcome to the world of vanity metrics!

The fallacy with story points and tracking velocity is that it ignores the influence of the human factors above. People, through their nature, will inevitably inflate the number of points assigned to a given task. Delivering more velocity is good for both the individual's and the team's reputation. Everyone is incentivized to game this system. It is a bad system. Track the business value your team delivers instead.

### Toxic Metric: Stories / Issues / Tasks Completed

The journey through the swamp of velocity leads some teams to just track the number of stories or tasks they are completing in a given amount of time. The theory here is that story point estimation is a colossal waste of time (it is), and so let's just track tickets instead.

Once this is measured and publicized, the team will undoubtedly start creating more granular tasks in the work-tracking system. Nobody has time to dive into all the details, so the result will be a shrinking of tasks in the tracking system, and a corresponding increase in perceived team output! However, the team will actually be less productive than before, since time spent wrangling the issue tracking system is pure overhead time.

## In Summary

Unlike observing a computer system, observing and measuring team members will have a significant impact on how they do their job. Before choosing to measure something about the team, take some time to explore how the measurement may be optimized by the team especially when factoring human ego into the equation. Choose only those measurements where the normal human response to the measurement will lead to a more fruitful outcome. Make the choice with the well being of the business and individuals in the team in mind.
