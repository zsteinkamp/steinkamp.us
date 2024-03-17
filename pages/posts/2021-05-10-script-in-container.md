---
layout: post
title: The Best Ways To Run a Short Script in a Container
date: '2021-05-10 12:00:00'
thumbnail: '/images/turducken.jpg'
tags:
- Nerd
- Software
---

Gone are the days of managing installed versions of interpreters (Ruby, Javascript/Node.js, Python, ...), compilers, servers, databases, and caches on your local machine. A combination of free hypervisor software combined with LXC (Linux Containers) yielded Docker, a beautiful way to run many things in one machine with controlled isolation.

Being able to gracefully network between containers, mount file systems between containers and the host machine, bring up entire config-managed collections of services with one command, and have perfect repeatable builds is a godsend. Docker is the biggest game changer I have seen in my 22 years of professional software development.

The only software a new employee in my team at work has to install on their new MacBook Pro is Docker. Everything else that the team depends on to build, test, and deploy software runs in Docker. All of the Docker commands and configuration are managed in git repositories, so there is a perfect audit trail and precise versioning.

One shortcoming of this approach is when small utilities need to be written and run, the overhead is higher than it should be. For a custom script with custom dependencies that needs to have visibility into the host filesystem, at least three files are needed.

1. The script itself.
2. A `Dockerfile` to choose a base image and install any other dependencies.
3. A `docker-compose.yml` file or another shell script to manage invoking the Docker commands to build the image and run the container.

Three files to manage in source control for one task. Sadface.

There is a better way. Well, two actually...

## containerscript

Following the example below, you can write a single Bash script to define the Dockerfile, Docker build/run commands, and the script to run, all in one. Just replace the `cmd()` function content with your own, and change the `FROM` line in the `Dockerfile` and/or add more dependencies to the container with `RUN` commands.

{% script src="https://gist.github.com/zsteinkamp/7235cebd34166a12ef0ba3bb1bae3758.js" /%}

## Enter The Turdokken

Taking the idea of containerscript even further, [Turdokken](https://github.com/zsteinkamp/turdokken) aims to be your new shebang-line crush. Turdokken is intended to be installed somewhere in the `$PATH` of the host it's running on, so that your scripts can use it as their shebang line. The Turdokken utility accepts command-line switches to control installing dependencies, mounting volumes, or options like interactive mode. So it's easy to write a tiny script that runs in a container:

```
#!/usr/bin/env -S turdokken --install mysql-client

mysql --version
uname -a
echo $HOST_USERNAME
echo $@
```

Then executing `./myscript.sh foo bar` will output:

```
mysql  Ver 15.1 Distrib 10.4.13-MariaDB, for Linux (x86_64) using readline 5.1
Linux 3f73bdfc43c3 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64 Linux
yourlogin
foo bar
```

NOTE: It is critical that the shebang line starts with #!/usr/bin/env -S turdokken.

In this case, turdokken builds a Docker image with the mysql-client package installed, then runs the container, mounts the script inside the container, then invokes the script using bash inside the container.

You can do anything with any packages, languages, or compilers, even mount local files into the container for reading or modification.

Let me know if you find either of these useful, or if you have any questions.
