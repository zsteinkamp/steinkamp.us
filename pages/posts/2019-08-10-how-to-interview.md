---
layout: post
title: How To Interview
date: '2019-08-10 21:09:30'
excerpt: |
  Interviewing is hard, on both sides. The skills of an interviewer are often overlooked in
  software development, and people are usually left on their own when it comes time to
  interview a potential teammate or coworker. This does everyone a disservice.
  This document outlines a framework and a set of principles to be used when interviewing,
  hopefully to bring calm, structure, and excellence to the hiring process.'
---
Interviewing is hard, on both sides. The skills of an interviewer are often overlooked in software development, and people are usually left on their own when it comes time to interview a potential teammate or coworker. This does everyone a disservice.

This document outlines a framework and a set of principles to be used when interviewing, hopefully to bring calm, structure, and excellence to the hiring process.

Why am I qualified to write this? I have been interviewing software developers
since 1999 in big companies, startups, and growing companies. I was at a
company that grew from 25 developers to 1,600 in the span of four years. In
that job, I interviewed at least three people per week, sometimes as many as
ten in one day. I had a lot of opportunities to observe my own failures and
develop a framework for interviewing.

## Invariant Principles
As an interviewer, you must be on board with the following ideals in order for this framework to make sense:
1. You are an ambassador of your company. You represent your company to the interviewee public, even to those that have no chance of getting hired. They have friends that you may want to hire. Build bridges in all cases.
2. You too have been an interviewee. Be compassionate and caring with these people who want to work with you. Give them what you would want if you were in their shoes.
3. Your team members make your job. Hiring is one of the most important decision areas in your career. Treat it with care and respect. Be picky -- "maybe" means "no hire".

## Understand the Position
Talk with the hiring manager about what they feel are important attributes for this position. Is it a manager or IC role? What is the composition of the existing team? What important technologies should they know? What are some important areas the hiring manager wants you to focus on?

If you are the hiring manager, understand what each interviewer brings to the table. Be very clear with them what you would like them to focus on. Use your interviewing team to get the best, most accurate and broad assessment of each candidate.

## Make a Plan
Most software developers I know are nervous going into interviews. They see the 45 minutes with the candidate as an improvisational performance, and most (introvert) programmers wilt in such circumstances.

The way to mitigate this nervousness is to draw up an agenda for the interview. To do that, first sync up with the hiring manager to understand if there are any specific focus areas they want you to cover. This is a good time to have a chat about the nature of the position they are trying to fill, and what the required skills or personality traits are for the position. This will give you guidance about other areas to probe with the candidate.

From there, write down your agenda and bring it with you to the interview, using wall clock time so you don't have to do math on the fly in the interview. In the interview, have a way to easily keep an eye on time. Use your phone's clock as a last resort, and if you do, explain to the interviewee that you are just using your phone to keep track of time.

Here is a typical agenda I will follow for a 45 minute non-coding interview:
* :00 - :05 introduction
* :05 - :10 discuss the candidate's motivation for being here ("Why this company?")
* :10 - :20 soft skills discussion ("describe a situation where you..." type questions)
* :20 - :35 technical skills discussion
* :35 - :45 candidate's questions

Here is a similar agenda for a technical / coding interview:
* :00 - :05 introduction
* :05 - :10 discuss the candidate's motivation for being here ("Why this company?")
* :10 - :35 technical / coding time (collaborative if coding)
* :35 - :45 candidate's questions

If the hiring manager has assigned a focus area or question(s) for you to ask, the agenda may look like this:
* :00 - :05 introduction
* :05 - :15 hiring manager question 1
* :15 - :25 hiring manager question 2
* :25 - :35 hiring manager question 3
* :35 - :45 candidate's questions

These are all starting points. Of course, adjust as you see fit. The important thing is to make your plan and *write it down*.

## Starting the Interview
### Physical Interviews
If the candidate is already with another interviewer, knock on the door or tap on the window at the time your interview should begin. Typically the current interviewer would need a minute or so to wrap up their conversation. Wait patiently outside for them to finish. When it's time, greet the interviewee. Offer them some water, tea, coffee, or some other drink. Ask them if they need to use the restroom. We want our interviewees to know that we respect them as fellow human beings. Locate a clock in the room (use your phone as a last resort) so you can stick to your plan.

### Virtual (Video) Interviews
Be prompt; arrive exactly on time. Ensure everything is working properly (audio and video). Disable notifications on your computer so you are not distracted by Slack or Email. Explain to the interviewee that you may be taking notes, so any typing they hear is that. Also explain that you are keeping an eye on time.

## Introduction
Tell the candidate who you are, what your role/job is, how long you've worked here, and what your relationship is to the job they are interviewing for and to their other interviewers. Give a very brief (1 minute) overview of your past jobs, experience, and focus areas. Help them get to know you and be comfortable with you. You have read their resume, so they don't need to take time to review their job history with you.

Share your agenda with them, and ask them if there is anything they would like to add.

## Discussion
A candidates who is comfortable and at ease will give you the most accurate picture of themselves. This is easiest when you, the interviewer, are at ease. Be comfortable and conversational. Nervous candidates will usually ramble on and take tangents. With overly chatty candidates, help shepherd them back on topic so you can stick to your plan. If they ramble too much, you may not be able to gather the information you need to make a clear hire / no-hire decision.

Rather than abruptly stopping a meandering candidate and redirecting back to your topic, acknowledge what they have said and gently bring them back to the topic. Hopefully you don't have to do this more than a couple times. Otherwise, that's a red flag.

## Soft Questions
The hiring manager may have assigned some soft questions for you to ask. Ask them as written, and take notes with the candidate's answer. Pen and paper works well, but if you must use your laptop, let the candidate know you are taking notes and not reading email. (NOTE: Do not read email. :) Keep the candidate on track -- with open-ended questions a nervous candidate may wander off topic. Stick to your plan and stick to your schedule.

## Technical Questions
A good technical question allows the candidate to demonstrate understanding, not just knowledge. For example, rather than asking the candidate to list the states of a TCP connection, ask them to explain why TCP connections have different states. Drill into candidate answers with more "why?" questions rather than "what?" questions.

## System Design Questions
Ask the candidate to use the whiteboard to describe either a distributed system they have worked on (mid-level), or give them an application to design (senior-level). In both cases, they should be able to give a concrete implementation rather than just a logical diagram.

## Coding Problems
A good coding question doesn't have a magic answer. It is a simple problem that allows the candidate to demonstrate they know how to be a programmer. It will have many many possible solutions. The interviewer will be well versed in the problem and several of its solutions, and will ask the candidate about compromises or tradeoffs in a solution. Some examples are in the Appendix at the bottom of this document.

No programmer in their job codes on a whiteboard with a critical audience scrutinizing their every move. Therefore, if you are doing a coding question, either have a laptop handy for the candidate to work on or have them do the coding problem on their own time.

If you are doing coding as part of the in-person interview, ideally the laptop would have several different popular text editors installed. Choose a problem or task to work together on, and you will not only learn how the candidate solves problems, but you will get a chance to see how they are to actually work with.

If the candidate is remote, then use a site like [collabedit.com](https://collabedit.com/) to open a shared workspace that both of you can see and type in.

My personal preference is to have the candidate take 20-30 minutes on their own time to do an assignment. If my initial phone screen seems promising, I will introduce the coding question as part of the phone screen and discuss it with the candidate. This gives you an idea of how well the candidate listens and processes things. The candidate is then free to complete the assignment with the guidance that it should take no more than 20-30 minutes. Yes they can cheat, but I have not encountered a cheater yet. There would be other signals a cheater would give. (See "Bullshitters" below)

## Candidate's Questions
The questions a candidate asks can tell so much about what they value in a job. If they are only asking about technical stack but they are interviewing for a lead or manager role, that is a big red flag. Give the candidate a comfortable space where they can ask any question to you about anything related to the job or company, and give them an honest answer.

## Bullshitters
Do not hire bullshitters. A bullshitter is someone who pretends to know something but actually doesn't. At the first sign of bullshit, reassure the candidate that it's OK to say "I don't know". Everyone has limits of knowledge. If they continue to exhibit bullshitter behavior, well that is their problem now because they won't be working with you.

## Judging the Candidate
A good candidate is someone who will improve the team they are hired into. Hopefully your company values creativity, teamwork, inclusion, motivation, and skill. Anyone you hire should reflect those values, and be able to demonstrate how they have brought these traits to their jobs.

## Behavioral Red Flags
Certain behaviors in the candidate should be considered red flags. Here are a few in addition to what has been mentioned:
* Dismissive behavior. A good candidate shows respect for their future colleagues.
* Sexist / Chauvinistic behavior. Ensure you have at least one member of another gender in your interview panel. It happens too often that an interviewee treats women on the panel with less respect or regard than the men. This is a big and important red flag and should have no place in your organization.
* Not being a good listener. Good communication starts with good listening.
* Not asking questions. Curiosity goes a long way.
* Inappropriate language. We want to build a professional, respectful, inclusive environment.
* Not prepared. This should serve as an indicator of future job performance.
* Complains about or criticize previous managers or coworkers. People who focus on the negatives tend to create a toxic work environment wherever they go.

## Written Feedback
Immediately after the interview, write down your assessment of the interview. If you struggle to do this in a timely fashion, block 15 minutes on your calendar immediately following your interview to get it done.

In your written feedback, indicate your clear "hire" or "no hire" recommendation. "Maybe" means "no-hire", though there may be times when your hire recommendation may be contingent on other information other interviewers gather. Do your best to choose, though.

When writing feedback clearly indicate:
* You have an understanding of the role that you are interviewing the candidate for.
* You have clearly assessed the candidate against appropriate criteria (job description & competency area).
* Your rating supports your hiring recommendation.
* What questions you asked the candidate and how they answered.
* The candidate's strengths and weaknesses - do any of the weaknesses prevent us from moving forward with an offer? If not, please describe why.

## Debriefs
Hiring is a critical activity in business. Any critical business activity deserves careful deliberation and open communication. Interview debriefs are the opportunity to discuss the candidate's fit for the position and team. More often than not, important anecdotes or observations from the interviews come out in the debrief meeting that were not in the written feedback. Attendance at debriefs is mandatory for all interviewers. It is where the go / no-go decision is made.

Open the debrief with a quick thumbs up/down vote, where everyone shows their thumb orientation simultaneously. This keeps people from "going with the crowd" or "going with the VP". Take a count, then go around the room to discuss.

"Maybe" means "No-hire". We only want to hire people we are excited about.

## Appendix

### Some Good Soft Questions
* **Why this company?** This is a good and informative icebreaker. It will show if the candidate has done any homework to learn about your company, or to assess their enthusiasm for the role.
* **How will you decide what your next job is?**
  This question tells you about the candidate's priorities. Perhaps they are looking to shorten a commute, learn new technologies, work with an awesome team, or they are just ready for a change. Their answers to this question will help drive the conversation.
* **What do you want to know about this place?**
  This gives you a different insight into the candidate's priorities. A candidate who only asks technical questions may not have the same regard for a great team as you do.
* **What do you look for in a team?**
* [manager candidates] **Why are you a manager? What is the manager's job?**

### Some Good Coding Questions
* Write a program to output a random line from a small text file. Evolve the problem to ever larger files. Focus on efficiency and clarity.
* Write a program to implement the Look and Say algorithm.
* Fizz Buzz
* Output the repeated characters in a given string, e.g. "foobarbaz" => "oba"
* Output the common characters between two strings, e.g. ["foobar", "baz"] => "ba"

### Some Good Technical Questions
* How does the web work?
* What does "logged in" actually mean in a web application? How is it implemented?
* How is Javascript's inheritance model different than Java's?
* What would you change in Javascript if given that power?
* How has Docker changed how code is written and/or deployed?
* What's your favorite editor? Why?
* Use the whiteboard to explain the architecture of a system you built or worked with.
