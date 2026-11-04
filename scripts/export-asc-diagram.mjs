import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const executable = process.argv[2] || process.env.DRAWIO_BIN || '/Applications/draw.io.app/Contents/MacOS/draw.io';
for (const [page, folder] of [[1, 'asc-default'], [2, 'windows-baseline']]) {
const output = path.join(root, `public/learning-assets/${folder}/diagram.svg`);
fs.mkdirSync(path.dirname(output), { recursive: true });
const result = spawnSync(executable, [
  '--export', '--page-index', String(page), '--format', 'svg', '--embed-svg-images', '--embed-svg-fonts', 'false',
  '--theme', 'light', '--border', '12', '--output', output,
  path.join(root, 'drawio/asc-default.drawio'),
], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

// Both public filenames stay static, including when opened directly.
const svg = fs.readFileSync(output, 'utf8');
if (/@keyframes|\banimation\s*:|<animate/i.test(svg)) throw new Error('Disable flow animation in the draw.io source before exporting.');
fs.writeFileSync(output.replace('.svg', '-static.svg'), svg);

}
