// postbuild-en.cjs -- collapses dist/en/* into dist/ root for English-only deploy,
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
//   2. Walk dist/ and rewrite every "/en/..." reference to the root path so
//      internal links resolve. Handles four shapes found in VitePress output:
//        a) href="/en/X"     (HTML attribute)
//        b) src="/en/X"      (HTML attribute)
//        c) "link":"/en/X"   (JSON-escaped in inline <script> app data)
//        d) \"/en/X          (any escaped JSON / URL context)
//   3. Drop the now-empty dist/en/ directory.
//
// Side effects:
//   - dist/<product>/EC87.html etc. is now the English version (Chinese version is
//     overwritten and lost in this dist -- keep the bilingual dist if you also want
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

// Step 1 -- move dist/en/* into dist/ root
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

// Step 2 -- rewrite /docs/en/... to /docs/... in every HTML file under dist/.
// (docs:build:en passes --base /docs/, so VitePress emits /docs/en/... URLs.)
function* walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name)
    if (item.isDirectory()) yield* walk(full)
    else yield full
  }
}

// Four rewrite passes cover every shape VitePress emits. Each is an exact
// replacement; we don't try to be clever with a single regex because the
// escaped JSON patterns are fragile to anchor in one pattern.
const REWRITES = [
  // a) HTML attribute form
  { from: 'href="/docs/en/',  to: 'href="/docs/' },
  // b) HTML attribute form for src
  { from: 'src="/docs/en/',   to: 'src="/docs/' },
  // c) JSON-escaped link form: "link":"/docs/en/X" inside <script> blocks
  { from: '"link":"/docs/en/', to: '"link":"/docs/' },
  // d) Any other escaped /docs/en/ occurrence (catches residual cases).
  //    Use a wide single pattern after the targeted ones above.
  { from: '\\"/docs/en/',     to: '\\"/docs/' },
  // e) Root-absolute public-asset refs that bypass the base prefix (the
  //    hardcoded favicon in config.mts head, any <img src="/images/...">):
  //    re-anchor them under /docs/ so they resolve on the project page.
  { from: 'href="/images/',   to: 'href="/docs/images/' },
  { from: 'src="/images/',    to: 'src="/docs/images/' },
  { from: 'href="/downloads/',to: 'href="/docs/downloads/' },
  { from: 'src="/downloads/', to: 'src="/docs/downloads/' },
  // f) RAW (un-based) /en/ refs inside the serialized app-config JSON in
  //    inline <script> blocks. VitePress applies --base at RENDER time, so
  //    these serialized values stay raw; the client router re-bases them on
  //    hydration. After we fold dist/en/* away they must point at the root
  //    paths or every client-side nav click 404s.
  { from: '"link":"/en/',     to: '"link":"/' },
  { from: '\\"/en/',          to: '\\"/' },
  { from: 'href="/en/',       to: 'href="/' },
  { from: 'src="/en/',        to: 'src="/' },
]

let fixed = 0
for (const file of walk(dist)) {
  if (!file.endsWith('.html')) continue
  let content = fs.readFileSync(file, 'utf-8')
  const before = content
  for (const r of REWRITES) {
    content = content.split(r.from).join(r.to)
  }
  if (content !== before) {
    fs.writeFileSync(file, content)
    fixed++
  }
}

// Step 3 -- drop empty dist/en
try { fs.rmdirSync(enDir) } catch (_) { /* not empty (nested dirs survived) */ }

console.log(`[postbuild-en] moved ${moved} entries (${overwritten} overwritten); rewrote /en/ -> / in ${fixed} HTML files`)