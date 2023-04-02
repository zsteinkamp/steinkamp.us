---
layout: post
title: On Availability
date: '2020-11-21 12:00:00'
categories: post
entry:
  source: post
  data:
    thumb_url: ''
---
If someone involved in Internet services is asked to name a metric in that domain, chances are you will hear the word "availability". On its surface, availability is a simple measurement to understand or describe -- it's just a measurement of the proportion of time a service is up and running within a given time period. Right? The reality, like with most top-line measurements, is far more nuanced, and without detailed context, the metric actually says nothing.

This document seeks to explore the topic of availability, with the goal of transforming it from a useless vanity metric to one that is useful and actionable.


## Exercises

For each of the following situations, determine the service availability metric value:

*   Your service was completely inaccessible yesterday due to a DDOS attack against your cloud infrastructure provider's load balancing infrastructure. Your service is running perfectly within the cloud infrastructure.
*   One of 100 API endpoints exhibited a slowdown yesterday, whereby the median response time increased from 100ms to 500ms, and the 99th percentile response time increased from 1 second to 30 seconds.
*   Due to a DNS provider configuration error, clients who need to look up your service's IP address are not able to. Clients who have the address cached (i.e. looked up the address prior to the misconfiguration, and the client is within the TTL period) can access your service normally.
*   Your service is completely inaccessible for one hour each day, due to how a scheduled reconciliation job has been designed.
*   Due to an operational error, your database was left in read-only mode after a maintenance period for one hour longer than expected. Your users could view their content, but could not add or change anything.

Hopefully each point above (all of which come from personal experience) made you go "hmmmm" and seek more information **before** coming up with an answer for an availability value. The point of the above scenarios is to highlight the need to provide a comprehensive definition of availability when reporting an availability value.


## The Keys to Defining Availability

A definition of availability must include **perspective**, **scope**, and **expectations**.


### Perspective

In the first exercise above (an effective DDOS attack against load balancing infrastructure) is a good example of this. From the end-user perspective, the service is down completely (0% availability). From the service development team's perspective, their system is working perfectly (100% availability). Both values are perfectly valid and both have value. So what is the actual availability? The answer, of course, is "it depends", and what it depends on is perspective.

**Availability Definition Requirement #1 - Any reported availability value must be accompanied by the perspective from which it is observed.**

From the end-user perspective, 0% availability is correct. For the team responsible for the service the end-user is trying to access, there may be no action they can take aside from escalating the problem to others in the organization who have the capability to fix it, so 100% availability is correct, in terms of the components they have control over. Having access to both availability values would help the responsible team zero in on what needs to be fixed.


### Scope

The vast majority of services that we report an availability measurement for are complex. Not just in terms of what it takes to understand their implementation, but in the scope or range of functionality they offer. For instance, the YouTube service includes browsing, searching, watching, uploading, commenting, liking, and flagging videos, among probably 100s of other functions. Some of these functions are core to the YouTube service (e.g. watching videos), and some are not necessarily core to the experience (e.g. content creators selecting an alternate thumbnail image to use for a given video).

If we are talking about the availability of a service from a macro view, the essential feature set needs to be identified, or the overall availability calculated from either an enumerated set of core functions, or aggregating individual function availability by using a weighted average or arbitrary weighting.

**Availability Definition Requirement #2 - The definition of availability needs to be clear about the scope of the measurement.**


### Expectations

Given a chosen Perspective, the next step is to define the expectations around that perspective and scope. Most availability definitions will include some notion of what an acceptable response time is, as well other possible metrics or definition of "correctness", as well as expected unavailability, or inconsequential unavailability.


#### Response Time

In the second example in the list above that presents median and 99th percentile response times, I hope your "hmmm" moment centered around the question "what is an acceptable response time in this case?"

In the case of a high-volume automated stock trading system, response times in the single-digit milliseconds are often a hard requirement. Contrast this with a video transcoding service, that may take minutes to process a request. The users or clients in these cases have wildly different expectations around response time. For the stock trading system, if a request takes one second to process, it may as well not exist, and thus would be considered "down".

In the case of web applications that end-users interact with, an "acceptable" response time is not so clear cut, and will be specific to the task at hand, the user's expectations, and the design of the system (i.e. a request that prevents further user-interaction may have a more strict time threshold than one that can be done in the background while the user continues to use the app). If the user gets frustrated and abandons their task, then from their perspective your service is down.


#### Correctness / Completeness

While receiving a timely response is critical to happy customers, sending a correct response is another critical part of that.

 \
Take the case of a federated search service -- whereby a single search interface can search multiple sources and aggregate the results. If half of the sources are offline, have the expectations of your users been met? Is the overall search service available? The answer is up to you and your team.


#### Expected or Inconsequential Downtime

It's usually not the case with online applications or a global workforce, but there are some situations where downtime is expected or inconsequential. We should strive to architect systems that do not require "scheduled maintenance" (PUKE!) but if your users expect unavailability or if there are times where they are not able to detect it (e.g. a power outage affecting the point-of-sale system in a retail store that has normal daytime operating hours), be sure to include that in your definition.


### Overall

I hope it's clear that there is a lot of detail, art, and educated guesses when it comes to defining measurement thresholds and end-user expectations as they relate to your availability calculation. These definitions are essential to providing useful context to the availability measurement.

**Availability Definition Requirement #3 - Expectations around response time, correctness / completeness, and expected or inconsequential periods should be a component of an effective availability definition.**


## Conclusion

I hope that at this point it's clear that Availability is not just a simple measurement. It **is** valuable, but **only** when accompanied by a very clear definition around **perspective**, **scope**, and **expectations**. Additionally, availability becomes a very actionable metric when it is measured from **many** perspectives, scopes, and expectations, since it can help identify root causes to problems. When measured over time, comparisons can be made to help predict problems or identify where investment needs to be made in building a more reliable or scalable system.


---

> ### Bonus Content: Aggregating Measurements

> When faced with aggregating or summarizing a batch of raw data, most people who do not live and breathe metrics will normally start with talking about averaging. Average is easy to describe and implement, but it is not very useful in this context. This is due to the power of outliers on average.

> For example, imagine your system receives 1000 client requests. 999 of these requests are responded to in ~0.005 seconds. One request out of a thousand tickles a bug in your system and takes 10 seconds to complete. So what is the "normal" response time? Average gives us 0.015 seconds -- three times the most common value. If talking about "normal", the better aggregation to use is median, which is the middle value of the set of values, if the set is in sorted order  (0.005 in this case).

> Most aggregations in a metrics context benefit from being presented in terms of some percentile value, and the goal of development teams should be to drive toward using higher and higher percentile values in their reporting. If the same threshold value can be applied to higher and higher percentile values, then that means that there is less variance in the data set, which is a strong attribute of a good performing system. Consistent high performance is what we strive to achieve.

---
