---
layout: post
title: Alternative Single Table Inheritance for Rails
date: '2011-04-04 16:57:48'
tags:
  - Nerd
  - Software
excerpt: |
  Nearly as simple to implement as Rails built-in single table inheritance
  pattern, but infinitely flexible.
---

A case came up in doing a revamp on this site's software where I wanted to use one table to store metadata for "entries" (blog posts, flickr photo sets, tweets, etc) but wanted a more specialized class to be constructed when reading or writing records to this table to correspond with the particular source type.

Rails provides a simple single-table inheritance capability by using a column called "type". When a record is read in, the value of the type column is used to instantiate an object of that type. Very simple, and it works in a lot of cases.

If you need more complex logic to determine which class to instantiate or if you don't want to have your database value mirror your class name, then the solution is still fairly simple.

In this case, I had a class called "Entry":

```
class Entry < ActiveRecord::Base
...
end
```

I wanted to derive a number of classes from Entry to represent specific types of entries...

```
class EntryTwitter < Entry
...
end

class EntryFlickr < Entry
...
end
```

Step One: Define a method in your base class that uses the method "becomes()"...

```
class Entry < ActiveRecord::Base
...
def specialized*class
<span style="color:green;"># e.g. if self.source == "twitter" then this will return a # class of type EntryTwitter with the same attributes # set as the original Entry object</span>
entry_class = "entry*#{self.source}".camelize.constantize
self.becomes(entry_class)
end
end

```

You can test this by going into script/console and calling the #specialized_class method on your ActiveRecord object...

```
  >script/console
Loading development environment (Rails 2.2.2)
>> Entry.last
=> #<Entry id: 474, source: "twitter", ...>
>> Entry.last.specialized_class
=> #<EntryTwitter id: 474, source: "twitter", ...>
>>
```

Now the last thing to do is to have ActiveRecord always call this method when it instantiates a class from a database record. The Base#instantiate method is the perfect place for this...

```
class Entry < ActiveRecord::Base
...
def specialized*class
entry_class = "entry*#{self.source}".camelize.constantize
self.becomes(entry_class)
end

def self.instantiate(record)
super(record).specialized_class
end
end
```

Now when you load any object from your table, it will be magically instantiated as the specialized class...

```
  >script/console
Loading development environment (Rails 2.2.2)
>> Entry.last
=> #<EntryTwitter id: 474, source: "twitter", ...>
>>
```
