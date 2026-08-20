# Implementer Brief — Chunk 4a — curriculum skeleton + Tier 1 (chapters 1–4)

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command —
not `ls`, not `node --check`, not `git`, not `npm`. A shell call silently
cancels this turn. The reviewer runs every check afterward.

## Context

**Homerun Learn to Play** — a progressive baseball curriculum app for Homerun
Baseball Ottawa. Authoritative spec: `docs/BUILD-PLAN.md` — **read §5
(Curriculum) in full before writing.**

Already on disk (read what you need): `index.html`, `styles.css`, `svg.js`
(`HRL_SVG`), `progress.js` (`HRL_PROGRESS`), `shell.js` (`HRL_SHELL`).

**Read `svg.js` first** and use its *actual* builder names and option names when
you write `diagram` sections — the curriculum names builders by string, and a
name that does not exist will fail the integrity test.

This chunk delivers **three files**:
1. `src/curriculum-data.js` — the skeleton: tier definitions, the `HRL_CURRICULUM`
   object, the `register()` helper, and lookup helpers.
2. `src/curriculum-t1.js` — chapters 1–4 (Tier 1, Rookie).
3. `src/questions-data.js` — the question-bank skeleton (see the last section
   of this brief). No questions yet; later chunks register them.

Later chunks add `src/curriculum-t2.js` … `src/curriculum-t6.js` and
`src/questions-t1.js` … `src/questions-t6.js` the same way.

## Coding standards

- One IIFE per file. `'use strict';`. House banner comment at the top.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, `Object.assign`.
- Node-loadable (tests require it):
  ```js
  var root = typeof window !== 'undefined' ? window : this;
  ```
  …assign to `root.HRL_CURRICULUM`, and end each file with
  ```js
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.HRL_CURRICULUM; }
  ```
  The tier files must work when loaded after the skeleton in the same Node process.
- Prose lives in plain JS strings. Use the HTML entity or the literal character
  for typographic punctuation (’ “ ” — …) directly; the renderer escapes nothing,
  so **do not put raw HTML tags in prose strings** — the renderer treats prose as
  text. The one exception is the `terms` mechanism described below.

## `src/curriculum-data.js` — the skeleton

```js
root.HRL_CURRICULUM = {
  tiers: [ /* six tier objects, see below */ ],
  chapters: [],                       // filled by the tier files
  register: function (arr) { /* push each chapter, keep sorted by order */ },
  getChapter: function (id) { /* by id, or null */ },
  getTier: function (key) { /* by key, or null */ },
  chaptersInTier: function (key) { /* array, in order */ },
  firstChapterOfTier: function (key),
  chapterIndex: function (id),        // 0-based position in the ordered list
  totalChapters: function ()
};
```

`register()` must be idempotent-safe (re-registering the same id replaces rather
than duplicates) and must keep `chapters` sorted ascending by `order`.

### The six tiers — use these exact keys, names, and order

| order | key | name | blurb (write one clear sentence each) |
|---|---|---|---|
| 1 | `rookie` | Rookie | For someone who has never watched a game. |
| 2 | `sandlot` | Sandlot | The rules of play, for a first-season player or parent. |
| 3 | `diamond` | Diamond | How to actually play each position. |
| 4 | `select` | Select | Situations, systems, and team defence. |
| 5 | `elite` | Elite | The rulebook's hard parts and game management. |
| 6 | `promind` | Pro Mind | Scoring, analytics, scouting, and the rulebook's edges. |

Each tier object: `{ order, key, name, blurb, colorVar, heroImage, heroFallback }`
where `colorVar` is the CSS custom property name from `styles.css`
(`'--tier-rookie'` … `'--tier-promind'` — **read `styles.css` to confirm the exact
names**), `heroImage` is `'brand/hero-tier-1.jpg'` … `'brand/hero-tier-6.jpg'`
(these files do **not** exist yet — that is intentional), and `heroFallback` is
the name of an `HRL_SVG` builder plus options to render instead when the image
fails to load, e.g. `{ svg: 'field', opts: { labels: true, zones: true } }`.

## Chapter object shape (exact)

```js
{
  id: 'ch01',                 // 'ch01'..'ch24', zero-padded
  tier: 'rookie',
  order: 1,                   // 1..24 globally
  title: 'What Baseball Is',
  subtitle: 'The object of the game in five minutes',
  minutes: 6,                 // realistic estimated read time
  objectives: [ '…', '…', '…' ],        // 3–5, each starting with a verb,
                                        // phrased "After this chapter you can …"
  sections: [ /* 8–14 section objects */ ],
  quizIds: [ 'q0101', 'q0102', 'q0103', 'q0104', 'q0105', 'q0106' ],  // 6–8 ids
  prev: null,                 // previous chapter id, null for ch01
  next: 'ch02'                // next chapter id, null for ch24
}
```

`quizIds` follow the pattern `q<chapterNumber2digit><questionIndex2digit>` —
chapter 1's are `q0101`…`q0106`. **Chunk 6 will author the matching questions
with exactly these ids**, so allocate them contiguously starting at 01.

## Section types (exact — the renderer handles only these)

| `type` | Fields | Renders as |
|---|---|---|
| `prose` | `heading` (optional), `body: [String]` | Paragraphs |
| `diagram` | `heading`, `svg` (builder name), `opts` (object), `caption` | An `HRL_SVG` diagram with a caption |
| `keypoints` | `heading`, `items: [String]` | A checked list |
| `interactive` | `heading`, `widget` (widget name), `opts`, `intro` (optional) | A mounted widget |
| `example` | `heading`, `body: [String]` | A worked-scenario box |
| `coachnote` | `heading`, `body: [String]` | A cream aside for coaches/parents |
| `divisionnote` | `heading`, `intro` (optional), `columns: [String]`, `rows: [[String]]` | A table of how a rule differs by division |
| `terms` | `items: [String]` | A row of glossary term buttons |
| `compare` | `heading`, `left: {title, items}`, `right: {title, items}` | Two-column contrast |
| `steps` | `heading`, `items: [{title, body}]` | A numbered progression |

Per-chapter minimums, enforced by an automated test: **≥8 sections, ≥2 `diagram`
sections, ≥1 `interactive` section, 3–5 objectives, 6–8 `quizIds`**, and the
**last section before the quiz must be a `keypoints` recap.**

### Widget names available (Chunk 8 builds these — use only these strings)

`labelTheField`, `placeThePositions`, `strikeZoneTrainer`, `countBuilder`,
`safeOrOut`, `runnerAdvance`, `swingOrder`, `armCareCheck`, `assignTheNine`,
`stealRead`, `makeTheCall`, `sequencePitches`, `scoreThePlay`, `statMatch`,
`gradeTheTool`, `spotTheAlignment`.

For Tier 1 use only: `labelTheField` (ch2), `placeThePositions` (ch3), and
`safeOrOut` (ch1 — a gentle "did that score a run?" variant; pass
`opts.mode: 'run-scored'`). Chapter 4 uses `makeTheCall` with
`opts.mode: 'safety'` for equipment/safety scenarios.

Every `interactive` section's `opts` must include a `cases` or `items` array
holding the actual content the widget presents — the widgets are generic engines
and the data lives here. Define the content fully; do not leave a widget with an
empty case list.

### Glossary terms

Any `terms` section lists term **slugs** (kebab-case, e.g. `'force-out'`,
`'tag-up'`, `'foul-territory'`). Chunk 5 writes `src/glossary-data.js`. **Keep a
running list of every slug you use and report it back** — Chunk 5 must define
each one, and an automated test fails on any unresolved slug.

## Content sourcing — mandatory

Write every factual statement from the Youth Baseball Canada knowledge base at
`/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`. **Read the pages
listed per chapter below before writing that chapter.** Do not invent rules,
distances, age cutoffs, or pitch-count limits. Where a rule differs between the
Little League and Baseball Canada pathways, say so in a `divisionnote` with the
real values from the KB.

## Voice and level for Tier 1

Writing for someone who has **never watched a game** — including a parent who
just signed a child up. Aim at a bright 10-year-old reader: short sentences,
concrete images, no jargon before it is defined, no assumed knowledge. Warm and
plain, never condescending and never hype. Prose paragraphs are 2–4 sentences.
Introduce a term, then immediately use it.

House tone: effort over talent; respect for the game; team over self.
The motto — *"Talent is what you have, effort is what you give."* — may appear
once in Chapter 4, not everywhere.

---

## THE FOUR CHAPTERS

### `ch01` — What Baseball Is · *The object of the game in five minutes*

The single most important chapter: someone who reads only this should be able to
follow a game on TV. Cover: two teams alternating between batting and fielding;
the batter tries to hit a pitched ball and run around four bases; a run scores
when a runner touches all four and returns to home plate; the fielding team
tries to make three outs; three outs end the half-inning and the teams swap; nine
innings (fewer in youth ball — check the KB); most runs wins; there is no clock.

Include a `diagram` of the field at a beginner level, a `diagram` or `steps`
walking one run from contact to home plate, an `interactive` (`safeOrOut` with
`opts.mode: 'run-scored'` and 5–6 simple cases: "runner touches all four bases —
did a run score?"), a `coachnote` for parents on what to watch for from the
stands, and a `keypoints` recap.

KB reading: `concepts/age-divisions.md`, `concepts/grassroots-divisions.md`
(for how long a youth game actually is).

### `ch02` — The Field · *Where everything is and what it is called*

Home plate, first/second/third base, the base paths, the pitcher's mound and
rubber, the batter's boxes, the catcher's box, foul lines and foul poles, fair
vs foul territory, the infield and its dirt, the outfield and the fence, the
backstop, dugouts, on-deck circles, coach's boxes, the warning track.

Explain **fair vs foul** properly — it is the first genuinely confusing idea a
newcomer meets. Include a `divisionnote` with the real base-path and mound
distances by division from the KB.

Must include: a labelled `field` `diagram`, a second `diagram` showing fair vs
foul territory shading, and the `labelTheField` `interactive` with a set of
10–14 parts to place (use hotspot ids that exist in `HRL_SVG.FIELD_PARTS`).

KB reading: `concepts/field-dimensions-by-division.md`.

### `ch03` — The Nine Positions · *Who stands where, and why they are numbered*

Each of the nine: pitcher (1), catcher (2), first base (3), second base (4),
third base (5), shortstop (6), left field (7), centre field (8), right field (9).
For each: where they stand, what their job is on a typical play, and one thing
that makes the position distinctive. Explain **why the numbering exists** (it is
how plays are written down — 6-4-3 is a double play) and that the numbers are
not the same as uniform numbers. Introduce the infield/outfield/battery groupings.

Must include: a `positionGrid` `diagram`, a `field` `diagram` with
`positions: true`, the `placeThePositions` `interactive`, and a `compare`
section contrasting infield and outfield demands.

KB reading: `concepts/defensive-positioning.md`, `concepts/infield-play.md`,
`concepts/outfield-play.md`, `concepts/catching.md`.

### `ch04` — Gear, Safety & the Homerun Way · *What you need, and how we play*

Two halves. **Gear and safety:** bat standards (use the real ones from the KB —
do not guess at certification stamps), helmets, gloves by position, catcher's
full gear, footwear, what a player brings to a first practice; heat and hydration;
concussion recognition and the "when in doubt, sit them out" principle; the
basic safety rules (no swinging outside a designated area, helmet on the bases,
etc.). **The Homerun Way:** the three values in order — Effort, Respect, Team —
and the ROOTS coach code (Rules, Officials, Opponents, Teammates, Self). This is
the chapter where the motto belongs.

Must include: a `divisionnote` on bat standards by division/pathway, a
`makeTheCall` `interactive` with `opts.mode: 'safety'` and 5–6 real scenarios
("a player takes their helmet off between second and third — what happens?",
"it is 32°C and humid at a 3pm game — what does the coach do?"), a `diagram`
(use `HRL_SVG.timeline` or `bar` for something meaningful, or a `field` diagram
showing safe zones), a `coachnote`, and a `keypoints` recap.

For the values half you may reference the brand images — but note that images in
prose are not supported, so describe the values in text and use a `keypoints` or
`steps` section for ROOTS.

KB reading: `concepts/equipment-safety-rules.md`, `concepts/bat-standards.md`,
`concepts/heat-and-hydration.md`, `concepts/concussion-protocol.md`,
`concepts/safe-sport.md`.

---

## Third file — `src/questions-data.js` (skeleton only, no questions)

Same coding standards and the same Node-export shim, assigning `root.HRL_QUESTIONS`:

```js
root.HRL_QUESTIONS = {
  items: [],                          // filled by src/questions-t1.js … t6.js
  register: function (arr) { … },     // idempotent by id; keeps items sorted by id
  byId: function (id),
  byChapter: function (chapterId),    // array, in id order
  byTier: function (tierKey),
  byTopic: function (topic),
  byDifficulty: function (min, max),  // inclusive range
  topics: function (),                // sorted unique topic list present in items
  count: function ()
};
```

`register()` replaces rather than duplicates on a repeated id, exactly like
`HRL_CURRICULUM.register`. Write no questions in this file — it is the skeleton
only.

## Acceptance for this chunk

- All three files exist, are ES5-safe single IIFEs, and load in Node.
- `HRL_CURRICULUM.tiers` has exactly six tiers with the keys, names, and order above.
- `src/curriculum-t1.js` registers exactly four chapters: `ch01`–`ch04`, orders 1–4,
  all `tier: 'rookie'`, with `prev`/`next` linking `null → ch01 → ch02 → ch03 → ch04 → ch05`
  (ch04's `next` is `'ch05'`, which does not exist yet — that is correct).
- Every chapter meets the minimums: ≥8 sections, ≥2 `diagram`, ≥1 `interactive`,
  3–5 `objectives`, 6–8 `quizIds`, closing `keypoints`.
- Every `svg` value names a builder that actually exists in `svg.js`, and every
  `opts` uses that builder's real option names.
- Every `widget` value is one of the sixteen names listed above, and every
  interactive `opts` contains real, complete case content.
- Every factual claim traces to a KB page you read. No invented numbers.
- No TODOs, no `...` placeholders, no empty section bodies.

## Report back (required)

End your turn with:

1. The exact tier objects you wrote (all fields).
2. For each of `ch01`–`ch04`: its `quizIds`, its section list as
   `type/heading` pairs in order, and its `objectives`.
3. **The complete list of glossary term slugs** you referenced in any `terms`
   section — Chunk 5 depends on this list being exhaustive.
4. Every `HRL_SVG` builder name and option you used, and every widget name and
   `opts` key you used.
5. The KB pages you actually read, and any place the KB did not answer a question
   so you had to write around it.
6. Any deviation from this brief, and why.
