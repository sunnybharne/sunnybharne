# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the special **GitHub profile repository** for the user `sunnybharne` — its `README.md` renders on https://github.com/sunnybharne as the profile landing page. There is no application code, no build system, no tests, and no package manifest. The repo contains only:

- `README.md` — the rendered profile page (centered HTML, shields.io badges, links to other repos).
- `assets/` — SVG icons, PNG/SVG banners, and `.drawio` source files for the banners. The `.drawio` files are the editable sources; the `.svg`/`.png` files next to them are exports embedded in the README.

## Working in this repo

- The only "build" step is editing `README.md` and committing. GitHub renders it directly.
- When changing a banner or icon, edit the `.drawio` source in `assets/` (via diagrams.net / drawio-desktop) and re-export the `.svg` (and `.png` if one exists) alongside it. Keep filenames stable — `README.md` references them by path.
- Preview README changes locally with any Markdown previewer, or push to a branch and view the rendered file on GitHub before merging to `main`.
- All "Expert" / "Past Life" bullet links in `README.md` currently point to the `sunnybharne/azure-enterprise-platform` repo. If you add new links, prefer real repo URLs over placeholders.
