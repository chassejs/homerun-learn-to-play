# Implementer Brief — Chunk 5 — `src/glossary-data.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Context

**Homerun Learn to Play.** The chapter reader renders `terms` sections as
clickable buttons that open a glossary popover, and the Glossary view lists every
term A–Z with search. This file is the data behind both.

**Read before writing:**
- `src/curriculum-data.js` and `src/curriculum-t1.js` … `src/curriculum-t6.js` —
  the 24 chapters. You need to know which chapter introduces each term and what
  the surrounding prose already said, so the definition matches the teaching.
- `svg.js` (`HRL_SVG`) — for the optional `diagram` field.
- `learn.js` if it exists — for the exact fields the renderer reads.

## Coding standards

- One IIFE assigning `root.HRL_GLOSSARY`. `'use strict';`. House banner comment.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, `Object.assign`.
- Node-loadable: the
  `var root = typeof window !== 'undefined' ? window : this;` shim plus the
  `module.exports` shim at the end, matching the other data files.

## Shape

```js
root.HRL_GLOSSARY = {
  terms: [
    {
      slug: 'force-out',            // kebab-case, matches the curriculum's terms items
      term: 'Force out',            // display form, sentence case
      aliases: ['force play', 'forceout'],   // optional, for search
      short: 'An out made by touching the base a runner must reach.',  // one line, ≤90 chars
      definition: 'Two to four sentences …',                            // the full entry
      chapter: 'ch06',              // the chapter that introduces it
      related: ['tag-out', 'fielders-choice'],   // other slugs
      diagram: { svg: 'basePaths', opts: { shade: 'force' } }           // optional
    }
  ],
  bySlug: function (slug),
  all: function (),                 // sorted by term
  search: function (query),         // matches term, aliases, short, definition
  byLetter: function ()             // { A: [...], B: [...] } for the A–Z view
};
```

`bySlug` returns `null` for an unknown slug — the renderer degrades to plain text.

## Content requirements

- **Every slug listed at the end of this brief must exist.** An automated test
  fails on any `terms` slug in the curriculum that does not resolve here. That
  list is generated from the actual curriculum files, so it is exact.
- Add further terms beyond that list wherever a reader would reasonably look one
  up — aim for roughly **120–150 entries total**. Any baseball word used in the
  chapters without being defined in prose belongs here.
- **`short`** is what appears in the popover header and search results: one clear
  line, plain language, no jargon of its own.
- **`definition`** is two to four sentences. Write it at the level of the chapter
  that introduces the term, not at a uniform level — `run` is defined for a
  newcomer, `wRC+` for an adult.
- Where a term's meaning differs by division or pathway, say so in the definition
  and source it from the Youth Baseball Canada knowledge base at
  `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`. **Do not invent
  rules, numbers, or age cutoffs** — read the KB page.
- `chapter` must be the chapter that actually introduces the term (check the
  curriculum files; use the earliest chapter that uses it).
- `related` should genuinely help — pair opposites (`force-out` ↔ `tag-out`),
  pair a rule with its exception, pair a stat with what it corrects for.
- Add a `diagram` only where seeing it helps: the strike zone, force vs tag,
  the position numbering, the 20–80 scale, the count matrix. Use real builder
  names and real option names from `svg.js`.
- Canadian spelling to match the rest of the app ("centre field").

## Acceptance

- `src/glossary-data.js` exists, is an ES5-safe IIFE, and loads in Node.
- Every slug in the list below resolves via `bySlug`.
- 120–150 entries, each with a non-empty `slug`, `term`, `short`, `definition`,
  and a `chapter` that is a real chapter id.
- No duplicate slugs.
- Every `related` entry resolves to another slug in this file.
- Every `diagram.svg` names a real `HRL_SVG` builder and its `opts` use real
  option names.
- `search()` matches on term, aliases, short, and definition.
- No TODOs, no `...` placeholders.

## Report back

1. The total entry count and the count per introducing chapter.
2. Confirmation that every required slug is present (list any you could not
   place, and why).
3. Every entry that carries a `diagram`, with its builder and opts.
4. Any term whose definition depends on a division-specific rule, and the KB page
   you read for it.
5. Any deviation from this brief, and why.

---

## REQUIRED SLUGS (generated from the actual curriculum files)

Total required: **205 slugs**, grouped by the chapter that uses them.

- **ch01** — `half-inning`, `home-plate`, `inning`, `out`, `run`
- **ch02** — `backstop`, `batters-box`, `catchers-box`, `dugout`, `fair-territory`, `foul-line`, `foul-territory`, `infield`, `on-deck-circle`, `outfield`, `pitchers-mound`, `warning-track`
- **ch03** — `battery`, `catcher`, `centre-field`, `double-play`, `first-base`, `left-field`, `pitcher`, `position-numbers`, `right-field`, `second-base`, `shortstop`, `third-base`
- **ch04** — `batting-helmet`, `bbcor`, `catchers-gear`, `concussion`, `humidex`, `roots`, `usabat`
- **ch05** — `ball`, `called-strike`, `count`, `foul-ball`, `hit-by-pitch`, `strike-zone`, `strikeout`, `swinging-strike`, `walk`
- **ch06** — `caught-stealing`, `double`, `dropped-third-strike`, `error`, `fielders-choice`, `flyout`, `force-out`, `groundout`, `home-run`, `line-out`, `pop-out`, `single`, `tag-out`, `triple`
- **ch07** — `head-first-slide`, `overrun`, `pop-up-slide`, `running-lane`, `slide`, `tag-up`
- **ch08** — `batting-order`, `continuous-batting-order`, `extra-hitter`, `extra-innings`, `line-score`, `mandatory-play`, `mercy-rule`, `substitution`
- **ch09** — `bat-path`, `batting-tee`, `contact-point`, `door-knocking-knuckles`, `hip-rotation`, `load`, `soft-toss`, `stride`
- **ch10** — `arm-care`, `arm-path`, `follow-through`, `four-seam-grip`, `growth-plate`, `pitch-count`, `short-arming`, `two-hand-catch`, `two-seam-grip`
- **ch11** — `alligator-method`, `backhand`, `double-play-feed`, `exchange`, `fielding-triangle`, `funnel`, `pop-up-priority`, `ready-position`, `short-hop`
- **ch12** — `balance-point`, `centre-field-priority`, `changeup`, `crow-hop`, `curveball`, `cutoff`, `drop-step`, `rest-days`, `set-position`, `slider`, `windup`
- **ch13** — `bunt-defense`, `corners-in`, `double-play-depth`, `infield-in`, `no-doubles`, `of-deep`, `of-shallow`, `standard-alignment`
- **ch14** — `backup`, `ball-base-backup`, `cutoff`, `double-relay`, `relay`, `trailer`
- **ch15** — `balk`, `coach-interference`, `delayed-steal`, `first-and-third`, `primary-lead`, `secondary-lead`, `tag-up`
- **ch16** — `drag-bunt`, `push-bunt`, `sacrifice-bunt`, `safety-squeeze`, `slash-bunt`, `suicide-squeeze`, `wheel-play`
- **ch17** — `balk`, `dropped-third-strike`, `force-play`, `infield-fly`, `interference`, `obstruction`, `ordinary-effort`, `set-position`, `tag-up`, `type-1-obstruction`, `type-2-obstruction`, `uncaught-third-strike`
- **ch18** — `changeup`, `hitters-count`, `mound-visit`, `pickoff`, `pitchers-count`, `pitching-backwards`, `sequencing`, `set-position`, `shake-off`, `slide-step`
- **ch19** — `chase-rate`, `choke-up`, `count-leverage`, `green-light`, `hitters-count`, `on-deck`, `pitchers-count`, `plate-discipline`, `sacrifice-fly`, `two-strike-approach`
- **ch20** — `continuous-batting-order`, `extra-hitter`, `indicator-system`, `infield-in`, `intentional-walk`, `mandatory-play`, `protest`, `re-entry`, `roots`, `wipe-off`
- **ch21** — `box-score`, `called-strikeout`, `earned-run`, `error`, `fielders-choice`, `line-score`, `ordinary-effort`, `position-numbers`, `rbi`, `scorebook`, `unassisted`, `unearned-run`
- **ch22** — `at-bat`, `babip`, `batting-average`, `era`, `fip`, `on-base-percentage`, `ops`, `plate-appearance`, `sample-size`, `slugging-percentage`, `war`, `whip`, `woba`, `wrc-plus`
- **ch23** — `early-specialization`, `extension`, `five-tools`, `future-grade`, `induced-vertical-break`, `ltad`, `present-grade`, `projection`, `relative-age-effect`, `spin-rate`, `tryout`, `twenty-eighty-scale`
- **ch24** — `appeal`, `batting-out-of-order`, `courtesy-runner`, `ground-rules`, `judgment-call`, `missed-base`, `obstruction`, `protest`, `rundown`, `tag-up`, `type-1-obstruction`, `type-2-obstruction`

Full sorted list:

`alligator-method`, `appeal`, `arm-care`, `arm-path`, `at-bat`, `babip`, `backhand`, `backstop`, `backup`, `balance-point`, `balk`, `ball`, `ball-base-backup`, `bat-path`, `batters-box`, `battery`, `batting-average`, `batting-helmet`, `batting-order`, `batting-out-of-order`, `batting-tee`, `bbcor`, `box-score`, `bunt-defense`, `called-strike`, `called-strikeout`, `catcher`, `catchers-box`, `catchers-gear`, `caught-stealing`, `centre-field`, `centre-field-priority`, `changeup`, `chase-rate`, `choke-up`, `coach-interference`, `concussion`, `contact-point`, `continuous-batting-order`, `corners-in`, `count`, `count-leverage`, `courtesy-runner`, `crow-hop`, `curveball`, `cutoff`, `delayed-steal`, `door-knocking-knuckles`, `double`, `double-play`, `double-play-depth`, `double-play-feed`, `double-relay`, `drag-bunt`, `drop-step`, `dropped-third-strike`, `dugout`, `early-specialization`, `earned-run`, `era`, `error`, `exchange`, `extension`, `extra-hitter`, `extra-innings`, `fair-territory`, `fielders-choice`, `fielding-triangle`, `fip`, `first-and-third`, `first-base`, `five-tools`, `flyout`, `follow-through`, `force-out`, `force-play`, `foul-ball`, `foul-line`, `foul-territory`, `four-seam-grip`, `funnel`, `future-grade`, `green-light`, `ground-rules`, `groundout`, `growth-plate`, `half-inning`, `head-first-slide`, `hip-rotation`, `hit-by-pitch`, `hitters-count`, `home-plate`, `home-run`, `humidex`, `indicator-system`, `induced-vertical-break`, `infield`, `infield-fly`, `infield-in`, `inning`, `intentional-walk`, `interference`, `judgment-call`, `left-field`, `line-out`, `line-score`, `load`, `ltad`, `mandatory-play`, `mercy-rule`, `missed-base`, `mound-visit`, `no-doubles`, `obstruction`, `of-deep`, `of-shallow`, `on-base-percentage`, `on-deck`, `on-deck-circle`, `ops`, `ordinary-effort`, `out`, `outfield`, `overrun`, `pickoff`, `pitch-count`, `pitcher`, `pitchers-count`, `pitchers-mound`, `pitching-backwards`, `plate-appearance`, `plate-discipline`, `pop-out`, `pop-up-priority`, `pop-up-slide`, `position-numbers`, `present-grade`, `primary-lead`, `projection`, `protest`, `push-bunt`, `rbi`, `re-entry`, `ready-position`, `relative-age-effect`, `relay`, `rest-days`, `right-field`, `roots`, `run`, `rundown`, `running-lane`, `sacrifice-bunt`, `sacrifice-fly`, `safety-squeeze`, `sample-size`, `scorebook`, `second-base`, `secondary-lead`, `sequencing`, `set-position`, `shake-off`, `short-arming`, `short-hop`, `shortstop`, `single`, `slash-bunt`, `slide`, `slide-step`, `slider`, `slugging-percentage`, `soft-toss`, `spin-rate`, `standard-alignment`, `stride`, `strike-zone`, `strikeout`, `substitution`, `suicide-squeeze`, `swinging-strike`, `tag-out`, `tag-up`, `third-base`, `trailer`, `triple`, `tryout`, `twenty-eighty-scale`, `two-hand-catch`, `two-seam-grip`, `two-strike-approach`, `type-1-obstruction`, `type-2-obstruction`, `unassisted`, `uncaught-third-strike`, `unearned-run`, `usabat`, `walk`, `war`, `warning-track`, `wheel-play`, `whip`, `windup`, `wipe-off`, `woba`, `wrc-plus`

