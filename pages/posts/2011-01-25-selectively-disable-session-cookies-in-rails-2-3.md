---
layout: post
title: Selectively Disable Session Cookies in Rails 2.3
date: "2011-01-25 02:43:44"
categories: post post
entry:
  id: 462
  source: post
  data:
    title: Selectively Disable Session Cookies in Rails 2.3
    excerpt: ""
  created_at: "2011-01-25 02:43:44"
  updated_at: "2011-01-25 02:43:44"
  pub_date: "2011-01-25 02:43:44"
  disabled: 0
---

In doing a project at work to more fully utilize our content delivery network (CDN) and nginx to cache static content, we ran up on a cookie problem in Rails.

We didn't want any cookies returned to requestors in the case where the content would be marked cachable since cookies may contain personal info or provide access to personal info. My first attempt was to write an around_filter that iterated across the headers hash and unset anything matching my criteria -- in this case, Set-Cookie or some special X- headers we use.

The problem was that the Rails session cookie was still getting set. I tried and tried a million different things that either were deprecated (e.g. session :off) or some other kind of hackery.

I took a more disciplined approach today to tracing where that cookie was set. The culprit is the call() method in actionpack/lib/action_controller/session/abstract_store.rb. In looking at the decision logic on whether to set a cookie, I had a few ideas of how to get around this.

<code>actionpack/lib/action_controller/session/abstract_store.rb:127

def call(env)
...
if !session_data.is_a?(AbstractStore::SessionHash) || session_data.send(:loaded?) || options[:expire_after]
...</code>

This led me down the path of resetting the session data to an AbstractStore::SessionHash. Just doing that wasn't enough. I had to also set a fake session_options value. I'm not sure why that is, but I'll figure it out soon.

Here is the final around_filter to hide any special headers and to suppress the Rails session cookie:

<code> def sanitize_response_headers_if_caching
yield # check for caching
if (headers["Cache-Control"].to_s.match(/max-age=\d+, public/))
headers.keys.each do |header_name|
if (header_name == "Set-Cookie" || header_name.match(/X-[^-]+-COOKIE/))
headers.delete(header_name)
end
end # nuke the session -- this call makes it so that the session cookie is not set
<b>request.session_options = { :session_key => 'foo' } # seemingly unnecessary, but absolutely necessary
request.session = ActionController::Session::AbstractStore::SessionHash.new({},{})</b>
end
true
end</code>

With this, we can turn on output caching in nginx to help offload work from our application servers in the case of a CDN cache miss. Those misses are more frequent than one would think, since each edge server in the CDN keeps its own cache.
