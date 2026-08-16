import { readdir, rename, stat } from 'node:fs/promises';
import { join } from 'node:path';

/* Astro dynamic routes need [bracket] filenames. This project ships them as
   _dyn.* placeholders (some tooling cannot write brackets) and renames them on
   install. Safe to run repeatedly. */

const ROOT = new URL('../src/pages/', import.meta.url).pathname;

function target(name) {
  let m = name.match(/^_dyn\.rest-(.+)\.astro$/);
  if (m) return '[...' + m[1] + '].astro';
  m = name.match(/^_dyn\.(.+)\.astro$/);
  if (m) return '[' + m[1] + '].astro';
  return null;
}

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    const p = join(dir, entry);
    if ((await stat(p)).isDirectory()) { await walk(p); continue; }
    const t = target(entry);
    if (!t) continue;
    await rename(p, join(dir, t));
    console.log('route: ' + entry + ' -> ' + t);
  }
}

await walk(ROOT);
