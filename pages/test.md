---
someList:
- foo
- bar
- baz
title: cool
---

# Hello, World {% $markdoc.frontmatter.title %}

```
{% $markdoc.frontmatter.someList %}
and
{% $markdoc.frontmatter.title %}
```

{% each over=$markdoc.frontmatter.someList varName="foo" %}
## hello someone {% $foo /%}
{% /each %}
