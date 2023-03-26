---
layout: post
title: Manager Toolbox
date: '2021-05-22 13:00:00'
categories: post
entry:
  source: post
---

<style>
.post-content h1 { font-size:200%; }
.post-content h2 { font-size:150%; }
.post-content h3 { font-size:100%; text-transform:uppercase; }
</style>

Here's the tl;dr:
>   * Your job is to grow your team.
>   * Write down expectations of team members, broken down by level.
>   * Quantify your team's capabilities.
>   * Remember good work and areas to improve.
>   * Plan appropriately -- individually and with the group.

Now read on for more detail, including actual tools to implement the above.

In my career as a software developer, I have ping-ponged several times between being an individual contributor and a manager. In all but one case in the past, the team needed a manager either because of growth or a manager departing, and I was picked because I was the "more senior" one or seemed like I could handle the duties. In talking with colleagues, this seems to be the norm in the industry. Companies rarely, if ever, provide guidance or training to managers, and actual tactical development team management skills is not something I have seen in any university program.

Being "the manager" was a role that I would embrace initially, but would soon long for the simple days of the individual contributor, where I exercise my real passion -- making things. I shared this with a boss some number of years ago, and he valiantly tried to convince me that building my team could be viewed the same as building software. While true, I wasn't ready to hear that message at that time.

In my current role at Splunk, I was hired as an individual contributor. My boss left the company soon after I joined, and the project I was hired to start was seeing lots of success, so the team quickly grew. Here I was again asked to step into the manager role. It was definitely the logical choice, and finally this was the opportunity that opened my eyes to what a manager is really supposed to DO.

In the last 3.5 years, I've finally embraced this job, and really learned to love it. I think maturing as a person has something to do with it, and the skills and mindset of raising kids as a single parent certainly had something to do with it. Of course, I don't see my team as my kids, but there are some foundational skills that a person can learn in parenting that translate to management, such as appreciation for individuals, patience, discipline, and faith that other people will learn and grow. Hiring everyone in my team certainly was a benefit in this job, and led to a lot more satisfaction as a manager.

In this post, I want to share what has helped me to really enjoy the manager role, and in particular some tools that I have developed in order to make this job work for me and my team.

* [Attitude / Philosophy](#attitude--philosophy)
* [Written Advancement Path](#written-advancement-path)
* [Quantified Technical Skill](#quantified-technical-skill)
* [Trophy Case](#trophy-case)
* [Fractal Planning](#fractal-planning)


# Attitude / Philosophy

Perhaps it's an over-simplification, but from what I've observed there are two kinds of managers: The Taskmaster and The Gardener.

## Antipattern: The Taskmaster

Given the nature of for-profit business and the lack of real attention given to developing individuals to excel at the manager job, unfortunately it appears The Taskmaster is the dominant management style in the industry. The Taskmaster is likely driven by a single metric: output. They see their team as "resources" who complete tasks. The more tasks completed, the better. The Taskmaster micromanages who is doing what, and has neat little compartments for what each person in their team is allowed to do. Creative or motivated people typically get frustrated working for a Taskmaster, and will likely flee after they've built up enough frustration for their lack of growth. Yes, there are individuals who thrive working for a Taskmaster. These tend to be the "just a job" types, who don't necessarily think about their own growth or development, or they are content with building their skills on their own time, then change jobs to achieve that growth.


## Better: The Gardener

This is a term I made up to embrace the idea that the role of the manager is to care for their team by identifying their specific strengths, feeding their needs, and giving them space to grow, just as a gardener does with plants in a garden. The Gardener knows that their ultimate measure of success is the thriving nature of the garden and thus applies their knowledge and skill to best position and feed the plants in the garden. The Gardener anticipates and responds to the needs of their plants, but knows first and foremost that the plants are the real reason why there is a Gardener in the first place.

A manager of a software development team is there to serve their team through their own expertise. The manager does not have to be the best developer, but should know enough about the profession to serve as a helpful guide. An effective manager learns who is in their team, appreciates the nuance of each individual, and knows when and how to encourage individuals to take on new challenges (which may mean letting them go from the team).

Motivated people will thrive in this environment. The manager is there to make space for that growth or to suggest ideas for growth, but in the end, each individual is ultimately in charge of their own growth.

# Written Advancement Path

Every job has a title. As a person's skills become more impressive, usually they get more impressive titles. At some point in their growth, companies will typically formalize these titles and perhaps map them to grade levels. What I have not seen, until my current job, is an actual written description of what is expected of an employee at a given level.

The job of the software developer is a multifaceted one. Of course, technical skills are of utmost importance, but so is communication skills, reliability, sphere of influence, or a host of other dimensions of a developer in a team. All too often, managers of developers focus only on technical skill, and that's how we end up with the "brilliant asshole" team member persona that is poison to a good team.

As a manager, it's imperative to create a document for your team that describes important dimensions of a team member at the various levels of seniority. First and foremost, it gives everyone clear, written criteria the expectations of the behavior of people in the team.

Secondly, it gives the individuals in your team a framework to assess their own growth path, and a clear set of criteria for promotion. This removes the mystery around "how do I get promoted?" or resolves it to clear, valid criteria beyond the useless and dogmatic metric of "years of experience".

Feel free to copy this example document and make it work for you and your organization:

[Level Expectations Matrix](https://docs.google.com/spreadsheets/d/1woRpzFIPS1rY8GJdBCHcymqwqC7TRVbKqgM-XH5DfC4/edit#gid=0)
<iframe style="width:100%; height: 40em;" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR8T9y8Zt4XRUqqP4OWZyNRaiDV5tj3d-p1Tg4K-ahhlkrR9rOr2f0iqhwjL_TW7ph8ud-Rn1Xp70Ut/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

# Quantified Technical Skill

The individuals in a team are never perfectly interchangeable. We should aspire to eliminate single points of failure in our organizations through cross-training, but first we need to know who we are working with. When hiring, usually we have a gut feeling of what the skillset is that we need to hire for, but usually this is a non-scientific exercise.

When thinking about their own development, team members should have something to help them decide on a path of technical advancement that is relevant to the team's needs. I developed a tool to help with all of this. This tool is similar to the matrix in the previous section, but zoomed in on your team's technical stack.

The rows in this sheet are the specific technologies or technical concepts that your team needs to have expertise in. The skills are arranged in a logical order, forming a progression of neighboring skills whenever possible. Each skill has three levels of competency described. The idea is that your team members rate themselves on this matrix, then you as the manager rate them. The differences are seeds for a healthy discussion :), landing on an agreed-upon rating. The skill levels are given numeric values: 0 = no experience, 1 = beginner, 2 = intermediate, 3 = expert. Each team member has a column in this sheet where the number ratings are entered.

This gives you a numeric space to develop important insights or make some very important decisions. The sum of values in a row gives you a score of how capable your team is in that area. This can inform hiring decisions, as you now have a quantifiable basis for looking for specific skills. The variance of a particular team member's values indicates the breadth of their skill. You will see that your generalists have a low variance, and the specialists have a high variance. One tactic for identifying growth areas is to select areas adjacent to a skill that an employee has high competency in to focus on developing.

This information can be visualized in graphical form, which gives a picture of your team's competencies, and may even be plotted over time to show growth. The spreadsheet below is one example of such a document, and if you click through to it, you can see an interactive graph showing a visual representation of individual and team competency.

[Quantified Tech Stack](https://docs.google.com/spreadsheets/d/1MIwdApDMeo-_6Y8WeQ1GqKj0y1zE5XQAgnmzfQaGpYs/edit#gid=1018258632)
<iframe style="width:100%; height: 40em;" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRrlC42DJQajuY4lbAaEOYmlhvMLM-FtUuMfHDOA9MNSeliWu-vnpX5p5A2tZaPsSow7eFJHLsM0_SG/pubhtml?gid=1018258632&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

# Trophy Case

Each person in my team has a Trophy Case document. This is simply a timestamped list of accomplishments, prefaced with a reminder of current development areas. It is my experience that busy people will forget a lot of important work that they do, and the Trophy Case is a simple tool to help us remember things. The individual's Trophy Case doc is linked from the recurring 1:1 meeting invite, so it's easy to pull up and review. It's also helpful for resume-building, but we try not to highlight that too much with people we want to keep :).

[Example Trophy Case Document](https://docs.google.com/document/d/1MqgFMxU24WjvofwvQ4QVS5qh8AREln7Ck0A1qVGt9_I/edit#)


# Fractal Planning

Our jobs exist within several simultaneous time scales, and conversations appropriate to a given time scale should happen on various intervals and with various populations.


## Weekly or Biweekly


### Individual

Discuss "how are you?" types of questions. The point of the high-frequency individual discussion is to understand any challenges this person is facing right now, ideas they have, and bidirectional feedback on trajectory. Note that "next week's tasks" is not in this list -- that is not something that should be discussed in 1:1 time. Open up the Trophy Case and see if there's something that should be added or adjusted.


### Team

Feedback for what is going well, what needs course correction, ideas the team has, important teaching or learning opportunities (i.e. demos), tactical alignment on in-flight projects, context on upcoming projects.


## Quarterly


### Individual

Reflect on accomplishments of the past quarter. This is a nice time to review the last few months of Trophy Case entries. The quarterly discussion is also the right time to set aspirational, tactical development goals for the upcoming quarter and write them down.


### Team

Similar to the individual, but at the team level. Accomplishments, goals, and progress on last quarter's goals. Write it all down. Publicly acknowledge individuals who made a big impact, grew their skills, or stretched farther than they thought they could.


## Annual


### Individual

A deeper reflection on aspirations, career goals, and personal development - in terms of hard and soft skills. Writing all of this down serves to organize everyone's thoughts, and create a plan that is more likely to be acted upon.


### Team

Review big accomplishments, call out your superstars, have a more strategic discussion around process and technology. What big directions does the team want to go this year? Get the big ideas out and start to break them down and lay out a quarterly roadmap.

# Conclusion
These are some of the tools I use to find joy and success in my current role. Please share your tools that help you find management nirvana in the comments below.
