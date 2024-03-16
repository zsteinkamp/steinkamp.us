---
layout: post
title: VIM -- Frustrated With Perl Comments?
date: '2005-02-10 00:00:00'
tags:
  - Nerd
---

vimmers --

i've been writing LOTS of perl and CSS lately. one thing that has
been frustrating for, oh, the last FIVE years, has been how VIM
indents perl comments and CSS properties with 'cindent' enabled.

<ul>
<li>since they look like C preprocessor directives, perl comments
  are shoved back to column 1 (e.g. "# unintelligible regex").</li>
<li>CSS properties are given the same treatment, since they look
  like C labels (e.g. "margin-right:1em;").</li>
</ul>
i like everything about cindent, except for the two cases above.
for the work i'm doing now, i'd gladly give up C preprocessor and
label indenting for better Perl and CSS behavior.

anyhow, i just decided to solve this problem once and for all. of
course, VIM can do exactly what i want it to, it's just a matter
of figuring out the right stuff to put in .vimrc . so here it is:

<pre>
  set cindent
  set cinkeys=0{,0},!^F,o,O,e <font color=green>" default is: 0{,0},0),:,0#,!^F,o,O,e</font>
</pre>

that's it ... hopefully this can help out someone else who has
been frustrated by cindent's behavior too.
