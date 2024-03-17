---
layout: post
title: 'Easy HTTPS with NGINX and ACME'
date: '2023-08-10 12:00:00'
thumbnail: '/images/njs-acme/njs-acme.png'
tags:
  - Nerd
  - Software
---

## Bottom Line

NGINX has just open-sourced a project that drastically reduces the effort required to add HTTPS support to your NGINX webservers. This project makes use of NJS (which allows for extending NGINX with JavaScript) to integrate an [ACME](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment) (Automated Certificate Management Environment) client into NGINX itself. This client communicates with ACME services like [Let's Encrypt](https://letsencrypt.org/) to manage SSL/TLS certificates automatically on your NGINX server.

![Header Logos](/images/njs-acme/njs-acme.png 'NGINX + NJS + njs-acme + ACME = CERTS')

If you want to try it out, head over to the [njs-acme repository](https://github.com/nginx/njs-acme) for detailed installation instructions. We're working on improving this installation experience now, so installation should get easier over time.

## Background

Since its introduction in the mid 2000s, NGINX offered performance and configurability that was far beyond what was available in other webservers, and became the most popular webserver software in the world. I've been a user of NGINX since 2012, both as a professional and as a hobbyist.

Through the years, public interest in security and privacy has escalated. This has been fueled by more of our lives shifting online, multitudes of news stories of hacks and vulnerabilities, and computer hardware evolving to a degree where site operators no longer need to think too hard about the server resource requirements of encryption.

In 2021, Google pushed a change to Chrome where it would connect to sites over HTTPS by default, and warn the user if their communication with a site was not encrypted. This was a pivotal moment in the history of the Web, and inspired more site operators, even tiny ones, to set up HTTPS.

![Chrome Security Warning](/images/njs-acme/not-secure.png 'Security Warning')

In February of 2023, I joined F5/NGINX as an engineer and architect with an eye on growing NGINX's position as a market leader.

## The Problem

In surveying sentiment inside and outside of the company, one shortcoming in NGINX that came up over and over was the relative difficulty in setting up NGINX to serve requests over HTTPS, especially when it comes to managing certificates. I have felt this pain myself in my own NGINX installations, recently having spent an entire weekend getting NGINX containers on my home server to communicate seamlessly with a [Certbot](https://certbot.eff.org/) container to share and manage TLS certificates. The result was a fragile system with many moving parts.

One major hurdle with working with NGINX is that it requires a server restart when updating certificates. This small detail requires every user to engineer elaborate systems to orchestrate a server restart when certificates are updated.

Modern NGINX competitors have taken an HTTPS-first approach, with ACME support built in, and minimal configuration required to make use of it. This ease-of-use has been the main benefit of our competition, and shows us that it's no longer acceptable in the market to make NGINX users learn the intricacies of configuring and restarting NGINX.

## NJS to the Rescue

NJS was released in 2016 to give operators the capability of writing server middleware in JavaScript and running it in-process with NGINX. This lowers the bar to extending NGINX considerably, which previously had to be extended with fragile/cumbersome C or esoteric Lua code.

Through the years, NJS has been updated and improved to support more modern JavaScript functionality like ES6 modules, cryptography functions, shared memory, etc. Modern NGINX distributions include NJS by default, and in 2023 NJS finally had what was needed to build an ACME client.

My teammate [Maxim Ivanitiskiy](https://github.com/ivanitskiy) took an interest in solving this problem and spent a couple of weeks spinning up a design and implementation of an ACME client in NJS. His approach was not only to build a working ACME client hooked into NGINX, but also a library of ACME functions so that other developers could customize their own ACME client implementation.

I got more involved after Maxim's initial working prototype was ready, and provided some feedback and enhancements to make the end-user experience a little simpler. I tested it along the way on my home webserver. The day I could remove the baroque certbot solution was a good one!

## About the Solution

[njs-acme](https://github.com/nginx/njs-acme) is written in TypeScript and is transpiled to a single `acme.js` file that needs to be installed on the NGINX server. The njs-acme repository contains a Dockerfile and make target so that an NGINX container can be built with njs-acme already installed.

```
> make docker-build
docker buildx build  -t nginx/nginx-njs-acme .
[+] Building 35.7s (20/20) FINISHED
...
 => exporting to image
 => => exporting layers
 => => writing image ...
 => => naming to docker.io/nginx/nginx-njs-acme
```

At minimum, njs-acme only needs to know two things: 1) the set of hostnames it should request a certificate for and 2) an email address to use as the registrant with the ACME provider. njs-acme can be configured either via NGINX config variables or environment variables. They're equivalent as far as njs-acme goes, with environment variables taking precedence over config variables.

Here is an excerpt from my `docker-compose.yml` file showing the `nginx/nginx-njs-acme` container in use, as well as the required configuration.

```
  nginx:
    image: nginx/nginx-njs-acme
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    hostname: yourdomain.com
    environment:
      - NJS_ACME_SERVER_NAMES=yourdomain.com other.yourdomain.com
      - NJS_ACME_ACCOUNT_EMAIL=your@mail.com
```

Given these two required configuration parameters, njs-acme will handle communication with an ACME provider like Let's Encrypt, creating and sending the Certificate Signing Request, serving the HTTP challenge response, storing the certificate/key, as well as renewing the certificate automatically. When the certificate is renewed, njs-acme will begin using the new certificate without requiring a server restart.

![Sequence Diagram](/images/njs-acme/sequence.png 'Sequence Diagram')

This is a huge improvement that will benefit many current and future NGINX users. Please check out the [njs-acme source code repository](https://github.com/nginxinc/njs-acme), and open an issue or a pull request if something isn't as good as it could be.
