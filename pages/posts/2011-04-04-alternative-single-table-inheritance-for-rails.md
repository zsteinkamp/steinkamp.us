---
layout: post
title: Alternative Single Table Inheritance for Rails
date: '2011-04-04 16:57:48'
categories: post post
entry:
  id: 502
  source: post
  data:
    title: Alternative Single Table Inheritance for Rails
    excerpt:
      Nearly as simple to implement as Rails built-in single table inheritance
      pattern, but infinitely flexible.
  created_at: '2011-04-04 16:57:48'
  updated_at: '2011-04-04 17:02:16'
  pub_date: '2011-04-04 16:57:48'
  disabled: 0
---

A case came up in doing a revamp on this site's software where I wanted to use one table to store metadata for "entries" (blog posts, flickr photo sets, tweets, etc) but wanted a more specialized class to be constructed when reading or writing records to this table to correspond with the particular source type.

Rails provides a simple single-table inheritance capability by using a column called "type". When a record is read in, the value of the type column is used to instantiate an object of that type. Very simple, and it works in a lot of cases.

If you need more complex logic to determine which class to instantiate or if you don't want to have your database value mirror your class name, then the solution is still fairly simple.

In this case, I had a class called "Entry":
<code>class Entry < ActiveRecord::Base
...
end</code>

I wanted to derive a number of classes from Entry to represent specific types of entries...
<code>class EntryTwitter &lt; Entry
...
end

class EntryFlickr &lt; Entry
...
end</code>

Step One: Define a method in your base class that uses the method "becomes()"...
<code>class Entry &lt; ActiveRecord::Base
...
<strong>def specialized*class
<span style="color:green;"># e.g. if self.source == "twitter" then this will return a # class of type EntryTwitter with the same attributes # set as the original Entry object</span>
entry_class = "entry*#{self.source}".camelize.constantize
self.becomes(entry_class)
end</strong>
end
</code>

You can test this by going into script/console and calling the #specialized_class method on your ActiveRecord object...
<code>&gt;script/console
Loading development environment (Rails 2.2.2)
&gt;&gt; Entry.last
=&gt; #&lt;<strong>Entry</strong> id: 474, source: "twitter", ...&gt;
&gt;&gt; Entry.last.<strong>specialized_class</strong>
=&gt; #&lt;<strong>EntryTwitter</strong> id: 474, source: "twitter", ...&gt;
&gt;&gt;</code>

Now the last thing to do is to have ActiveRecord always call this method when it instantiates a class from a database record. The Base#instantiate method is the perfect place for this...
<code>class Entry &lt; ActiveRecord::Base
...
def specialized*class
entry_class = "entry*#{self.source}".camelize.constantize
self.becomes(entry_class)
end

<strong>def self.instantiate(record)
super(record).specialized_class
end</strong>
end</code>

Now when you load any object from your table, it will be magically instantiated as the specialized class...
<code>&gt;script/console
Loading development environment (Rails 2.2.2)
&gt;&gt; Entry.last
=&gt; #&lt;<strong>EntryTwitter</strong> id: 474, source: "twitter", ...&gt;
&gt;&gt;</code>
