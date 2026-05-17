#!/usr/bin/env node
// Fetches latest videos from https://www.youtube.com/@SunnySideCode/videos by
// parsing the `ytInitialData` blob and the `lockupViewModel` tiles inside it.
// Writes data/videos.json (consumed by the Next.js page) and rewrites the
// "## Latest videos" block in README.md between the YOUTUBE:START/END markers.
//
// No API key, no SDK. Run via `npm run sync:videos` or as predev/prebuild.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CHANNEL_URL = 'https://www.youtube.com/@SunnySideCode/videos';
const MAX = 6;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function main() {
  const html = await fetchHtml(CHANNEL_URL);
  const data = extractInitialData(html);
  const videos = collectLockups(data).slice(0, MAX);

  if (videos.length === 0) {
    console.warn('[fetch-videos] no videos parsed — leaving existing data in place');
    return;
  }

  const outDir = path.join(ROOT, 'data');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, 'videos.json'),
    JSON.stringify({ fetchedAt: new Date().toISOString(), videos }, null, 2) + '\n',
  );
  console.log(`[fetch-videos] wrote ${videos.length} videos to data/videos.json`);

  await updateReadme(videos);
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`fetch ${url} → HTTP ${res.status}`);
  return res.text();
}

function extractInitialData(html) {
  const marker = 'var ytInitialData = ';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('ytInitialData not found in page');
  let i = html.indexOf('{', start);
  const jsonStart = i;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return JSON.parse(html.slice(jsonStart, i + 1));
    }
  }
  throw new Error('ytInitialData JSON did not terminate');
}

function collectLockups(data) {
  const out = [];
  const seen = new Set();
  walk(data, (node) => {
    if (!node?.lockupViewModel) return;
    const lvm = node.lockupViewModel;
    const id = lvm.contentId;
    if (!id || seen.has(id)) return;
    const md = lvm.metadata?.lockupMetadataViewModel;
    const title = md?.title?.content;
    if (!title) return;
    const rows = md?.metadata?.contentMetadataViewModel?.metadataRows || [];
    const meta = rows
      .flatMap((r) => (r.metadataParts || []).map((p) => p.text?.content))
      .filter(Boolean);
    seen.add(id);
    out.push({
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      views: meta[0] || null,
      published: meta[1] || null,
    });
  });
  return out;
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  if (Array.isArray(node)) {
    for (const v of node) walk(v, visit);
    return;
  }
  for (const k of Object.keys(node)) walk(node[k], visit);
}

async function updateReadme(videos) {
  const readmePath = path.join(ROOT, 'README.md');
  const current = await fs.readFile(readmePath, 'utf8');
  const START = '<!-- YOUTUBE:START -->';
  const END = '<!-- YOUTUBE:END -->';
  const s = current.indexOf(START);
  const e = current.indexOf(END);
  if (s < 0 || e < 0 || e < s) {
    console.warn('[fetch-videos] README markers not found — skipping README update');
    return;
  }
  const block = renderReadmeBlock(videos);
  const next =
    current.slice(0, s + START.length) + '\n' + block + '\n' + current.slice(e);
  if (next !== current) {
    await fs.writeFile(readmePath, next);
    console.log('[fetch-videos] updated README.md');
  } else {
    console.log('[fetch-videos] README.md already up to date');
  }
}

function renderReadmeBlock(videos) {
  const rows = videos.slice(0, 6);
  const cells = rows.map((v) => {
    const sub = [v.views, v.published].filter(Boolean).join(' · ');
    return (
      `<td align="center" width="33%">` +
      `<a href="${v.url}"><img src="${v.thumbnail}" width="280" alt="${escapeHtml(v.title)}"></a>` +
      `<br><a href="${v.url}"><b>${escapeHtml(v.title)}</b></a>` +
      (sub ? `<br><sub>${escapeHtml(sub)}</sub>` : '') +
      `</td>`
    );
  });
  const lines = ['<table>'];
  for (let i = 0; i < cells.length; i += 3) {
    lines.push('  <tr>');
    for (const c of cells.slice(i, i + 3)) lines.push('    ' + c);
    lines.push('  </tr>');
  }
  lines.push('</table>');
  lines.push('');
  lines.push(
    `<sub>↑ latest from <a href="https://www.youtube.com/@SunnySideCode">@SunnySideCode</a></sub>`,
  );
  return lines.join('\n');
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

main().catch((err) => {
  console.error('[fetch-videos] failed:', err);
  process.exit(1);
});
