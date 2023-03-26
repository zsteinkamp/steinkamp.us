---
layout: post
title: Transparent Access to a Serialized Column in ActiveRecord
date: '2009-04-16 20:28:53'
categories: post post
entry:
  id: 270
  source: post
  uid: 187
  data:
    title: Transparent Access to a Serialized Column in ActiveRecord
    excerpt: ''
  created_at: '2010-08-30 05:16:38'
  updated_at: '2010-08-30 05:16:38'
  pub_date: '2009-04-16 20:28:53'
  disabled: 0
---
I started a job a few weeks ago where we're using Ruby on Rails.  I had never used it before, and am starting to learn why it has been able to grow as quickly as it has -- it's just damn cool in a lot of ways.

One technique we used a lot in my previous company was to allocate a column in a database to be a "catch-all" for various attributes, in the form of a serialized hash.  The advantage here is that if we want to add an attribute to a table, we would not need to alter the table unless we absolutely had to in order to facilitate SELECTs or ORDERing.  When we'd read a row from the table, we would de-serialize that column and make that hash available to whatever uses it.  

Ruby on Rails' ActiveRecord class handles this seamlessly.  Just tell your model to serialize the column like so:
<pre>class MyModelClass < ActiveRecord::Base
  <strong>serialize :data</strong>
end</code></pre>
<strong>data</strong> is the name of the column that holds the serialized data.

If you want to enforce the type of data that can be serialized/deserialized, add the type name:
<pre>class MyModelClass < ActiveRecord::Base
  serialize :data<strong>, MyDataClass</strong>
end</pre>

You can then call methods on the object represented in the <strong>data</strong> column by referencing it like this:
<pre>row = MyModelClass.find :first
row.data.foobar</pre>
assuming <strong>MyDataClass</strong> implements a method called <strong>foobar</strong>.

So far so good right?  Well, let's say MyDataClass implements a nice object-model of a hash, so calling MyDataClass#keyname will return the value referenced by the key.  You write a bunch of views referencing row.data.foobar or row.data.snafu, but at a later date you decide that you really want to dedicate a column in the database table to the value held by data.foobar.  So you have to visit all your views to be sure you make the change from row.data.foobar to row.foobar.  Crappy!

Wouldn't it be nice to just design it from the start so that you could call <strong>row.foobar</strong>?  That way, it's at the model's discretion whether a bit of data is stored in the serialized column or a "real" column.  Nice, right?

Well, it's pretty easy to do.  We'll define a Mix-In that we'll load into certain model classes.  This mix-in will override the <strong>method_missing</strong> and <strong>respond_to?</strong> methods of the class with our own design.  

Here is the content of <strong>lib/model_data_column.rb</strong>:
<pre>## 
# Model Data Column Mix-In
# Include this in your data model if you use 'data' as a serialized object.
# This will let you call "model.foo" rather than "model.data.foo"
# to facilitate moving data between the serialized 'data' column 
# and real DB columns.
module ModelDataColumn

  def method_missing(method_id, *args)
    self[:data].send(method_id, args) || super
  end

  def respond_to?(method_id, *args)
    self[:data].send(:respond_to?, method_id) || 
      self[:data].send(:has_key?, method_id.id2name) || 
      super
  end

end</pre>

<strong>Note:</strong> the class behind your serialized column (<strong>MyDataClass</strong> in this case) needs to implement the method <strong>has_key?</strong>.

Use it in your model like this:
<pre><strong>require 'model_data_column'</strong>

class MyModelClass < ActiveRecord::Base
  <strong>include ModelDataColumn</strong>
  serialize :data, MyDataClass 
end</pre>

So now you can call methods in your serialized object column without explicitly referencing the column!  This means the rest of your application does not need to concern itself with how the model has implemented the storage of the data.  It will just work.

There is a danger if the serialized column holds a value with the same key as the name of a database column.  The model will always return the value from the DB column in this case.  However, the benefits of this model are big enough for us where we will trade that for the need to keep tabs on the names of things we are storing.

So now this old code:
<pre>row = MyModelClass.find :first
row.data.foobar</pre>
And this new code:
<pre>row = MyModelClass.find :first
row.foobar</pre>
Will have the same output.  Huzzah!
