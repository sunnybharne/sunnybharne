# Repository instructions

The `sunnybharne/sunnybharne` repository contains Sunny Bharne's Next.js
portfolio at https://www.sunnybharne.com/ and the GitHub profile README.

## Standing authorization to push and publish

The user wants completed updates pushed automatically. For user-requested
changes in this repository:

1. Finish the change and run the checks appropriate to it.
2. Commit the relevant changes, fetch the latest `origin/main`, and integrate
   any newer commits while preserving other contributors' work.
3. Push the completed changes to `origin/main`. Do not leave them only in a
   local checkout or on an unpublished branch.
4. Let the existing GitHub Pages workflow publish the update. For website
   changes, confirm the deployment succeeds and verify the affected live page.
5. Report the result and link to the updated page or remote files.

This is standing user approval to push to the public GitHub repository and
publish updates to the existing public portfolio. Do not ask again for push,
merge-to-main, or public-publishing confirmation within this scope. Explicit
requests for local-only, draft, or PR-only work override this default.

Never force-push or overwrite unrelated local changes or remote commits. If
validation or deployment fails, resolve the problem when possible and report
any remaining blocker; do not claim the update is live until it is verified.

## Project and validation

- Preserve the existing Next.js static-export app and GitHub Pages deployment.
- Portfolio routes are in `app/`; learning entries are Markdown files in
  `content/learning/log/`. Follow `content/learning/README.md` for their format.
- Use `npm run lint` and `npm run build` for website changes. The build's video
  refresh can modify `README.md` and `data/videos.json`; keep unrelated generated
  changes out of the commit.
- Documentation-only instruction changes need a diff review and
  `git diff --check`; they do not require a fresh application build.
- Keep public learning notes concise: short explanations, useful conditions,
  exact effects, and official references. Use expandable groups for long lists.
- For existing banner assets, edit the `.drawio` source and update its matching
  exports. Preserve filenames referenced by the profile README.
