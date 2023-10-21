---
layout: post
title: 'A Dev Team Blueprint'
date: '2023-10-20 12:00:00'
thumbnail: '/images/blueprint.jpg'
---

_(Written to my colleagues on my personal computer.)_

As you probably know, my mission is to help ship a great product by a fixed deadline that already feels like it's coming right up. To me, that mission is an important one. We need to be able to demonstrate that we can deliver valuable products in a timely manner. I am confident in our abilities there.

However, this is the superficial mission.

To me, the actual importance of that mission is that we can **use it as a tool** to achieve something a **lot more important**.


## **Reflecting**

This organization has a heavy feeling. I'm using "heavy" emotionally, not physically. I've loved meeting and talking with everyone I've talked with so far. I have consistently felt feelings of hope and awe of peoples' skill, but also a weight - as if enthusiasm is being subdued by a heavy blanket. I have worked in these environments in the past, too. In prior jobs I have seen systematic removal of responsibility from individuals, a punitive leadership structure, deadlines ruling the roost, and infrequent software releases adding up to a job that is easy to resent.

I have also worked in environments where those weighted blankets do not exist - where there is a clear feeling of personal ownership of the value the team is delivering to the customer. Where bugs are fixed and deployed right away. Where each team member feels connected to their customers and what they actually need. Where people feel individually valued for their contributions and supported from all sides. Where the team recognizes and celebrates the improvements they ship.

In my experience, the improvement in environment and outcomes correlates with:

* a high-responsibility environment
* a strong support structure
* lack of self-imposed time boundaries
* actual continuous deployment


## **High Responsibility Environment**

Responsible people are usually capable of being responsible in many ways. The best environments I've worked in are those where there are no boundaries of what a person is allowed to do to make progress. If we take away responsibilities of quality, security, reliability, architecture, planning, and dreaming about the future, what are we left with? 

By putting those responsibilities in the hands of the development team, with support from experts, we build an environment of elevated connection to all the facets of the product surface and the customer experience. This exposure builds impressive skills in your team members.

Your best team members will thrive in this environment and your natural leaders will show themselves.

Give developers significant chunks of work -- full features rather than tiny crumbs. Let developers develop muscles around communication, negotiation, exploration, decomposition, and fact-finding by making them responsible for entire epics. **Support them through this and teach them.** See what happens...


## **A Strong Support Structure**

A world-class **automated testing** system will support developers in taking responsibility for product quality. 

A top-notch **observability** solution will keep developers informed on how their product is functioning, and will provide them with tools to effectively diagnose problems, allowing them to take responsibility for **product reliability**. This system also provides insights into customer behaviors and product usage, which can be used in developing **product strategy**.

A **supportive** **security organization** to serve as risk advisors, help teams in developing secure designs, and elevate the capabilities of the teams they work with. This security organization also exists to ensure that **co-developed** security standards are followed.

An **architecture organization** exists to support the needs of the team in an ongoing manner in helping them to develop solutions to complex problems, **strengthening** and **empowering** the team along the way. The architecture organization also exists to keep teams' solutions on-track with needed compliance requirements.

A **product management organization** that demonstrates clear ownership of their products. They know their customer’s pain, they are creative and relentless at driving toward delivering great value through the best solutions. They function as teammates of developers, supplying a necessary voice and expertise in the product development process.

The support of **teammates**, who know how it is to do what we do and exist to lift one another up through sharing skills, experiences, and opportunities.

**Leaders** who see themselves as **supporters** of their teams let the talented team members shine, and take pride in the accomplishments of their teams, recognizing that success is due to the partnership with the talented individuals building the product.


## **Lack of Self-Imposed Time Boundaries**

Of course there are sometimes important moments in time that we have to plan around. I acknowledge the presence of the Trade Show Date or the Contract Expiration Date. This is more about self-inflicted dates...

Above a certain level, each periodic milestone you add to your team's calendar, the less efficient the team will run. This is because these periodic milestones usually correlate with a planning cycle or a synchronous flow in the team that only has one section of the team working at maximum efficiency (e.g. develop, test, release).

Scrum is a great example of self-imposed deadlines galore, with 8+ hours of meetings allocated over a two week period. Every. Two. Weeks. This is deadly to productivity and completely unnecessary.

Approach every periodic ask of the team with great scrutiny, for time is a completely non-renewable resource!


## **Actual Continuous Deployment**

By driving the cost of a production deployment to zero, we facilitate more deployments to happen. By maximizing the number of deployments, all kinds of great behaviors emerge from our teams and their support structures.


### **Cost of Risk**

The more changes accumulate between releases, the riskier those releases are. Risk for developers is stressful. Stress has a cost. I think anyone would prefer not to have each product release feel like an Apollo rocket launch. 

By minimizing the amount of changes in each release, we minimize the cost of risk of each release.


### **Cost of Waiting**

The team is building their product to bring value to their customer. The sooner the team can bring value to the customer, then we can start collecting money from that customer. By driving the duration from "feature complete" to "in the customer's hands" to zero, we maximize value to the customer and $revenue for us.


### **Cost of Not Iterating**

It is rare to deliver the perfect customer experience from the beginning. The more attempts the team has to deliver a change, learn from the change, and deliver a refinement the closer the team can match the customer's actual needs. Iteration lets us learn and improve. By driving the overhead of iteration to zero, we will be able to iterate more, and thus deliver a better product.

Continuous deployment addresses these costs head-on. It also places responsibility for quality square in the developer's hands. This serves to increase product quality through improved automated test coverage and pride in craft that comes with the sense of responsibility.


## **What We Are Shooting For**

What follows is a blueprint for a team who can operate with a high degree of responsibility, efficiency, and quality, given the conditions above are satisfied...


### **Daily Status**

A team can run amazingly well with asynchronous status updates in Slack each day. The time saved on not having synchronous standups can be used **productively** for focused conversations that should result from the Slack statuses, rather than the droll _"Reading of the Jira Issue IDs"_ that so many team standups have become.


### **Weekly Team Meeting**

An hour on the calendar per week for the team to sync up, discuss issues, demo to each other, teach one another, and take some time for introspection (retro) goes a long way. Team members should be empowered to collectively manage the agenda, with the support of the team's leader to help keep the team on track. Longer discussions can have their own specific meetings with specific attendees scheduled.


### **Quarterly Strategic Planning**

Strategic planning and prioritization happens on a quarterly basis. Avoid making this into an artificial deadline. Just consider it as a point in time, with current work-in-progress given its fair seat at the table when planning into the future.


### **Continuous Prioritization**

Prioritization can happen continuously, via a partnership between engineering and product management. Product managers own the product vision. Engineers own the product implementation. There aren't hard boundaries between the two, and everyone shares the same abstract goal of product success. Product managers should reasonably articulate customer value. Engineers should reasonably articulate the benefit of reducing or avoiding tech debt. The product leader and engineering leader will collectively own prioritization of work for the team. If they can’t get along then they will fight to the death and the winner will rule the team. Haha j/k - just making sure people are reading. Changes in priority are carefully considered and clearly communicated. Sudden changes in priority are given appropriate weight and consideration.


### **Single, Prioritized List of Work**

There is a **single**, prioritized list of work for the team. _(Note: People like to call this Kanban, then purists point out why it's not "actually" Kanban, and then no good ensues...)_

The developer workflow is simple -- when it's time to work on something new, work on the most important, most appropriate work. Certain things are most appropriate for certain people sometimes, so embrace that. Have team members be vocal about what they're taking. Pre-assign things when they should obviously be done by someone specific. Simple.

Work can be organized in any system that lets you rank projects, give a project an owner (including "UNASSIGNED"), description, estimated date with honest % confidence, status (Not Started, In Progress, Done), delivery date estimate with honest % confidence, and status description (with history). This can be Jira or a shared spreadsheet. The specific tool doesn't matter as long as there is one list and the data requirements are satisfied. Any of these values can be changed at any time and should evolve toward truth / knowledge as time goes on and we learn.

It is clear at a glance who is doing what. It's easy to see if someone is over- or under-subscribed. Anyone can see the list of projects with owner, status, estimate, and status description on one screen, allowing for easy transparency.


### **Documentation is a Necessary Output**

Important designs and decisions are captured in right-sized documents, in a system that gives a good level of organization and inter-linking between documents. Teams are proud to produce these documents, as they tangibly represent clearly important work that has been done, with names.


### **Vertically-Capable Teams**

Team reporting structures are made vertically along feature boundaries, not horizontally along technology layers. This enables maximum effectiveness in aligning the team to customer value, not on organizational convenience.


### **Anti-Silos**

In order to combat technology-micro-silos from emerging, developers of similar disciplines must be  well-organized across their domains of expertise, e.g. front-end, data platforms, observability, security, etc. These domain groups will also meet weekly, with a similar format to the team meeting described above (participant-driven agenda). Every developer is expected to participate in one domain group meeting per week. Your specialists will go the same ones each time, your generalists will rotate between groups.


### **Automation Automation Automation**

Merge requests (MRs) are appropriately accompanied by automated tests. An MR represents no more than a couple of days of work. Progress against large initiatives is accomplished incrementally, with a feature flag system gating access the new work, first to the developer, then to stakeholders, then to all users. This allows progress to be made in public with small changes to the production environment – minimizing risk and maximizing stability. Once an MR is merged, it is sent to the build/test/deploy pipeline for production deployment. This pipeline enforces quality and security checks at many layers.

---

Product development teams are an example of a complex system. Complex systems have interconnected subsystems. Some of those connections may be unexpected or unexpectedly powerful. 

What I've outlined above is a top-to-bottom design for a complex system that will result in delivering products of maximum value with maximum efficiency and quality. 

The heart of the system is empowering the builders of that value with a strong support structure to develop solutions and learn from them. The design minimizes ceremonial overhead and maximizes healthy and engaging exchanges of ideas and decision-making. Those times are my favorite times from my career, and I'm excited to help bring more of them to more people. 

We all benefit from this.
