---
layout: post
title: Making 'git diff' Work For .amxd
date: '2022-02-15 12:00:00'
tags:
  - Nerd
  - Music
  - Software
---

Here's a quick tip if you're using git for revision control in developing Max/MSP or Max For Live devices.

Perhaps you have been here?

```bash
$ git diff
diff --git a/cool.amxd b/cool.amxd
index c7a9b88..afdafb1 100644
Binary files a/cool.amxd and b/cool.amxd differ
```

`.amxd` files are basically JSON, but with a non-JSON file header. This binary part at the beginning makes git fall back to binary file mode when trying to show diffs. Usualy that's not very helpful.

There's just a bit of configuration to make the `git diff` output more helpful. Here's what to do:

1. Create a global `.gitattributes` file in your home directory. This will will map the `.amxd` file extension to a named file type that we will use later. Run this command to create the file with the correct contents:

```bash
echo '*.amxd binary diff=amxd' > ~/.gitattributes
```

2. Now tell git where to find the new global `.gitattributes` file. Run this command:

```bash
git config --global core.attributesfile ~/.gitattributes
```

3. The final step is to tell git how to convert the 'binary' file to text when displaying a diff. Add this content to your `~/.gitconfig` file:

```config
[diff "amxd"]
  textconv = awk '(NR>1)'
  binary = true
```

Now, when you run `git diff` you will get useful output:

```diff
diff --git a/cool.amxd b/cool.amxd
index c7a9b88..afdafb1 100644
--- a/cool.amxd
+++ b/cool.amxd
@@ -52,7 +52,7 @@
  "saved_attribute_attributes" : {
    "valueof" : {
      "parameter_exponent" : 0.5,
-     "parameter_initial" : [ 100 ],
+     "parameter_initial" : [ 0 ],
      "parameter_initial_enable" : 1,
      "parameter_longname" : "De-Click",
      "parameter_mmax" : 100.0,
```

In this case, we're using `awk` to suppress printing the first line. That's good enough for my uses, but if you are an `awk` wizard and you want to use a tool like `jq` to work with the JSON data, perhaps you can suppress everything to the initial `{` on that first line. Let me know if you do that. [zack@steinkamp.us](mailto:zack@steinkamp.us)

If you'd like to have a look at some of my Max for Live devices, you can see them [here](/music-tools/).
