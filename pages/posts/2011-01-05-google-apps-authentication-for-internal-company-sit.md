---
layout: post
title: Google Apps Authentication for Internal Company Sites
date: "2011-01-05 16:44:37"
categories: post post
entry:
  id: 452
  source: post
  data:
    title: Google Apps Authentication for Internal Company Sites
    excerpt: ""
  created_at: "2011-01-05 16:44:37"
  updated_at: "2011-01-05 17:05:02"
  pub_date: "2011-01-05 16:44:37"
  disabled: 0
---

Recently I was challenged by my company's CEO to make accessing internal sites
as easy as accessing our email.

He needed to get to an internal app from the road. He didn't have a computer
that was blessed with a VPN configuration, and he's not the type to be excited
about setting up SSH tunnels.

We use Google Apps for email, calendaring, document sharing, and documentation.
We can access any of these services from any computer in the world, as long as
we have our company domain login and password. Google seems to do a very good
job of protecting this extremely sensitive information.

When the CEO threw down the access gauntlet, at first I was obstinate. "But
this is _really_ sensitive information you're trying to access! It needs to be
encrypted. It needs to be logged. Access to an employee needs to be taken
away when the employee leaves the company."

OK deep breath ... then a revelation... Our email has all the necessary
protections. Google does one of the best jobs of dealing with security issues
around login (bot detection, account lockout, password recovery). The only
thing our tool was lacking was the encryption, but I know that I can use Apache
as a reverse proxy to add that.

Google supports several authentication mechanisms including OpenID and OAuth.
Normally I would shy away from OpenID as a solution due to its strange
identification scheme (your identity is a URL -- huh?), but as you will see
there are some clever workarounds if you are securing a single Google Apps
domain.

This whole thing is made super easy due to the hard work of everyone who
contributed to <a href="http://kin.klever.net/libopkele/">libopkele</a> and
<a href="http://findingscience.com/mod_auth_openid/">mod_auth_openid</a>.
Thank you!

<style>
  code {
    display: block;
    white-space: pre;
    background:#eee;
    border:1px solid #ccc;
    padding:10px;
    overflow-x: auto;
  }
  ul.steps li {
    margin-bottom:20px;
  }
</style>

<ul class="steps">
  <li>
    Step 1: Install apache, php, mod_ssl, and some other dependencies ... I use yum on CentOS to do this:
    <code>sudo yum -y install libtidy-devel curl-devel sqlite-devel pcre-devel httpd-devel mod_ssl php</code>
  </li>
  <li>
    Step 2: Build and install libopkele and mod_auth_openid
    <code>curl -O http://kin.klever.net/dist/libopkele-2.0.4.tar.gz
tar -xzvf libopkele-2.0.4.tar.gz 
cd libopkele-2.0.4
./configure --with-apr-config=/usr/bin/apr-1-config
make
sudo make install

curl -O http://butterfat.net/releases/mod_auth_openid/mod_auth_openid-0.6.tar.gz
tar -xzvf mod_auth_openid-0.6.tar.gz
cd mod_auth_openid-0.6
./configure --with-apr-config=/usr/bin/apr-1-config
make
sudo make install</code>

  <li>
    Step 3: Part of the OpenID flow are two hosted "discovery" files.
    mod_auth_openid expects to fetch these files from
    http://yourdomain.com/openid and http://yourdomain.com/xrds.  
    Either put these files on your site's main server or run a virtual host on
    this server to answer to yourdomain.com requests and use /etc/hosts to
    point yourdomain.com to 127.0.0.1 (since it is this server that is making
    the requests).

    http://<b>yourdomain.com</b>/openid
    <code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;xrds:XRDS xmlns:xrds="xri://$xrds" xmlns="xri://$xrd*($v*2.0)"&gt;
&lt;XRD&gt;
&lt;Service priority="0"&gt;
&lt;Type&gt;http://specs.openid.net/auth/2.0/signon&lt;/Type&gt;
&lt;URI&gt;https://www.google.com/a/<b>yourdomain.com</b>/o8/ud?be=o8&lt;/URI&gt;
&lt;/Service&gt;
&lt;/XRD&gt;
&lt;/xrds:XRDS&gt;</code>

    http://<b>yourdomain.com</b>/xrds
    <code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;xrds:XRDS xmlns:xrds="xri://$xrds" xmlns="xri://$xrd*($v*2.0)"&gt;
&lt;XRD&gt;
&lt;Service priority="0"&gt;
&lt;Type&gt;http://specs.openid.net/auth/2.0/server&lt;/Type&gt;
&lt;URI&gt;https://www.google.com/a/<b>yourdomain.com</b>/o8/ud?be=o8&lt;/URI&gt;
&lt;/Service&gt;
&lt;/XRD&gt;
&lt;/xrds:XRDS&gt;</code>

  </li>

  <li>
    Step 4: Create a file called "openid.php" and serve it from the document root of this Apache server.  There are a few examples out there, but here is what I put together to make a very seamless experience for my company's users:
    <code>&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Google Auto-Login Page&lt;/title&gt;
    &lt;style&gt;
      body { font-family: Helvetica,Arial,sans-serif; }
    &lt;/style&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Google Auth Bouncer&lt;/h1&gt;
    &lt;form id="openid_form" action="&lt;?php echo $_REQUEST['modauthopenid_referrer'];?&gt;" method="GET"&gt;
      &lt;input type="hidden" name="openid_identifier" value="http://<b>yourdomain.com</b>/xrds"/&gt;
      &lt;input type="hidden" name="openid.ns.ext1" value="http://openid.net/srv/ax/1.0" /&gt;
      &lt;input type="hidden" name="openid.ext1.mode" value="fetch_request" /&gt;
      &lt;input type="hidden" name="openid.ext1.type.email" value="http://axschema.org/contact/email" /&gt;
      &lt;input type="hidden" name="openid.ext1.required" value="email" /&gt;
    &lt;/form&gt;
    &lt;script&gt;
      function submit_form() {
	document.getElementById("openid_form").submit();
      }
    &lt;/script&gt;
    &lt;?php if ($_REQUEST['modauthopenid_error'] != "") { ?&gt;
      &lt;font style="color: red;"&gt;There was an error:&lt;/font&gt; &lt;b&gt;&lt;?php echo $_REQUEST['modauthopenid_error']; ?&gt;&lt;/b&gt;.  
      &lt;br /&gt;&lt;br /&gt;
      &lt;input type="button" value="Try Again..." onClick="submit_form();"&gt;
      &lt;br /&gt;&lt;br /&gt;
      Here are the error definitions:
        &lt;ul&gt;
          &lt;li&gt;&lt;strong&gt;no_idp_found&lt;/strong&gt;:  This is returned when the there was no identity provider URL found on the identity page given by the user, or if the page could not be downloaded.  The user probably just mistyped her identity URL.&lt;/li&gt;
          &lt;li&gt;&lt;strong&gt;invalid_id_url&lt;/strong&gt;: This is returned when the identity URL given is not syntactically valid.&lt;/li&gt;
          &lt;li&gt;&lt;strong&gt;idp_not_trusted&lt;/strong&gt;: This is returned when the identity provider of the user is not trusted.  This will only occur if you have at least one of &lt;strong&gt;AuthOpenIDTrusted&lt;/strong&gt; or &lt;strong&gt;AuthOpenIDDistrusted&lt;/strong&gt; set.&lt;/li&gt;
          &lt;li&gt;&lt;strong&gt;invalid_nonce&lt;/strong&gt;: This is a security error.  It generally means that someone is attempting a replay attack, though more innocuous reasons are possible (such as a user who doesn't have cookies enabled refreshing the page).&lt;/li&gt;
          &lt;li&gt;&lt;strong&gt;canceled&lt;/strong&gt;: This is returned if a user cancels the authentication process.&lt;/li&gt;
          &lt;li&gt;&lt;strong&gt;unspecified&lt;/strong&gt;: This error can occur for a number of reasons, such a bad signature of the query parameters returned from a user's identity provider.  Most likely, the user should simply be instructed to attempt again.&lt;/li&gt;
      &lt;/ul&gt;
    &lt;?php } else { ?&gt;
      Automatically sending you to Google...
      &lt;script&gt;
        submit_form();
      &lt;/script&gt;
    &lt;?php } ?&gt;
  &lt;/body&gt;
  &lt;/html&gt;</code>
  The page auto-submits the form when it is loaded, so there is actually nothing for the user to do!  The trick is to make openid_identifier a hardcoded hidden field that points at a file on your domain.

The form includes parameters to request the user's email address. Google will
pass it back in a query string param. A more sophisticated implementation
may make use of that address to pass along to the internal app you're
protecting.

  </li>
  <li>
    Step 5: Configure Apache to use OpenID auth for this host.  The following
    snippet is inside of a VirtualHost block on my server.  You can use it just
    like you would use Basic auth.
  <code>&lt;Location /&gt;
  AuthType OpenID
  Require valid-user
  AuthOpenIDLoginPage /openid.php
  AuthOpenIDTrusted   ^https://www.google.com/a/<b>yourdomain.com</b>/o8/ud$
  AuthOpenIDCookiePath /
  AuthOpenIdCookieLifetime 21600
&lt;/Location&gt;
&lt;Files openid.php&gt;
  Allow from all
  Satisfy any
&lt;/Files&gt;</code>
  </li>
  <li>
    Step 6: Restart Apache and make a request to the default virtual host.  You
    should briefly see the openid.php page informing you that it's going to
    send you to Google.  You'll be redirected to a Google Apps
    login/authorization page.  After logging in and granting access to your
    app, you'll be redirected back to the URL you had originally requested.
  </li>
</ul>
