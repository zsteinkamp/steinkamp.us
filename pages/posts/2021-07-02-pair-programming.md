---
layout: post
title: On Pair Programming
date: '2021-07-02 12:00:00'
tags:
  - Nerd
  - Software
  - Work
---

When most people hear the phrase "pair programming" they probably imagine two programmers in front of one keyboard and monitor, taking turns typing alternate letters. It's a silly picture that doesn't do the idea justice. This document is intended to better explain the benefits of Pair Programming and different styles of practicing it.

## Benefits

Before we get into the ways that pair programming can be done, let's first explore the role of collaboration in software development. Programmers do what they do because they love the art of writing software to solve problems. The word "art" is intentional there, since there are any number of ways a given problem may be solved in software. Each solution has its own benefits and compromises made, and thus every possible solution is significantly, measurably different.

Each team has their own set of values, and weights given to these values. Perhaps your team values simplicity, fast time-to-market, scalability, performance, security, or a hundred other dimensions of software. Each individual in your team also has their own set of values, which may or may not align with the overall team values, and certainly changes over time, even on a micro-scale (ever rushed a merge request out at the end of the day because it was time for dinner?).

We use tools like code reviews (merge requests) and automated testing to ensure the code that we ship aligns with our team values. These are indispensable tools in our toolkit, but they have one important shortcoming -- they are employed **after** code is written; **after** a developer has chosen an overall solution philosophy and spent hours to days working within that philosophy to solve a given problem.

This is the shortcoming that Pair Programming seeks to address. When you have more than one programmer actively involved in iterating on a solution, then their product is more consistent with the overall team values, and less susceptible to an individual's macro- or micro-influences. Studies show that collaboration leads to [fewer defects](https://collaboration.csc.ncsu.edu/laurie/Papers/XPSardinia.PDF), and [improved team satisfaction](http://sunnyday.mit.edu/16.355/williams.pdf).

The result is a higher quality product (where "quality" is the assessment of the work against the team's overall value system) with fewer do-overs or "oh well just ship it like this" moments.

## Downsides

As with most investments, the tradeoff of pair programming is one of short term versus long term team capacity. Research has shown that pairing does improve overall team capacity in the long run, as a result of fewer defects, rewrites, and a better transfer of knowledge. However, it should be known that a task may take longer to complete in a pair context, and there are fewer team members available to take on new work in parallel tracks. The team's immediate situation may warrant a more individual approach to tasks, and thus should be considered when looking at a pairing strategy.

## Practices

There are as many ways to practice pair programming as there are programmers. Here are some of the best known modes of implementation, with a short description of each.

### Two Assignees

A good general practice for software teams is to delegate a medium to large story to two people in the team. This pair becomes a micro-team on their own, deciding on the overall solution approach, how to divide the story into subtasks between them, and regular (at least daily) check ins and reviews. The pair is available to one another to discuss problems or ideas at a moment's notice. For any work that can be divided between people or that involves designing a solution that will be long-lived or far-reaching, this approach should be considered.

### Traditional Pairing

Probably the canonical example of Pair Programming, and easily applied to short sessions. Having two people in front of a single piece of code can be very useful for untangling messy code, understanding over-complicated or opaquely written SQL or Regular Expressions, or really focusing on a mission-critical method to analyze it in great detail for corner cases, performance, or simplification. It is possible that pairs can evolve to be efficient on a larger time scale, but this takes either a good combination with natural chemistry, or an understanding that good collaboration improves over time.

### Rubber Duck

Perhaps the most lightweight Pair Programming concept, the name "Rubber Duck" comes from the fact that one of the people involved may as well be a rubber duck sitting on the desk. The idea here is that when faced with a challenge, simply by the act of explaining the problem to another person, the programmer hitting the roadblock will gain more clarity on the problem at hand. In practice, it is usually questions that the other person asks that leads to that clarity, but it's not uncommon for an "aha!" moment to come halfway through the explanation, with no words uttered by the rubber duck.

## Diversity in Pairing

It is to your team's advantage for the pair to represent a diversity of skill sets and skill levels. This diversity leads to maximum learning and knowledge exchange, compared with pairing two very similarly skilled individuals. Pairing a senior developer (P4) with a lower-level employee (P2 / P3) will pay dividends in learning and growth, on both sides. In addition, pairing an FTE with a contractor is another great way to spread knowledge and skill in your team.

There may be cases where having two experts working together on a problem is the right course of action. As always, common sense and good judgement should win out over general recommendations.

## Conclusion

Pair Programming comes in many forms, rooted in collaboration. It will help you to build a happier team that delivers a better product in an overall shorter amount of time. The work your team ships will be more in line with your team's value structure.
