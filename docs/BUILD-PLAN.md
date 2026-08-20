# Homerun Learn to Play — Build Plan

**Project:** `homerun-learn-to-play`
**Org:** Homerun Baseball Ottawa (values-based youth baseball nonprofit, Ottawa ON)
**Status:** spec for `/build-grok` implementation
**Author:** planning session, 2026-08-19

---

## 1. What we are building

A **progressive, interactive baseball curriculum app** — a single-page, offline-capable
static web app that teaches baseball from "I have never seen a game" to
"I can read a scouting report and grade a swing on the 20–80 scale."

The app:

1. **Places the learner** with a short adaptive placement quiz (skill + role), then
   recommends a starting tier and a personalized path.
2. **Teaches through 24 chapters across 6 tiers**, each chapter built from short
   lesson sections with SVG diagrams, interactive widgets, and worked examples.
3. **Tests retention** with an end-of-chapter quiz (pass = 75%) plus a
   spaced-repetition review deck fed by every wrong answer.
4. **Measures Baseball IQ** with a standalone adaptive test drawn from a 300+
   question bank, scored on a 40–160 "BBIQ" scale with a per-topic breakdown.
5. **Tracks progress** in `localStorage` with export/import backup, badges, and streaks.

### Non-goals (explicitly out of scope)

- No backend, no accounts, no network calls at runtime (the update self-check reads
  `/version.json` and is the only fetch).
- No build step, no bundler, no framework, no npm runtime dependencies.
- No video. All motion is CSS/SVG animation.
- No youth photography beyond the approved brand assets already in `brand/`.

---

## 2. Architectural decisions (locked — do not revisit)

These match the three reference apps (`lineup-app`, `homerun-practice-app`,
`baseball-app`) so the family stays consistent and deploys the same way.

| Decision | Choice | Why |
|---|---|---|
| Stack | Vanilla HTML/CSS/JS, classic `<script>` tags | Matches all three siblings; works from `file://` and Netlify with zero build |
| Modules | **No ES modules.** Each file exposes one `window.HRL_*` namespace via IIFE | Same pattern as `homerun-practice-app`; avoids CORS failures on `file://` |
| Language level | ES5-safe syntax (`var`, `function`, no arrow/`let`/template literals in app files) | Consistency with siblings and maximum device tolerance. `sw.js` and `scripts/*.mjs` may use modern syntax (they already do) |
| State | `localStorage`, single namespaced key | Same as siblings |
| Styling | One `styles.css`, CSS custom properties for brand tokens | Same as siblings |
| Routing | Hash-free view switching in `shell.js` + `_redirects` SPA fallback | Already copied |
| Build | `npm run build` is a no-op echo; publish dir `.` | Netlify needs no build |
| Tests | Plain `node` scripts under `tests/`, zero dependencies, run by `npm test` | Same as siblings |

### Namespace convention

Every app file defines exactly one global, prefixed `HRL_` (Homerun Learn):

```
HRL_VERSION, HRL_VERSION_COMPAT, HRL_MODAL, HRL_FEEDBACK, HRL_APP_UPDATES,
HRL_CHANGELOG   ← already present (copied + renamed from homerun-practice-app)

HRL_SVG, HRL_PROGRESS, HRL_CURRICULUM, HRL_QUESTIONS, HRL_GLOSSARY,
HRL_QUIZ, HRL_IQ, HRL_PLACEMENT, HRL_INTERACTIVE, HRL_LEARN, HRL_SHELL  ← to build
```

Script load order in `index.html` is dependency order (data before engines,
engines before views). See §8.

---

## 3. Brand envelope (mandatory)

Source of truth: `/Users/jschasse/knowledge-base/homerun-ottawa/brand/brand-guidelines.md`.
Assets are **already copied** into `brand/` in this repo.

### Colour tokens — use these exact hex values, no others for brand chrome

```css
:root {
  --brand-navy:   #062448;  /* primary: app bar, body text on cream, navy fills */
  --brand-navy-2: #14294d;  /* hover / lighter navy panels */
  --brand-red:    #a3301f;  /* primary action, accents */
  --brand-red-2:  #8d2418;  /* red hover / pressed */
  --brand-cream:  #f6f3ec;  /* page, header, light surfaces */
  --brand-white:  #ffffff;  /* cards, crest interiors */
  --ink-muted:    #4a5568;  /* secondary text only */
}
```

**Teaching colours** (field diagrams only — these are *not* brand colours and must
never be swapped for brand colours):

```css
--teach-ball:    #dc2626;   --teach-base:    #facc15;   --teach-backup:  #16a34a;
--teach-unit-if: #0d9488;   --teach-unit-of: #ea580c;   --teach-battery: #374151;
```

Add derived surface tokens (`--color-bg`, `--color-surface`, `--color-border:#d8d3c6`,
`--color-text`, `--color-muted`) exactly as `homerun-practice-app/styles.css` does.

### Contrast rules (enforced)

- White text on navy or red only.
- Navy text on cream or white only.
- **Never** red text on navy at body sizes.
- **Never** cream text on red for paragraphs — short labels only.

### Typography

System stack, matching siblings:
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
Headlines bold navy. Sentence case in body, title case for chapter/program names.
No script fonts. No Google Fonts (offline requirement).

### Voice

Kid-appropriate, warm, plain, confident, never shouty or hype. Effort over talent.
Motto available for hero/empty states: *"Talent is what you have, effort is what you give."*
Values order is always **Effort → Respect → Team**.

### Brand assets available in `brand/`

`crest.png`, `wordmark.png`, `mark.png`, `icon-32.png`, `icon-180.png`, `icon-512.png`,
`crest-mono-cream.jpg`, `mark-filled.jpg`, `lockup-horizontal.jpg`,
`diamond-golden-hour.jpg`, `pattern-brand-tile.jpg`, `slide-navy-backdrop.jpg`,
`values-triad.jpg`, `roots-diagram.jpg`, `icon-effort.jpg`, `icon-respect.jpg`, `icon-team.jpg`.

**Logo rules:** crest gets clear space ≥ ½ its diameter; crest min 64px on screen;
wordmark min 28px tall. No stretching, recolouring, or drop shadows.

---

## 4. Visual & illustration strategy

> **Note on "generated images."** This planning session has no image-generation tool.
> The visual system is therefore built to be **complete and attractive without any
> raster generation**, using programmatic SVG plus the existing Grok-Imagine-generated
> brand assets. A prompt sheet is produced for optional later raster hero art, and the
> app must render correctly whether or not those files ever exist.

Three visual layers:

**Layer 1 — `svg.js` diagram library (primary).** Deterministic, brand-coloured,
theme-consistent inline SVG built in code. Every diagram is accessible
(`role="img"` + `<title>` + `<desc>`) and scales to container width. Required builders:

| Builder | Used by |
|---|---|
| `field(opts)` — diamond with configurable dimensions preset, optional labels, optional 9 position tokens, optional hotspot targets | Ch 2, 3, 11, 12, 13, 14, many questions |
| `strikeZone(opts)` — zone grid, pitch dots, called/swinging state | Ch 5, 19 |
| `basePaths(opts)` — runner arrows, force/tag shading, tag-up markers | Ch 7, 15 |
| `positionGrid()` — 1–9 numbering reference card | Ch 3 |
| `swingSequence()` — 5-frame stance→load→stride→contact→finish figure strip | Ch 9 |
| `throwSequence()` — grip, arm path, crow hop | Ch 10 |
| `countMatrix()` — 12 count states, hitter/pitcher leverage shading | Ch 5, 19 |
| `sprayChart(points)` — batted-ball distribution | Ch 21, 22 |
| `scaleGauge(value)` — 20–80 scouting scale dial | Ch 23 |
| `radar(topics)` — BBIQ per-topic breakdown | IQ result card |
| `bar(series)` / `timeline(items)` | Ch 22, roadmap views |

All builders return an SVG **string**; callers insert with `innerHTML` into a
container they own. Builders never touch the DOM or global state.

**Layer 2 — brand photography & illustration.** `diamond-golden-hour.jpg` for the
home hero, `pattern-brand-tile.jpg` as subtle section texture, `values-triad.jpg` and
`roots-diagram.jpg` in the values/ethos chapter section, value icons on badge cards.

**Layer 3 — optional raster hero art.** Write `design/hero-image-prompts.md`
containing one Grok Imagine prompt per tier (6 prompts), each specifying the brand
palette, golden-hour mood, rear/silhouette youth figures (never identifiable faces),
and room for a cream/navy type overlay. Chapter hero rendering must **fall back to an
SVG scene** when `brand/hero-tier-N.jpg` is absent — never a broken image icon.
Detect with an `onerror` handler that swaps in the SVG fallback.

---

## 5. Curriculum — 6 tiers, 24 chapters

Content is authored **from the Youth Baseball Canada knowledge base** at
`/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/` — 63 concept pages,
8 skill-roadmap syntheses, 370 drills. Read the listed source pages for each chapter
and write lesson prose from them; do not invent rules or numbers. Where a rule varies
by division or pathway (Little League vs Baseball Canada), say so explicitly — the KB
concept pages already document these splits.

Tier names, in order:

| # | Tier key | Tier name | Learner |
|---|---|---|---|
| 1 | `rookie` | **Rookie** | Never watched a game |
| 2 | `sandlot` | **Sandlot** | Knows the object of the game; first season |
| 3 | `diamond` | **Diamond** | Rec/house-league player, or a parent coaching one |
| 4 | `select` | **Select** | Competitive travel/select player or coach |
| 5 | `elite` | **Elite** | High-school / U18 player, experienced coach |
| 6 | `promind` | **Pro Mind** | Scout, analyst, quasi-professional understanding |

### Chapter list

**Tier 1 — Rookie**

| # | Chapter | Core content | KB sources |
|---|---|---|---|
| 1 | What Baseball Is | Object of the game, run, out, inning, the half-inning flip, why 3 outs and 9 innings, winning | — (foundational) |
| 2 | The Field | Diamond anatomy, 90/60ft variants, foul lines, fair/foul, infield vs outfield, mound, plate, dugouts | `field-dimensions-by-division` |
| 3 | The Nine Positions | Each position's job, the 1–9 numbering, why the numbering matters for scoring | `defensive-positioning`, `infield-play`, `outfield-play` |
| 4 | Gear, Safety & the Homerun Way | Bat standards, glove, helmet, catcher's gear, hydration & heat, concussion basics, Effort·Respect·Team + ROOTS | `equipment-safety-rules`, `bat-standards`, `heat-and-hydration`, `concussion-protocol`, `safe-sport` |

**Tier 2 — Sandlot**

| # | Chapter | Core content | KB sources |
|---|---|---|---|
| 5 | Balls, Strikes & the Count | Strike zone geometry, called vs swinging, foul-ball rules, the 12 counts, walk, strikeout | `strike-zone-and-ball-strike-calls` |
| 6 | Getting On, Getting Out | Single/double/triple/HR, walk, HBP, error, fielder's choice; strikeout, groundout, flyout, force out, tag out | — + `dropped-third-strike` (preview) |
| 7 | Running the Bases | Force vs tag, tagging up, overrunning first, running lane, base-to-base reads, sliding safely | `baserunning-fundamentals`, `sliding`, `tagging-up-and-reads` |
| 8 | How a Game Is Played & Won | Half-innings, batting order, line score, mercy rules, extra innings, division game lengths | `mercy-run-rules`, `age-divisions`, `grassroots-divisions` |

**Tier 3 — Diamond**

| # | Chapter | Core content | KB sources |
|---|---|---|---|
| 9 | Hitting Fundamentals | Stance, grip, load, stride, bat path, contact point, finish; tee → soft toss → live progression; what NOT to teach by age | `hitting-mechanics`, `tee-and-soft-toss-progressions`, `syntheses/skill-roadmap-hitting` |
| 10 | Throwing & Catching | Four-seam grip, arm path, glove-side action, receiving, arm care, throwing programme, red flags | `throwing-mechanics`, `catching`, `arm-care-and-injury-prevention`, `syntheses/skill-roadmap-throwing` |
| 11 | Playing the Infield | Ready position, fielding triangle, footwork through the ball, exchange, feeds, turning two, first-base footwork | `infield-play`, `infield-drills`, `syntheses/skill-roadmap-fielding-infield` |
| 12 | Outfield & Pitching Basics | Drop step, routes, crow hop, communication; pitching mechanics chain, pitch types by age, pitch-count limits and rest | `outfield-play`, `pitching-mechanics`, `pitch-types-by-age`, `pitch-count-rules` |

**Tier 4 — Select**

| # | Chapter | Core content | KB sources |
|---|---|---|---|
| 13 | Defensive Positioning | Standard, infield in, double-play depth, bunt defence, no-doubles, corners in; who covers on a steal | `defensive-positioning`, `defensive-strategy` |
| 14 | Cutoffs, Relays & Backups | The **ball / base / backup** principle: every fielder has a job on every ball; cut positions by hit location; backup responsibilities | `cutoffs-and-relays` |
| 15 | Baserunning IQ | Leadoffs, primary/secondary, stealing reads, delayed steal, first-and-third offence and defence, reading the OF | `base-stealing-and-leadoffs`, `first-and-third-situations`, `tagging-up-and-reads`, `base-coaching-duties` |
| 16 | Bunting & Small Ball | Sacrifice, drag, push, squeeze, slash; when small ball is right; offensive strategy by score/inning | `bunting`, `offensive-strategy` |

**Tier 5 — Elite**

| # | Chapter | Core content | KB sources |
|---|---|---|---|
| 17 | The Tricky Rules | Infield fly (all four conditions + division applicability), dropped third strike, balks, interference vs obstruction, appeal plays | `infield-fly-rule`, `dropped-third-strike`, `balk-rules`, `interference-and-obstruction` |
| 18 | Pitching Strategy | Sequencing, changing eyes/levels, holding runners, pickoff moves, mound visits and their rules, game-calling from behind the plate | `pitching-approach-and-strategy`, `holding-runners-and-pickoffs`, `pitching-rules-and-mound-visits`, `catcher-game-calling` |
| 19 | Hitting Approach | Count leverage, hunting zones, two-strike approach, situational hitting, plate discipline vs passivity | `hitting-approach-and-plate-discipline`, `two-strike-approach` |
| 20 | Managing the Game | Lineup construction, mandatory play & substitution rules, sign systems, coach–umpire interaction, in-game decisions, multi-age teams | `lineup-construction`, `mandatory-play-and-substitution`, `sign-systems-and-communication`, `coach-umpire-interaction`, `game-management`, `managing-multi-age-teams` |

**Tier 6 — Pro Mind**

| # | Chapter | Core content | KB sources |
|---|---|---|---|
| 21 | Reading the Game | Scorekeeping notation, position numbers in action (6-4-3), box score literacy, line score, what a scorer records vs an error | (builds on Ch 3) |
| 22 | Analytics Foundations | AVG/OBP/SLG/OPS, BABIP, wOBA, wRC+, ERA vs FIP, WHIP, WAR — what each answers, what each hides, sample-size honesty | — (define carefully, no invented figures) |
| 23 | Scouting & Player Development | Five tools, the 20–80 scale, pitch metrics (velocity, spin, induced vertical break), projection vs performance, LTAD stages, Canadian pathways | `player-evaluation-and-tryouts`, `ltad-model`, `pathways-overview`, `age-appropriate-skill-progression`, `coaching-certification` |
| 24 | The Rulebook's Edges | Batting out of order, appeal plays, courtesy runners, rundown responsibilities, ground rules, obstruction types A/B, protests | `courtesy-runner-rules`, `rundowns-and-pickoffs`, `balk-rules`, `interference-and-obstruction` |

### Chapter data shape

`src/curriculum-data.js` defines `window.HRL_CURRICULUM` with:

```js
{
  tiers: [ { key, name, order, blurb, colorAccent, heroImage, heroFallback } ],
  chapters: [
    {
      id: 'ch01',
      tier: 'rookie',
      order: 1,
      title: 'What Baseball Is',
      subtitle: 'The object of the game in five minutes',
      minutes: 6,                       // estimated read time
      objectives: ['…', '…', '…'],      // 3–5 "after this chapter you can…"
      sections: [
        { type: 'prose',       heading: '…', body: ['para', 'para'] },
        { type: 'diagram',     heading: '…', svg: 'field', opts: {…}, caption: '…' },
        { type: 'keypoints',   heading: '…', items: ['…'] },
        { type: 'interactive', heading: '…', widget: 'labelTheField', opts: {…} },
        { type: 'example',     heading: '…', body: ['…'] },      // worked scenario
        { type: 'coachnote',   heading: '…', body: ['…'] },      // aside, cream card
        { type: 'divisionnote',heading: '…', rows: [[div, rule]] }, // LL vs Baseball Canada
        { type: 'terms',       items: ['force-out', 'tag-up'] }  // glossary refs
      ],
      quizIds: ['q0101', …],            // 6–8 question ids
      prev: null, next: 'ch02'
    }
  ]
}
```

Rules for content authoring:

- Each chapter has **8–14 sections**, at least **2 diagram sections** and **1 interactive**.
- Prose paragraphs: 2–4 sentences each. Reading level scales with tier — Tier 1 targets
  a 10-year-old, Tier 6 targets an adult analyst.
- Every rule statement that varies by division gets a `divisionnote`.
- Every chapter ends with a `keypoints` recap before the quiz.
- Terms introduced are registered in `src/glossary-data.js` and rendered as
  dotted-underline buttons that open a glossary popover.

---

## 6. Assessment system

### 6.1 Question bank — `src/questions-data.js`

Target **300+ questions** (minimum 288 = 12 per chapter), exposing `window.HRL_QUESTIONS`.

```js
{
  id: 'q1701',
  chapter: 'ch17',
  tier: 'elite',
  topic: 'rules',          // rules | field | positions | hitting | pitching |
                           // fielding | baserunning | strategy | safety |
                           // scoring | analytics | scouting
  difficulty: 7,           // 1–10, used by the adaptive engines
  type: 'mc',              // mc | tf | scenario | hotspot | order
  prompt: '…',
  // mc/tf/scenario:
  choices: ['…','…','…','…'],
  answer: 2,               // index into choices
  // hotspot:
  diagram: { svg: 'field', opts: {…} },
  targets: ['ss'],         // hotspot ids the diagram exposes
  // order:
  items: ['…','…','…'],    // correct order as authored; presented shuffled
  explain: 'One or two sentences on WHY, referencing the chapter.',
  source: 'infield-fly-rule'   // KB slug, for provenance
}
```

Distribution requirement (enforced by a test):

- ≥ 12 questions per chapter (288 minimum), ≥ 45 per tier.
- Every `topic` has ≥ 15 questions.
- Difficulty spread per tier centred on tier order: tier N mean difficulty ≈ `1.6*N`.
- No duplicate `id`; every `chapter` resolves to a real chapter; every `answer` in range.

### 6.2 Chapter quiz — `quiz.js` (`HRL_QUIZ`)

- Pulls `quizIds` for the chapter, shuffles question order and MC choice order
  (tracking the moved answer index — this is a classic bug source; test it).
- One question per screen, immediate feedback with `explain`, progress dots.
- Pass = **75%**. Passing marks the chapter complete and awards its badge.
- Every wrong answer is pushed to the **review deck** with a spaced-repetition
  schedule (Leitner boxes: due in 1, 3, 7, 16, 35 days; correct promotes a box,
  wrong resets to box 1). Review deck is its own view with a due count.
- Retake allowed unlimited; best score retained.

### 6.3 Placement quiz — `placement.js` (`HRL_PLACEMENT`)

Two parts:

1. **Self-report (3 questions):** role (player / parent / coach / fan-new-to-the-game),
   playing experience (never / one season / a few years / many years / played at a high level),
   goal (understand a game I'm watching / play better / coach a team / go deeper on strategy & analytics).
2. **Adaptive probe (8 questions):** start at difficulty 4. Correct → next question
   difficulty +1.5; wrong → −2. Clamp 1–10. Pick the nearest unused question at the
   target difficulty across all tiers.

**Placement rule:** final ability estimate `θ` = mean difficulty of the hardest 3
correctly answered questions (0 if none). Blend with self-report:

```
tierScore = 0.65 * (θ / 1.6) + 0.35 * selfReportTier
recommendedTier = clamp(round(tierScore), 1, 6)
```

Coaches are floored at tier 3 (they need the mechanics chapters regardless of
personal playing history). Everything remains unlocked and browsable — placement
sets the *recommended path*, highlights the starting chapter, and marks earlier tiers
as "skim or skip." Never hard-lock content.

Placement is offered on first run, skippable ("Start from the very beginning"),
and re-runnable any time from Settings.

### 6.4 Baseball IQ test — `iq.js` (`HRL_IQ`)

- **20 adaptive questions** drawn across all tiers and forced to cover ≥ 8 topics.
- Same adaptive step logic as placement, starting at difficulty 5, but with no
  immediate feedback — feedback comes at the end.
- Optional per-question timer (45s) with a "relaxed mode" toggle that disables it.
- **BBIQ score** on a 40–160 scale:

  ```
  raw   = Σ(correct question difficulty) / Σ(all presented difficulty)   // 0..1
  bbiq  = round(40 + 120 * raw)
  ```

  Bands: <70 Rookie · 70–89 Sandlot · 90–109 Diamond · 110–124 Select ·
  125–139 Elite · 140+ Pro Mind.
- **Result card:** score, band, radar chart of per-topic accuracy (`HRL_SVG.radar`),
  three strongest and three weakest topics with links to the chapters that cover them,
  and a full answer review with explanations.
- History of past attempts is stored and charted (score over time).

---

## 7. Progress, storage & backup — `progress.js` (`HRL_PROGRESS`)

Single localStorage key: `homerun-learn/progress/v1` (already wired into
`appUpdates.js` as `STATE_KEY`).

```js
{
  version: '1.0',            // DATA_VERSION from HRL_VERSION
  placement: { done, recommendedTier, role, goal, theta, takenAt },
  chapters: { ch01: { visited, completed, bestScore, attempts, completedAt } },
  badges:   ['ch01', 'tier-rookie', 'iq-first', 'streak-7'],
  review:   [ { qid, box, dueAt, lastResult } ],
  iq:       { attempts: [ { takenAt, bbiq, band, byTopic: {…} } ], best },
  streak:   { current, longest, lastActiveDay },
  settings: { timerEnabled, reducedMotion, textSize }
}
```

- Export → `homerun-learn-progress-YYYY-MM-DD.json` wrapped in the standard envelope
  (`{ app, appVersion, dataVersion, exportedAt, data }`) so `versionCompat.js` handles it.
- Import validates through `HRL_VERSION_COMPAT.prepareImport()` (already present) and
  **merges** — higher `bestScore` wins, `completed` is sticky-true, review entries
  merge by `qid` keeping the later `dueAt`, IQ attempts concatenate and dedupe by `takenAt`.
- All storage access wrapped in try/catch (Safari private mode throws) — the app must
  degrade to session-only memory, showing a one-time dismissible warning, never crash.
- Badges: one per chapter, one per completed tier, `iq-first`, `iq-elite` (BBIQ ≥ 125),
  `perfect-quiz`, streak badges at 3/7/30 days. Badge art uses the brand value icons
  and a navy/cream/red SVG rosette.

---

## 8. Views & file inventory

### Views (in `index.html`, switched by `shell.js`)

| View id | Nav label | Contents |
|---|---|---|
| `view-home` | Home | Hero (`diamond-golden-hour.jpg` + crest + motto), continue-where-you-left-off card, tier progress rail, placement CTA, quick links to IQ test & review deck |
| `view-path` | My Path | 6 tier accordion with 24 chapter cards (status: locked-recommendation/visited/complete + best score), progress ring per tier |
| `view-chapter` | *(entered from Path)* | Chapter reader: objectives, sections, prev/next, "Take the chapter quiz" CTA, progress bar |
| `view-quiz` | *(entered from chapter)* | Quiz runner + results screen |
| `view-iq` | Baseball IQ | Test intro, runner, result card + history |
| `view-review` | Review | Spaced-repetition deck, due count, session runner |
| `view-glossary` | Glossary | A–Z searchable terms with diagrams where useful |
| `view-help` | Help & Guide | How the app works, how progress is stored, export/import, feedback button, version footer, changelog link |

Nav bar: Home · My Path · Baseball IQ · Review · Glossary · Help (Help uses the
cream `nav-btn-readme` treatment, same as siblings). Mobile: nav wraps; sticky app bar.

### Files to create

```
index.html                  SPA shell, all eight views, script tags in dependency order
styles.css                  brand tokens + all component styles + print + a11y
manifest.json               PWA manifest (name "Homerun Learn to Play", theme #062448)
package.json                name/scripts/engines, mirroring homerun-practice-app
README.md                   what it is, how to run, how to deploy, content provenance
CHANGELOG.md                1.0 entry
version.json                { "version": "1.0", "released": "2026-08-19" }

src/curriculum-data.js      HRL_CURRICULUM  — 24 chapters (largest file; may split
                            into src/curriculum-t1t2.js … if it exceeds ~3000 lines)
src/questions-data.js       HRL_QUESTIONS   — 300+ questions
src/glossary-data.js        HRL_GLOSSARY    — ~120 terms

svg.js                      HRL_SVG         — diagram builders (§4 layer 1)
progress.js                 HRL_PROGRESS    — storage, badges, streak, export/import
interactive.js              HRL_INTERACTIVE — widget registry (§9)
quiz.js                     HRL_QUIZ        — chapter quiz + review deck engine
iq.js                       HRL_IQ          — adaptive IQ test + BBIQ scoring
placement.js                HRL_PLACEMENT   — onboarding placement
learn.js                    HRL_LEARN       — chapter reader / section renderer / path view
shell.js                    HRL_SHELL       — nav, view switching, first-run routing

design/hero-image-prompts.md  6 Grok Imagine prompts for optional tier hero art

tests/versionCompat.test.js   (already copied — update app name strings)
tests/curriculum.test.js      structure + cross-reference integrity
tests/questions.test.js       bank distribution, answer validity, no duplicates
tests/quiz.test.js            shuffle-preserves-answer, scoring, Leitner scheduling
tests/placement.test.js       adaptive step, tier mapping, coach floor
tests/iq.test.js              BBIQ scoring bounds and band mapping
tests/progress.test.js        merge semantics on import
tests/syntax.test.js          node --check equivalent over every .js file
```

### Already present (do not recreate — adapt only)

`uiModal.js` (`HRL_MODAL`), `feedback.js` (`HRL_FEEDBACK`), `appUpdates.js`
(`HRL_APP_UPDATES`), `versionCompat.js` (`HRL_VERSION_COMPAT`), `version.js`
(`HRL_VERSION`), `changelog.js` + `changelog.html` (`HRL_CHANGELOG`), `sw.js`,
`netlify.toml`, `_redirects`, `deploy.sh`, `.gitignore`, and all of `brand/`.

Adaptations needed:
- `feedback.js`: replace the drill/plan categories with learn-app categories
  (Lesson content · Quiz question wrong or unclear · Baseball IQ test · Diagrams ·
  Progress/backup · Design & layout · Feature request · Question · Other).
- `sw.js`: update the `ASSETS` precache list to the real file set (and keep
  `/version.json` **out** of it).
- `changelog.js`: seed the 1.0 entry.
- `tests/versionCompat.test.js`: update app-name strings.

---

## 9. Interactive widgets — `interactive.js`

Registry keyed by widget name; each entry is `{ mount(container, opts, onComplete) }`.
Widgets are self-contained, keyboard-operable, and report completion so the chapter
can mark the section done.

| Widget | Chapter | Behaviour |
|---|---|---|
| `labelTheField` | 2 | Drag/tap labels onto diamond parts; check answers; reveal |
| `placeThePositions` | 3 | Drag nine position tokens to their spots; snap + validate |
| `strikeZoneTrainer` | 5 | Pitches appear as dots; user calls ball/strike; running accuracy |
| `countBuilder` | 5 | Click balls/strikes to walk through count states; shows outcome |
| `safeOrOut` | 6, 7 | Scenario cards; sort into Safe / Out with explanation on flip |
| `runnerAdvance` | 7 | Animated base paths; user predicts where each runner ends up |
| `swingOrder` | 9 | Drag the five swing frames into sequence |
| `armCareCheck` | 10 | Pitch-count/rest calculator against the division limits |
| `assignTheNine` | 14 | **Centrepiece.** Choose hit type + location + runners; user assigns each fielder ball / base / backup; engine scores the assignment. Simplified port of the `baseball-app` ball-base-backup logic — reference `/Users/jschasse/Documents/JS Chassé/Projects/baseball-app/js/engine.js` for the rules, but implement a small deterministic lookup table, **not** a port of the full 1600-line engine |
| `stealRead` | 15 | Pitcher move clips (SVG animation); user calls go / hold / balk |
| `makeTheCall` | 17, 24 | Rules scenario; pick the ruling; full explanation with rulebook basis and division applicability |
| `sequencePitches` | 18 | Build a 3-pitch sequence for a given hitter profile; feedback on eye/level changes |
| `scoreThePlay` | 21 | Given a play description, produce the scorekeeping notation (6-4-3, E5, FC) |
| `statMatch` | 22 | Match each stat to the question it answers; trap answers for common misreadings |
| `gradeTheTool` | 23 | Given a tool description, place it on the 20–80 gauge |

Widgets must work with mouse, touch, **and** keyboard (arrow keys + Enter for
drag-substitutes). Honour `prefers-reduced-motion` and the in-app `reducedMotion` setting.

---

## 10. Accessibility & responsiveness (acceptance-gated)

- Semantic landmarks: `header`/`nav`/`main`/`footer`; one `h1` per view; heading levels
  never skip. Skip link (already in the sibling markup pattern).
- All interactive controls are real `<button>`/`<a>`/`<input>` with visible focus rings
  (`outline: 2px solid var(--brand-red)`, 2px offset — visible on both cream and navy).
- Quiz state changes announced via `aria-live="polite"`.
- All SVG diagrams: `role="img"`, `<title>`, `<desc>`; hotspots are `<button>` overlays,
  not bare `<path onclick>`.
- Colour is never the sole carrier of meaning — ball/base/backup also get letter glyphs
  (B / ▲ / ⌂) and text labels.
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI borders.
- Touch targets ≥ 44×44 px.
- Breakpoints: single column < 768px; two-column path/chapter layout ≥ 768px;
  max content width 1100px. Test at 360, 414, 768, 1024, 1440.
- `prefers-reduced-motion: reduce` disables all transitions/animations.
- Print stylesheet: chapter view prints cleanly (nav hidden, diagrams sized, page breaks
  between sections) so a coach can hand out a chapter.

---

## 11. Testing & "no bugs" acceptance criteria

Every item below must be **verified by running the command**, not asserted.

### Automated (`npm test` runs all of `tests/*.test.js`)

1. **Syntax:** `node --check` passes on every `.js` file in the repo root, `src/`, and `tests/`.
2. **Curriculum integrity:** 6 tiers; 24 chapters; every `chapter.tier` resolves;
   `order` values are 1..24 with no gaps; `prev`/`next` form one unbroken chain;
   every `section.type` is a known type; every `section.svg` names a real `HRL_SVG`
   builder; every `section.widget` names a registered widget; every `terms` entry
   resolves in the glossary; every chapter has ≥ 8 sections, ≥ 2 diagrams, ≥ 1 interactive,
   ≥ 3 objectives, and 6–8 `quizIds`.
3. **Question bank:** ≥ 288 questions; unique ids; every `chapter` resolves; every
   `answer` index within `choices`; every question has a non-empty `explain`;
   ≥ 12 per chapter; ≥ 45 per tier; ≥ 15 per topic; difficulty within 1–10;
   every `type` handled by the quiz renderer.
4. **Quiz engine:** shuffling `choices` moves `answer` correctly (property test over
   200 randomized runs); scoring is exact; 75% threshold inclusive at exactly 75%;
   Leitner scheduling produces the documented intervals and resets to box 1 on a miss.
5. **Placement:** adaptive step clamps at 1 and 10; the tier formula produces 1..6 for
   all inputs; the coach floor holds; a skipped placement yields tier 1.
6. **IQ scoring:** BBIQ is always 40..160 inclusive (including the all-wrong and
   all-right edges and the zero-difficulty guard — no divide-by-zero); band boundaries
   map exactly as documented.
7. **Progress merge:** import merge keeps the higher `bestScore`, sticky `completed`,
   later `dueAt`, deduped IQ attempts; malformed/foreign JSON is rejected with a clear
   message, never throwing.
8. **Version compat:** existing `tests/versionCompat.test.js` passes.

### Manual verification (reviewer runs these and reports evidence)

9. `npx serve . --listen 3000` → load in a browser: **zero console errors or warnings**
   on first load, after placement, on every one of the 24 chapters, during a full quiz,
   during a full IQ test, and after export/import.
10. Every one of the 24 chapters renders end-to-end with no missing diagram, no broken
    image, and no `undefined`/`[object Object]` in the DOM.
11. Every interactive widget completes successfully with mouse and with keyboard only.
12. Opening `index.html` directly from `file://` works (no ES-module/CORS errors).
13. Reload preserves progress; export → clear storage → import restores it exactly.
14. Responsive check at 360 / 768 / 1440 px with no horizontal body scroll.
15. Service worker registers, and a second load works with the network disabled.

**Definition of done:** all 15 pass. Anything failing is fixed, not documented as a
known issue.

---

## 12. Deployment — GitHub → Netlify

Repo is already `git init`-ed on `main` with the scaffold in place.

1. Commit everything.
2. Create the GitHub repo and push:
   ```
   gh repo create chassejs/homerun-learn-to-play --public --source=. --remote=origin --push
   ```
   (`gh` is authenticated as `chassejs`; siblings live under the same owner.)
3. Link and deploy on Netlify:
   ```
   netlify sites:create --name homerun-learn-to-play
   netlify link --name homerun-learn-to-play
   netlify deploy --prod --dir .
   ```
   Build command: **empty**. Publish directory: `.` (already set in `netlify.toml`).
4. Connect the Netlify site to the GitHub repo so pushes to `main` auto-deploy.
5. Verify the live URL: load it, run one chapter and one quiz, confirm zero console
   errors, and confirm `version.json` is served with `Cache-Control: no-store`.

`netlify.toml` (already copied) sets `publish = "."`, security headers, and the
must-revalidate cache policy for `*.js` / `*.css` plus `no-store` for `version.json`.

---

## 13. Implementation sequencing for Grok

Grok's headless shell tool is unreliable (see the `/build-grok` skill notes), so
**assume shell-free**: Grok uses Read/Write/Edit only, and the reviewer (Claude) runs
every check. All directory scaffolding, asset copying, and `git init` are **already done**.

Chunk the build into sequential `--continue` turns, each ending with Grok reporting the
exact identifiers it defined so the next brief can reference them precisely:

| Chunk | Deliverable |
|---|---|
| 1 | `styles.css` (full design system), `index.html` (shell + all eight view containers, script tags in dependency order), `manifest.json`, `package.json`, `version.json` |
| 2 | `svg.js` — all diagram builders, with a documented list of exported builder names, options, and hotspot ids |
| 3 | `progress.js` + `shell.js` — storage, badges, streak, export/import, nav, first-run routing |
| 4 | `src/curriculum-data.js` tiers 1–3 (chapters 1–12), read from the KB concept pages |
| 5 | `src/curriculum-data.js` tiers 4–6 (chapters 13–24) + `src/glossary-data.js` |
| 6 | `src/questions-data.js` — 300+ questions across all 24 chapters |
| 7 | `quiz.js`, `iq.js`, `placement.js` — assessment engines |
| 8 | `learn.js`, `interactive.js` — chapter reader + all 16 widgets |
| 9 | `tests/*.test.js`, `README.md`, `CHANGELOG.md`, `design/hero-image-prompts.md`, `sw.js` asset list, `feedback.js` categories |

After each chunk the reviewer runs `node --check` on the new files (and `npm test` from
chunk 9 on), fixing or re-briefing before moving to the next chunk.

---

## 14. Risks & mitigations

| Risk | Mitigation |
|---|---|
| `src/curriculum-data.js` grows too large for one turn | Split into `curriculum-t1.js` … `curriculum-t6.js`, each pushing onto `HRL_CURRICULUM.chapters`; load order enforced in `index.html` |
| Content accuracy drift on rules | Every rule statement cites a KB slug in `source`; reviewer spot-checks the tricky-rules chapter (17) and edge-cases chapter (24) against the KB pages line by line |
| Shuffled-choice answer-index bug | Explicit property test (criterion 4) — this is the single most likely correctness bug in the build |
| Storage throws in Safari private mode | All access try/caught; degrade to in-memory with a one-time notice |
| Missing raster hero art | SVG fallback required; `onerror` swap; app never shows a broken image |
| Question bank too shallow to feel adaptive | Enforced distribution test (criterion 3) before the engines are wired |
| Division-specific rules stated as universal | `divisionnote` section type is mandatory wherever the KB documents a split |
