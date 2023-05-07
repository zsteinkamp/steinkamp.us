---
layout: post
title: OpenDNS on DD-WRT
date: '2008-01-06 14:00:00'
categories: post post
entry:
  id: 254
  source: post
  uid: 114
  data:
    title: OpenDNS on DD-WRT
    excerpt: ''
  created_at: '2010-08-30 05:16:38'
  updated_at: '2010-08-30 05:16:38'
  pub_date: '2008-01-06 14:00:00'
  disabled: 0
---

After checking out what <a href="http://opendns.com/">OpenDNS</a> provides, I was excited to give it a try on my network. I use a Linksys WRT-54GS with the excellent DD-WRT firmware. Since the original WRT-54 firmware was Linux based, Linksys had to release the source code to it, which spawned lots of variants offering better feature sets.

DD-WRT gives a lot of control over the router's behavior, and offers nice things like the ability to SSH to the router (it's running Linux, ya know!). Another nice addition is the use of Dnsmasq to act as a local DNS cache, among other things. Having a local DNS cache speeds up all internet activity, and can only be a good thing.

Anyhow, back to OpenDNS...

I followed the instructions on the OpenDNS help page for the Linksys WRT-54 router and entered their DNS servers into the boxes for "Static DNS" in the router configuration screen. This works great, but still leaves my ISP's DNS server in the resolv.conf as a backup. This is great for reliability, but in a lot of cases DNS requests would be answered by Comcast, which defeats the purpose of using OpenDNS. So I set out to find a different solution that only uses OpenDNS's servers.

One way to acomplish this is to set the DNS servers in each client's TCP/IP configuration. This works, but has two downsides. 1 - Any new client now needs to be configured. 2 - We lose the benefit of the local cache of Dnsmasq.

After a few failed attempts, I figured out what needs to be done. In the DD-WRT configuration webpages, click "Setup" and enter the "Basic Setup" screen. Put a checkmark in the box next to "Use DNSMasq for DNS". Save the settings.

Now go to the "Administration" tab, and click the "Services" subtab. In the "DNSMasq" area, within the "Additional DNS Options" textbox, enter the following:

<pre style="margin:5px 20px; padding:5px;background:#eee;">
no-resolv
server=208.67.222.222
server=208.67.222.220
</pre>

Save the settings, and you will now be using only OpenDNS's servers, and getting the benefit of the local Dnsmasq cache!
