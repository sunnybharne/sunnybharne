# Learning Journey Content

## Article order

Edit `data/article-order.json` to set the homepage and article list order.
Use article slugs, first to last. Unlisted articles follow, newest first.
Keep publication dates unchanged.

## Learning plan

The `/learning/` page reads **only `plan.md`**. Keep study methods,
certification plans, preparation steps, next actions, and session notes in
that single file. Edit its `title`, `description`, and `updated` front matter
along with the body; `updated` uses `YYYY-MM-DD`.

The note is linked from the main navigation as **Learning**. It is separate
from the technical articles generated from `log/`. Keep certification choices,
dates, and progress open until they have been decided; do not invent achievements.

The older `roadmap.yml` remains as reference material and a list of existing
track IDs. It does not supply content to the Learning page.

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
