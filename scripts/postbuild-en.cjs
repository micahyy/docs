// postbuild-en.cjs — collapses dist/en/* into dist/ root for English-only deploy,
// and rewrites internal URL references so sidebar/nav still work.
//
// Why: VitePress builds all locales into one dist/ tree. The /en/ locale lives at
// dist/en/<path>.html while the default locale lives at dist/<path>.html. For an
// English-only deploy (e.g. micahyy.github.io/docs) we want only English pages,
// served at root URLs (e.g. /7_EC/EC87.html, not /en/7_EC/EC87.html).
//
// What it does:
//   1. For every top-level entry under dist/en/, move it to dist/ (overwriting any
//      same-named Chinese files at root).
//   2. Walk dist/ and rewrite every `href="/en/..."` / `src="/en/..."` to the
//      root path so internal links resolve.
//   3. Drop the now-empty dist/en/ directory.
//
// Side effects:
//   - dist/<product>/EC87.html etc. is now the English version (Chinese version is
//     overwritten and lost in this dist — keep the bilingual dist if you also want
//     to deploy to Aliyun; run a separate build for that).
//   - Shared assets/ and images/ at dist/ root stay untouched.
//
// Usage: invoked by `npm run docs:build:en`, which also passes --base /docs/ to
// vitepress so URLs are prefixed correctly for GitHub Pages project pages.

const fs = require('node:fs')
const path = require('node:path')

const dist = path.resolve(__dirname, '..', 'docs', '.vitepress', 'dist')
const enDir = path.join(dist, 'en')

function exists(p) {
  try { fs.accessSync(p); return true } catch { return false }
}

if (!exists(enDir)) {
  console.error('[postbuild-en] dist/en not found. Did VitePress build succeed and is the /en/ locale configured?')
  process.exit(1)
}

// Step 1 — move dist/en/* into dist/ root
const entries = fs.readdirSync(enDir, { withFileTypes: true })
let moved = 0
let overwritten = 0
for (const entry of entries) {
  const src = path.join(enDir, entry.name)
  const dst = path.join(dist, entry.name)
  if (exists(dst)) {
    fs.rmSync(dst, { recursive: true, force: true })
    overwritten++
  }
  fs.renameSync(src, dst)
  moved++
}

// Step 2 — rewrite /en/... to /... in every HTML file under dist/
function* walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name)
    if (item.isDirectory()) yield* walk(full)
    else yield full
  }
}

const HREF_RE = /href="\/en\//g
const SRC_RE  = /src="\/en\//g
let fixed = 0
for (const file of walk(dist)) {
  if (!file.endsWith('.html')) continue
  let content = fs.readFileSync(file, 'utf-8')
  const before = content
  content = content
    .replace(HREF_RE, 'href="/')
    .replace(SRC_RE,  'src="/')
  if (content !== before) {
    fs.writeFileSync(file, content)
    fixed++
  }
}

// Step 3 — drop empty dist/en
try { fs.rmdirSync(enDir) } catch (_) { /* not empty (nested dirs survived) */ }

console.log(`[postbuild-en] moved ${moved} entries (${overwritten} overwritten); rewrote /en/ → / in ${fixed} HTML files`)