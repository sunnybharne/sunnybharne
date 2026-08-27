# Learning Journey Content

The `/learning/` page is generated from `roadmap.yml` and the Markdown files
inside `log/`.

## Update The Roadmap

Edit `roadmap.yml` to change the current focus, tracks, milestones, resources,
or evidence links. Valid milestone statuses are:

- `planned`
- `in-progress`
- `paused`
- `completed`

Dates use `YYYY-MM-DD`. Track and milestone IDs must be unique, lowercase, and
hyphenated.

## Add A Learning Entry

1. Copy `log/example-entry.md` to a lowercase, hyphenated filename.
2. Replace the front matter and Markdown body.
3. Set `track` to an ID from `roadmap.yml`.
4. Keep `draft: true` while writing, then set it to `false` to publish.
5. Commit and push to `main`; the GitHub Pages workflow builds the entry.

Required front matter:

```yaml
---
title: "Entry title"
description: "One sentence describing the learning session."
date: 2026-08-27
track: azure-platform
provider: Microsoft Learn
draft: true
---
```

Optional fields are `resourceTitle`, `resourceUrl`, `minutes`, `tags`, and
`evidence`. Evidence uses a title, optional provider, and URL.

Draft files remain visible in the public Git repository after they are pushed.
Never put passwords, tokens, private customer information, or other secrets in
the roadmap or learning log.
