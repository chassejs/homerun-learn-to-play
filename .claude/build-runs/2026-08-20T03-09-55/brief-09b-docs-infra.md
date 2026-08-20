# Implementer Brief — Chunk 9b — docs and the last two infrastructure edits

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. The
reviewer runs all checks.

## Situation

The test suite from chunk 9 is finished and passing (168 assertions across 8
files). **Do not touch anything in `tests/`.** Only the documentation and two
small infrastructure edits remain.

## Deliverables — five items, nothing else

### 1. `README.md`

House style: read
`/Users/jschasse/Documents/JS Chassé/Projects/homerun-practice-app/README.md`
and follow its tone and structure.

Cover, in this order:

- **What it is** — Homerun Learn to Play, a progressive baseball curriculum for
  Homerun Baseball Ottawa, taking a reader from never having watched a game to
  reading a scouting report.
- **How to open it** — double-click `index.html` (it runs from `file://` with no
  server), or `npm start` for a local server on port 3000. No build step, no
  install, no account, works offline after first load.
- **Finding your starting point** — the placement quiz: three questions about the
  reader plus eight adaptive baseball questions, with no wrong answers and a
  visible skip. It recommends a tier; **every chapter stays unlocked regardless**.
- **The six tiers and 24 chapters** — list them. Read the real titles and
  subtitles out of `src/curriculum-data.js` and `src/curriculum-t1.js` …
  `src/curriculum-t6.js`. Do not invent titles.
- **Chapter quizzes** — 6–8 questions, 75% to pass, unlimited retakes, best score
  kept, every miss saved for review.
- **The review deck** — spaced repetition on a 1 / 3 / 7 / 16 / 35-day schedule;
  a correct answer promotes a card, a miss resets it to day one, and a card
  answered correctly at the last box retires.
- **The Baseball IQ test** — 20 adaptive questions covering at least eight
  topics, scored 40–160. List the bands: under 70 Rookie, 70–89 Sandlot,
  90–109 Diamond, 110–124 Select, 125–139 Elite, 140+ Pro Mind. Mention the
  per-topic radar breakdown and the optional 45-second timer.
- **Where your progress lives** — this browser on this device only. No account,
  no cloud. Clearing site data or switching devices starts over unless exported.
- **Export and import** — what the file is, and that import *merges* (higher
  scores win, completed chapters stay completed, review items keep the later due
  date).
- **Accessibility** — every exercise is operable by keyboard alone; diagrams
  carry text alternatives; colour is never the only signal; `prefers-reduced-motion`
  is honoured and there is an in-app toggle; chapters print cleanly for handouts.
- **Content sources** — the baseball content is written from the Youth Baseball
  Canada knowledge base (`/Users/jschasse/knowledge-base/youth-baseball-canada/`),
  and the visual identity follows the Homerun Baseball Ottawa brand guidelines
  (`/Users/jschasse/knowledge-base/homerun-ottawa/brand/brand-guidelines.md`).
  Note that rules varying by division are called out per division in the lessons.
- **Illustrations** — all diagrams and the six tier hero banners are drawn
  programmatically as SVG; there are no raster hero images, and
  `design/hero-image-prompts.md` holds prompts if raster art is wanted later.
- **Running the tests** — `npm test` runs 168 assertions across eight files;
  summarise what each file covers in one line each.
- **Deploying** — GitHub → Netlify, **build command empty**, publish directory
  `.`; `netlify.toml` already sets the headers and cache policy.

### 2. `CHANGELOG.md`

A single `## 1.0 — 2026-08-19` entry. It must mirror the eight highlights already
in `changelog.js` (read that file and keep them consistent — a test checks that
`changelog.js` matches the app version, and the two documents must not drift).

### 3. `design/hero-image-prompts.md`

Six Grok Imagine prompts, one per tier, for optional raster hero art at
`brand/hero-tier-1.jpg` … `hero-tier-6.jpg`, 16:9.

Head the file with a note that these are **optional**: the app renders SVG hero
banners (`HRL_SVG.tierHero`) and each tier's `heroImage` is currently `null`, so
adding art means dropping the file in *and* setting that tier's `heroImage` to
its path in `src/curriculum-data.js`.

Every prompt must specify: the palette (navy `#062448`, red `#a3301f`, cream
`#f6f3ec`); golden-hour or soft natural light, never harsh floodlight; **rear
views or silhouettes of youth players only — never identifiable faces**; empty
diamonds and gear still-lifes as safe alternatives; and clear space in the left
third for a cream/navy type overlay.

Match each prompt to its tier's theme. Read the six `tierHero` scene descriptions
in `svg.js` and keep the raster prompts consistent with what the SVG already
draws, so swapping one for the other is not a visual jolt.

### 4. `sw.js` — fix the precache list (**this is a live bug**)

`ASSETS` still lists `/practice.js` and `/src/drills-data.js`, which do not exist
in this project. `cache.addAll()` rejects atomically if **any** entry 404s, so the
service worker install currently fails and offline support does not work at all.

Replace `ASSETS` with the real file set. Read the actual `<script src>` and
`<link href>` tags in `index.html` and list every one, plus `/`, `/index.html`,
`/changelog.html`, `/styles.css`, `/manifest.json`, and the brand images the app
actually references (`/brand/crest.png`, `/brand/icon-180.png`, and any others
referenced from `index.html`).

**`/version.json` must NOT be in the list** — it is the freshness probe and must
always come from the network. Keep the existing comment saying so, the cache name
`homerun-learn-v1`, and the install/activate/fetch logic exactly as they are.

### 5. `feedback.js` — replace the categories

The `CATEGORIES` array still carries the Practice Planner's options ("Drill
library", "Plan builder or stations"). Replace with, keeping the same
`{ value, label }` shape and the leading `{ value: '', label: 'Choose one…' }`:

| value | label |
|---|---|
| `lesson` | Lesson content — wrong, unclear, or missing |
| `quiz` | A quiz question is wrong or unclear |
| `iq` | Baseball IQ test |
| `diagrams` | Diagrams and interactive exercises |
| `progress` | Progress, export, or import |
| `design` | Design & layout |
| `feature` | Feature request |
| `question` | Question / need help |
| `other` | Other |

Change nothing else in `feedback.js`.

## Acceptance

- All three documents exist and are complete — no TODOs, no placeholders, no
  invented chapter titles.
- `CHANGELOG.md` and `changelog.js` describe the same release.
- `sw.js` lists only files that exist, excludes `/version.json`, and keeps its
  cache name and event handlers unchanged.
- `feedback.js` has exactly the nine categories above plus the empty prompt.
- Nothing in `tests/`, `src/`, `index.html`, or `styles.css` is modified.

## Report back

1. The final `ASSETS` array, and confirmation that every entry exists on disk.
2. The nine feedback categories as written.
3. The chapter list you put in the README, and where you read the titles from.
4. Any deviation, and why.
