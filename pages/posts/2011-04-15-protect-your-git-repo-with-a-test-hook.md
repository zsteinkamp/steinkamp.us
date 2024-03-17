---
layout: post
title: Protect Your Git Repo With a Test Hook
date: '2011-04-15 04:22:02'
tags:
  - Nerd
  - Software
  - Work
---

We have a situation at work where we're using a git repository as a data source. The quality/correctness of the files checked in to this repo is critical to the operation of a larger and very important system.

To help ward off mistakes, we built a series of unit tests using Test::Unit::TestCase, and hooked it into our Rakefile so that before committing a change we (usually) run "rake test" and let the automated tests do their thing. It's so cool that it can do over 1000 checks in a small fraction of a second. As we identify other pitfalls, we can avoid them in the future by adding new tests.

As long as people run "rake test" before pushing their code to the central repository, everything is fine. But people are not consistent like computers...

Since the correctness of the data in this repo is so important, we put a small script on our git server that prevents commits that do not pass the tests from being "received" by the server. The script is in `{repodir}/hooks/pre-receive`, and it looks something like this:

```
#!/usr/bin/env ruby
# hooks/pre-receive - Git hook for verifying repo data

require "logger"
require "tempfile"
require "fileutils"

ME = File.basename $0
GIT = "/usr/bin/git"
RAKE = "/usr/bin/rake"
TAR = "/bin/tar"
LOGFILE = "/var/tmp/myrepo-pre-receive.log"
TMPDIR = "/tmp/caches/myrepo.#{$$}"

$Log = Logger.new(LOGFILE)
$Log.level = Logger::DEBUG
$Log.info "#{ME} start"

# renders Process::Status object p as a human-readable
# string, like "was terminated by signal 1 with status 1 (core dump)".
# Returns a message for $? if no Process::Status is passed in.
def proc_status(p = $?)
  [
    p.exited? ? 'exited' : 'was terminated',
    p.termsig ? "by signal #{p.termsig}" : nil,
    'with status', p.exitstatus,
    p.coredump? ? '(core dumped)' : nil
  ].compact.join ' '
end

# Read stdin to determine what files changed. The input format is:
# http://www.kernel.org/pub/software/scm/git/docs/githooks.html#pre-receive

last_rev = nil
STDIN.each do |s|
  old, new, ref = s.chomp.split
  $Log.debug "read from stdin: old = '#{old}', new = '#{new}', ref = '#{ref}'"
  last_rev = new
end

# now extract the repo and run tests
$Log.debug "exporting repo to #{TMPDIR}"
FileUtils.mkdir_p(TMPDIR)
`#{GIT} archive #{last_rev} | #{TAR} -x -C #{TMPDIR}`

$Log.debug "running 'rake test' in #{TMPDIR}"
puts `cd #{TMPDIR} && #{RAKE} test`
ps = $?

$Log.debug "cleaning up #{TMPDIR}"
FileUtils.rm_rf(TMPDIR)

$Log.info proc_status(ps)

if ps.to_i > 0
  abort "Tests failed.  Run 'rake test' locally before pushing."
end

$Log.info "#{ME} exit"
exit 0
```

Now it is impossible for a change that does not pass the tests to go out. Another nice feature of this system is that the tests are part of the code in the repo, so nothing else needs to change on the git server side when we change our tests.
