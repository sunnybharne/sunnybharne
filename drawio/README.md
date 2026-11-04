# Article diagrams

Edit `asc-default.drawio` in draw.io. It contains the ASC Default and Windows baseline pages.
The unrelated profile banner stays in `assets/banner.drawio` at project root.

The `assets/` folder contains the original official Microsoft Subscription,
All Resources, Azure Policy, Virtual Machine, and Defender for Cloud icons. They are also embedded in the
source, so the diagram opens without external image requests.

Keep **Style → Flow Animation** disabled on every connector. Article diagrams stay still.

After saving, run this from the project root:

```sh
node scripts/export-asc-diagram.mjs
```

The script uses `/Applications/draw.io.app/Contents/MacOS/draw.io`.
Pass your draw.io executable path as an argument if it is elsewhere.
It exports both pages into `public/learning-assets/asc-default/` and
`public/learning-assets/windows-baseline/`. Each has identical static exports named
`diagram.svg` and `diagram-static.svg` to preserve existing article links.
Do not edit these generated exports. Neither contains an editable copy.

Then run `npm run build` to refresh the local static preview.

Icons: [Microsoft Azure architecture collection, V24](https://learn.microsoft.com/en-us/azure/architecture/icons/).
Microsoft permits these unchanged icons in architecture diagrams and documentation.

Relationships: [Microsoft policy reference](https://learn.microsoft.com/en-us/azure/defender-for-cloud/policy-reference).
