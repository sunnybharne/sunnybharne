# Writing Posts

Posts for `sunnybharne.com` live in this directory and are published as static
pages during the GitHub Pages build.

## Create A Post

1. Copy `example-post.md` to a lowercase, hyphenated filename such as
   `azure-policy-release-design.md`.
2. Replace the front matter and Markdown body.
3. Keep `draft: true` while writing. Drafts appear with `npm run dev` but are
   excluded from production builds.
4. Change the value to `draft: false` when the post is ready to publish.
5. Commit and push to `main`. The GitHub Pages workflow publishes the post.

Required front matter:

```yaml
---
title: "Post title"
description: "One sentence used on listing pages and in search metadata."
date: 2026-08-27
tags:
  - azure
  - terraform
draft: true
---
```

The optional `updated` field uses the same `YYYY-MM-DD` format.

`draft: true` hides a post from the deployed website, but it does not make the
file private after it is pushed to this public GitHub repository. Keep a draft
only on your machine until it is ready if its contents should not be visible on
GitHub.

Do not add another level-one heading inside the post body. The page renders the
front-matter title as the article heading.

Place post images under `public/posts/<post-slug>/` and reference them with an
absolute site path:

```markdown
![Useful alternative text](/posts/azure-policy-release-design/diagram.png)
```

Never put passwords, tokens, private customer information, or other secrets in
a post or image.
