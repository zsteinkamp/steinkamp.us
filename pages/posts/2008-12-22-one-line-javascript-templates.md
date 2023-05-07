---
layout: post
title: One-Line Javascript Templates
date: "2008-12-22 15:19:16"
categories: post post
entry:
  id: 262
  source: post
  uid: 127
  data:
    title: One-Line Javascript Templates
    excerpt: ""
  created_at: "2010-08-30 05:16:38"
  updated_at: "2010-08-30 05:16:38"
  pub_date: "2008-12-22 15:19:16"
  disabled: 0
---

I came up with this today. Maybe it's not original, but I think it's pretty cool.

The overall concept is that there is a DOM node that holds an output template. A template is defined as some HTML that contains some strings to be replaced. In this case, the "to be replaced" strings look like @this@.

The template processing function takes a key:value map and a handle to the template element as arguments. The keys in the map are matched with the string between the @at-signs@. The whole @mess@ is replaced with the value from the map. The processing function returns a string representing the replaced innerHTML of the template element.

In this example, I'm using jQuery constructs, though the compactness of this solution is not reliant on the lovely terseness of jQuery.

Here is an example template:

<pre>&lt;div class="template" id="field_tpl"&gt;
 &lt;div class="field_container"&gt;
    &lt;div class="field_name"&gt;@id@&lt;/div&gt;
    &lt;div class="field"&gt;
      &lt;input class="@classname@" id="@id@" value="@val@"/&gt;
    &lt;/div&gt;
    &lt;div class="field_help"&gt;@desc@&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>

Be sure you define a CSS rule to hide the display of the templates!

<pre>&lt;style&gt;
  .template { display:none; }
&lt;/style&gt;</pre>

Here is the magical one-line Javascript template processor:

<pre>function processTemplate(map, tpl_elem)
{
  return tpl_elem.html().replace(/@([^@]+)@/g, function(m,s1) {
      return (typeof(map[s1]) != 'undefined' ? map[s1] : '');
    });
}</pre>

Feed the template processor a key:val substitution map and a handle to the template element, and get back a string:

<pre>var map = {
  id:'my_id',
  classname:'required',
  desc:'My Description.'
};
alert( processTemplate( map, $('#field_tpl') ) );</pre>

The real strength of this solution lies in problems where the same template will be used a bunch of times on a page. No HTML repitition is necessary and data is separated from presentataion, so it makes experimenting with different layouts or constructs easier.

<a href="/static/template.html">Here is a full working example</a>of all the pieces stitched together.
