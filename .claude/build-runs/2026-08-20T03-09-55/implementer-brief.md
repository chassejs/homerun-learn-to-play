# Implementer Brief — Homerun Learn to Play — CHUNK 1 of 9

## HARD CONSTRAINT: NO SHELL ACCESS

You have **Read, Write, Edit, and directory listing only**. Your shell tool is
unavailable in this session — do **not** attempt any command, not even a
verification command like `node --check`, `ls`, `git`, or `npm`. Any shell call
will silently cancel this turn and waste the whole run. The reviewer runs all
syntax checks, tests, and git operations afterward.

Read files you need with your Read tool. Create and edit files with Write/Edit.
That is the entire toolset for this build.

---

## Project context

**App:** Homerun Learn to Play — a progressive, interactive baseball curriculum
web app for **Homerun Baseball Ottawa**, a values-based youth baseball nonprofit
in Ottawa, Canada.

**Repo root:** `/Users/jschasse/Documents/JS Chassé/Projects/homerun-learn-to-play`

**Authoritative specification:** `docs/BUILD-PLAN.md` in this repo. **Read it in
full before writing anything.** It defines the brand envelope, the 24-chapter
curriculum, the assessment system, the data shapes, the file inventory, and the
acceptance criteria. This brief covers only Chunk 1; the spec covers everything.

Also read `.claude/build-runs/2026-08-20T03-09-55/01-plan.md` for the execution
plan and the numbered acceptance criteria.

### Reference apps (read these for house style — do not copy wholesale)

- `/Users/jschasse/Documents/JS Chassé/Projects/homerun-practice-app/styles.css`
  — the canonical brand CSS envelope. Your `styles.css` must open with the same
  token block and the same commenting discipline.
- `/Users/jschasse/Documents/JS Chassé/Projects/homerun-practice-app/index.html`
  — the canonical shell markup: skip link, `.app-bar` with crest + title + nav,
  `<main id="app-main">` containing `.view` sections.
- `/Users/jschasse/Documents/JS Chassé/Projects/homerun-practice-app/shell.js`
  — the canonical view-switching pattern (you write a richer one in Chunk 3).

### Already present — DO NOT recreate or modify in this chunk

`version.js` (`HRL_VERSION`), `versionCompat.js` (`HRL_VERSION_COMPAT`),
`appUpdates.js` (`HRL_APP_UPDATES`), `uiModal.js` (`HRL_MODAL`),
`feedback.js` (`HRL_FEEDBACK`), `changelog.js` (`HRL_CHANGELOG`),
`changelog.html`, `sw.js`, `netlify.toml`, `_redirects`, `deploy.sh`,
`.gitignore`, and everything in `brand/`.

These were copied from `homerun-practice-app` and already renamed to the `HRL_`
namespace, with the storage key `homerun-learn/progress/v1`.

### Brand assets that exist in `brand/` (exact filenames — verified)

```
crest.png              wordmark.png           mark.png
icon-32.png            icon-180.png           icon-512.png
crest-mono-cream.jpg   mark-filled.jpg        lockup-horizontal.jpg
diamond-golden-hour.jpg  pattern-brand-tile.jpg  slide-navy-backdrop.jpg
values-triad.jpg       roots-diagram.jpg
icon-effort.jpg        icon-respect.jpg       icon-team.jpg
```

Reference any of these as `brand/<filename>`. Do not reference a file not on
this list — there are no others.

---

## Coding standards (apply to every chunk)

- **No ES modules.** Classic `<script src="...">` tags only. Each app file is an
  IIFE assigning exactly one `window.HRL_*` global.
- **ES5-safe syntax** in every `.js` file you write: `var` only (no `let`/`const`),
  `function` expressions only (no arrow functions), string concatenation only
  (no template literals), no `class`, no default/rest parameters, no
  destructuring, no `Object.assign` (write a local `extend()` helper),
  no `Array.prototype.includes` (use `indexOf`), no optional chaining.
  Use `Array.prototype.forEach`/`map`/`filter` via `Array.prototype.X.call(...)`
  when operating on NodeLists.
- **`'use strict';`** at the top of every IIFE.
- Every file opens with a banner comment in the house style:
  ```
  /* ===================================================================
     Homerun Learn to Play — <filename>
     <one- to three-line description of the file's responsibility>
     =================================================================== */
  ```
- No dependencies, no network calls, no `fetch` (except the one already in
  `appUpdates.js`), no CDNs, no Google Fonts, no external images.
- Must work when `index.html` is opened directly from `file://`.

---

## CHUNK 1 DELIVERABLES

Create exactly these five files. Nothing else in this chunk.

### 1. `styles.css`

The complete design system. Structure it with clearly commented sections.

**Token block — copy these values exactly, no substitutions:**

```css
:root {
  /* Homerun Baseball Ottawa brand palette — do not alter these five values */
  --brand-navy:   #062448;
  --brand-navy-2: #14294d;
  --brand-red:    #a3301f;
  --brand-red-2:  #8d2418;
  --brand-cream:  #f6f3ec;
  --brand-white:  #ffffff;
  --ink-muted:    #4a5568;

  /* Teaching colours — field diagrams ONLY, never brand chrome */
  --teach-ball:    #dc2626;
  --teach-base:    #facc15;
  --teach-backup:  #16a34a;
  --teach-unit-if: #0d9488;
  --teach-unit-of: #ea580c;
  --teach-battery: #374151;

  /* Derived surfaces */
  --color-bg:            var(--brand-cream);
  --color-surface:       var(--brand-white);
  --color-surface-alt:   #fbf9f4;
  --color-border:        #d8d3c6;
  --color-text:          var(--brand-navy);
  --color-muted:         var(--ink-muted);
  --color-primary:       var(--brand-navy);
  --color-primary-hover: var(--brand-navy-2);
  --color-accent:        var(--brand-red);
  --color-accent-hover:  var(--brand-red-2);

  --radius:    6px;
  --radius-lg: 10px;
  --shadow-card: 0 1px 3px rgba(6, 36, 72, 0.10);
  --shadow-pop:  0 6px 20px rgba(6, 36, 72, 0.18);

  --text-xs:   0.70rem;
  --text-sm:   0.82rem;
  --text-base: 0.90rem;
  --text-md:   1.00rem;
  --text-lg:   1.10rem;
  --text-xl:   1.40rem;
  --text-2xl:  1.75rem;
  --text-3xl:  2.25rem;

  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;   --space-8: 3rem;

  --maxw: 1100px;
}
```

Also define **six tier accent tokens** — one per tier, all drawn from or
harmonising with the brand palette (navy through red progression), e.g.
`--tier-rookie` … `--tier-promind`. Keep every one of them contrast-safe for
white text.

**Font stack (exact):**
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
Base `font-size: 15px`, `line-height: 1.5`.

**Contrast rules you must respect throughout:** white text only on navy or red;
navy text only on cream or white; never red text on navy at body size; never
cream text on red for paragraphs (short labels only).

**Component styles required in this chunk** (markup for all of them is in
`index.html` below; later chunks generate matching markup — use these exact
class names so later chunks can rely on them):

- **Chrome:** `.skip-link`, `.app-bar`, `.app-logo`, `.app-bar-title`,
  `.app-bar-sub`, `.app-nav`, `.nav-btn`, `.nav-btn.active`, `.nav-btn-readme`,
  `.app-footer`, `.view`, `.view.active` (only the active view is displayed).
- **Home:** `.hero` (uses `brand/diamond-golden-hour.jpg` with a navy scrim
  overlay so cream text stays ≥4.5:1), `.hero-crest`, `.hero-title`,
  `.hero-motto`, `.hero-actions`, `.continue-card`, `.tier-rail`, `.tier-rail-item`,
  `.quick-links`, `.quick-link-card`.
- **Path:** `.tier-accordion`, `.tier-head`, `.tier-head.open`, `.tier-body`,
  `.tier-ring` (SVG progress ring container), `.chapter-grid`, `.chapter-card`,
  `.chapter-card.complete`, `.chapter-card.recommended`, `.chapter-card.visited`,
  `.chapter-card-meta`, `.chapter-badge`, `.score-pill`.
- **Chapter reader:** `.chapter-header`, `.chapter-objectives`, `.chapter-progress`,
  `.section`, `.section-heading`, `.section-prose`, `.section-diagram`,
  `.diagram-caption`, `.keypoints`, `.keypoints li`, `.coachnote`, `.example-box`,
  `.divisionnote`, `.divisionnote table`, `.terms-row`, `.term-btn`
  (dotted underline, opens the glossary popover), `.chapter-nav`, `.chapter-cta`.
- **Quiz / IQ:** `.quiz-shell`, `.quiz-progress-dots`, `.quiz-dot`,
  `.quiz-dot.correct`, `.quiz-dot.wrong`, `.quiz-dot.current`, `.quiz-prompt`,
  `.choice-list`, `.choice-btn`, `.choice-btn.selected`, `.choice-btn.correct`,
  `.choice-btn.wrong`, `.quiz-explain`, `.quiz-result`, `.score-ring`,
  `.bbiq-score`, `.bbiq-band`, `.topic-breakdown`, `.answer-review`.
- **Widgets:** `.widget`, `.widget-head`, `.widget-body`, `.widget-actions`,
  `.widget-status`, `.token` (draggable player/label token), `.token.selected`,
  `.token.placed`, `.dropzone`, `.dropzone.over`, `.dropzone.correct`,
  `.dropzone.wrong`.
- **Generic:** `.btn`, `.btn-primary` (navy), `.btn-accent` (red),
  `.btn-ghost`, `.btn-sm`, `.card`, `.panel`, `.pill`, `.badge-rosette`,
  `.hint`, `.visually-hidden`, `.empty-state`, `.progress-bar`, `.progress-bar-fill`,
  `.toast`.

**Required global rules:**

- `*, *::before, *::after { box-sizing: border-box; }`
- Focus: `:focus-visible { outline: 2px solid var(--brand-red); outline-offset: 2px; }`
  — and a cream outline variant for controls sitting on navy backgrounds.
- All interactive controls: `min-height: 44px; min-width: 44px;` (except inline
  `.term-btn`, which may be text-sized).
- `@media (prefers-reduced-motion: reduce)` — disable every transition and
  animation (`animation-duration: 0.01ms !important; transition-duration: 0.01ms !important;`).
  Also honour a `body.reduced-motion` class that the settings toggle will add.
- Responsive: single column below 768px; two-column path and chapter layouts at
  ≥768px; content capped at `var(--maxw)` and centred. Nothing may cause
  horizontal body scroll at 360px.
- `@media print`: hide `.no-print`, `.app-bar`, `.app-nav`, `.chapter-nav`;
  print the chapter reader cleanly on white with page breaks between sections;
  size diagrams to fit the page width.
- Use `brand/pattern-brand-tile.jpg` as a very subtle (low-opacity) page texture
  on the home hero band only — never behind body copy.

Write real, complete CSS. No placeholder comments standing in for rules.

### 2. `index.html`

The SPA shell. Model the head and app-bar on
`homerun-practice-app/index.html`, then add all eight views.

Head requirements:
- `<html lang="en">`, UTF-8, viewport meta.
- `<title>Homerun Learn to Play</title>`
- `<link rel="manifest" href="manifest.json">`, `<meta name="theme-color" content="#062448">`
- `<link rel="icon" type="image/png" sizes="32x32" href="brand/icon-32.png">`
- `<link rel="apple-touch-icon" href="brand/icon-180.png">`
- `<link rel="stylesheet" href="styles.css">`
- A `<meta name="description">` describing the app.

Body requirements:
- Skip link to `#app-main`.
- `.app-bar` with `brand/crest.png` (alt "Homerun Baseball Ottawa"), the title
  "Homerun Learn to Play", the sub-label "Baseball, chapter by chapter", and a
  `<nav class="app-nav" aria-label="Main navigation">` containing six
  `<button type="button" class="nav-btn" data-view="...">` controls:
  `home` (Home), `path` (My Path), `iq` (Baseball IQ), `review` (Review),
  `glossary` (Glossary), and `help` (Help & Guide — this one also gets
  `nav-btn-readme`). `home` starts with `active`.
- `<main id="app-main">` containing **eight** `<section class="view" id="view-X">`
  elements in this order: `view-home` (with `active`), `view-path`, `view-chapter`,
  `view-quiz`, `view-iq`, `view-review`, `view-glossary`, `view-help`.
  `view-chapter` and `view-quiz` have **no nav button** — they are entered from
  within the app.
- Each view has exactly one `<h1>` or `<h2>` heading (the app bar carries the
  `<h1>` for the app name, so views use `<h2>`; keep heading levels from skipping).
- **`view-home`** is fully authored static markup in this chunk: the hero
  (crest, "Learn baseball, one chapter at a time", the motto *"Talent is what
  you have, effort is what you give."*, and two buttons — "Find my starting
  point" and "Browse all chapters"), an empty `<div id="home-continue">`
  placeholder for the continue-card, an empty `<div id="home-tier-rail">`, and a
  quick-links row to Baseball IQ, Review, and Glossary.
- **`view-help`** is fully authored static markup in this chunk: how the app
  works (placement → chapters → quizzes → review deck → IQ test), how progress
  is stored (this browser only, no account, no cloud), export/import guidance,
  a "Send feedback" button with `id="help-feedback-btn"`, the version footer
  container `<div id="version-footer"></div>`, and a link to `changelog.html`.
  Include a short "About Homerun Baseball Ottawa" block naming the three values
  in order — Effort, Respect, Team — and the ROOTS coach code
  (Rules, Officials, Opponents, Teammates, Self).
- **The other six views** get their heading, a one-line intro paragraph, and a
  single empty container div with a stable id that later chunks render into:
  `#path-root`, `#chapter-root`, `#quiz-root`, `#iq-root`, `#review-root`,
  `#glossary-root`. Do not author their inner content — later chunks own it.
- A `<div id="modal-root"></div>` and a `<div id="toast-root" aria-live="polite"></div>`
  before the closing scripts.
- Service-worker registration inline at the end of body, guarded with
  `if ('serviceWorker' in navigator && location.protocol !== 'file:')`.

**Script tags — this exact order** (files not yet written will 404 until their
chunk lands; that is expected and fine):

```html
<script src="version.js"></script>
<script src="versionCompat.js"></script>
<script src="uiModal.js"></script>
<script src="src/glossary-data.js"></script>
<script src="src/curriculum-data.js"></script>
<script src="src/questions-data.js"></script>
<script src="svg.js"></script>
<script src="progress.js"></script>
<script src="interactive.js"></script>
<script src="quiz.js"></script>
<script src="iq.js"></script>
<script src="placement.js"></script>
<script src="learn.js"></script>
<script src="feedback.js"></script>
<script src="changelog.js"></script>
<script src="appUpdates.js"></script>
<script src="shell.js"></script>
```

### 3. `manifest.json`

Mirror `homerun-practice-app/manifest.json`'s shape:
`name` "Homerun Learn to Play", `short_name` "Learn to Play",
`description` "Homerun Baseball Ottawa — learn baseball from first pitch to pro-level IQ",
`start_url` "/", `display` "standalone", `background_color` and `theme_color`
`#062448`, and the three brand icons (`brand/icon-32.png` 32x32,
`brand/icon-180.png` 180x180, `brand/icon-512.png` 512x512 with
`"purpose": "any maskable"`).

### 4. `package.json`

```json
{
  "name": "homerun-learn-to-play",
  "version": "1.0.0",
  "description": "Homerun Learn to Play — progressive interactive baseball curriculum for Homerun Baseball Ottawa.",
  "private": true,
  "scripts": {
    "build": "echo 'Static build complete — no bundler needed. Files served from root.' && exit 0",
    "start": "npx serve . --listen 3000",
    "test": "node tests/run-all.js"
  },
  "engines": {
    "node": ">=18"
  }
}
```

### 5. `version.json`

```json
{
  "version": "1.0",
  "released": "2026-08-19"
}
```

---

## Acceptance for Chunk 1

- All five files exist and are complete — no TODOs, no `...` placeholders, no
  commented-out "add rules here" stubs.
- `styles.css` contains the five brand hex values verbatim and defines every
  class name listed above with real rules.
- `index.html` contains all eight `.view` sections with the exact ids listed,
  the six nav buttons with the exact `data-view` values, the six empty render
  roots with the exact ids, and the script tags in exactly the order given.
- `view-home` and `view-help` are fully authored; the other six views contain
  only heading, intro, and their empty root div.
- Valid JSON in `manifest.json`, `package.json`, and `version.json`.
- No external URLs anywhere.

## Report back (required — end your turn with this)

List, precisely:

1. Every CSS custom property you defined in `:root` (names only), including the
   six tier accent token names and their hex values.
2. Every CSS class name you defined, grouped by the component groups above, plus
   any additional classes you introduced that were not in this brief.
3. Every element `id` present in `index.html`.
4. The final script-tag order as written.
5. Any place you deviated from this brief, and why.

The next chunk's brief will reference these names directly, so the list must be
exact and complete.
