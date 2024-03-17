---
layout: post
title: Waiting For a Service to Actually Become Available in docker-compose
date: '2017-10-19 03:09:30'
tags:
- Nerd
---

If you use docker-compose to run an app, more than likely you use container links in the form of "depends_on:" in your docker-compose.yml, like this:

```
services:
  api:
    build: .
  depends_on:
      - db
    ports:
      - "8080:8080"
  db:
    image: postgres:9.6-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
```

The problem is that your app ("api" in the example above) will start immediately after the command to start "db" and "redis" is invoked. If the service you depend on takes time to start -- maybe you are setting up a DB schema or seeding data -- and your app tries to connect right away, then it may fail to start or you may see unnecessary errors.

The solution to this problem is to have your app wait for the service it depends on to actually become available. If this can be determined by the ability to establish a TCP connection to that service, then you can use Linux's built-in networking capabilities to do this test for you. No need to install any utilities!

```
services:
  api:
    build: .
   depends_on:
      - db
    ports:
      - "8080:8080"
    <strong>command: |
      /bin/bash -c 'while ! `(echo > /dev/tcp/db/5432) >/dev/null 2>/dev/null`
      do
        echo "Waiting for db to become available..."
        sleep 1
      done
      NODE_ENV=production node app.js'</strong>
  db:
    image: postgres:9.6-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
```

With this technique, you can test for the availability of any TCP port before actually starting your app.
