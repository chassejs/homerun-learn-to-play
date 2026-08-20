# Implementer Brief — Chunk 4b — Tier 2 (chapters 5–8) → `src/curriculum-t2.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Read first

1. **`.claude/build-runs/2026-08-20T03-09-55/brief-04a-curriculum-core-t1.md`** —
   all the conventions (coding standards, chapter object shape, the ten section
   types, the widget name list, the glossary-slug rule, content-sourcing rules,
   the per-chapter minimums, and the report-back format). **Everything in that
   brief applies here unchanged** except the chapter list and the voice note.
2. `src/curriculum-data.js` and `src/curriculum-t1.js` — the skeleton and the
   Tier 1 file you already wrote. Match their structure exactly; this file is the
   same shape with `HRL_CURRICULUM.register([...])`.
3. `svg.js` — use only builder names and option names that actually exist there.
4. The KB pages named per chapter below, under
   `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`.

## Deliverable

**One file: `src/curriculum-t2.js`**, registering exactly four chapters —
`ch05`–`ch08`, orders 5–8, all `tier: 'sandlot'`.

Chain: `ch05.prev = 'ch04'`, and `ch08.next = 'ch09'` (ch09 does not exist yet —
correct). `quizIds` continue the pattern: `q0501`… for ch05, `q0601`… for ch06,
`q0701`… for ch07, `q0801`… for ch08 (6–8 each).

## Voice and level for Tier 2

The reader now knows what a run and an out are. This tier teaches **the rules of
play** — what actually happens pitch by pitch. Written for a first-season player
(roughly 8–12) or the parent watching them. Still plain and concrete, but you may
now use the Tier 1 vocabulary without redefining it. Define every genuinely new
term on first use and add it to a `terms` section.

Rules precision matters more here than in Tier 1. Where the KB documents a
division split, it goes in a `divisionnote` with the real values.

---

## THE FOUR CHAPTERS

### `ch05` — Balls, Strikes & the Count · *The pitch-by-pitch heart of the game*

The strike zone: where it is, what defines its top and bottom, that it is judged
as the ball crosses the plate, and that it is called by a human. Called strike vs
swinging strike vs foul ball. Why a foul ball is a strike but cannot be the third
strike (with the bunt exception). Balls, and what four of them means. The count,
spoken balls-first. All twelve counts and what each one means for hitter and
pitcher. Walk, strikeout, hit by pitch.

Must include: a `strikeZone` `diagram`, a `countMatrix` `diagram`, the
`strikeZoneTrainer` `interactive` (supply 10–12 pitch cases with real
coordinates and correct calls), the `countBuilder` `interactive`, and a
`keypoints` recap. That is two interactives — good; the minimum is one.

KB reading: `concepts/strike-zone-and-ball-strike-calls.md`.

### `ch06` — Getting On, Getting Out · *Every way a turn at bat can end*

**Ways to reach:** single, double, triple, home run; walk; hit by pitch; error;
fielder's choice; dropped third strike (introduce it here at a basic level —
Chapter 17 goes deep, and note that it does not apply in every division).
**Ways to be out:** strikeout, groundout, flyout, line out, pop out, force out,
tag out, caught stealing. Explain the difference between a **force** and a **tag**
carefully — it is the concept that unlocks most defensive play, and Chapter 7
builds directly on it.

Must include: a `compare` section (force out vs tag out), a `field` or
`basePaths` `diagram` illustrating a force situation, a second `diagram`, the
`safeOrOut` `interactive` (8–10 cases mixing forces and tags), and a `keypoints`
recap.

KB reading: `concepts/dropped-third-strike.md` (basic level only),
`concepts/baserunning-fundamentals.md`.

### `ch07` — Running the Bases · *When to go, when to stay, how to slide*

Running through first base and why it is allowed there and nowhere else. The
running lane. Force situations and how a runner becomes forced. Tagging up on a
caught fly ball. Reading the ball off the bat: ground ball vs line drive vs fly
ball. When to look at the base coach. Sliding: feet-first as the default, why
head-first into home or first is discouraged in youth ball, and the pop-up slide.
Basic safety on the bases (helmet stays on).

Must include: a `basePaths` `diagram` with force shading, a second `diagram`
covering tagging up, the `runnerAdvance` `interactive` (6–8 scenarios where the
learner predicts where each runner ends up), a `coachnote`, and a `keypoints` recap.

KB reading: `concepts/baserunning-fundamentals.md`, `concepts/sliding.md`,
`concepts/tagging-up-and-reads.md`, `concepts/base-coaching-duties.md`.

### `ch08` — How a Game Is Played and Won · *Innings, the batting order, and the scoreboard*

The half-inning structure and the visitor-bats-first convention. The batting
order: it is fixed, it wraps around, and everyone bats in most youth leagues.
Substitution basics and mandatory play (real rules from the KB — this differs by
division and pathway, so it needs a proper `divisionnote`). How long a game
actually is by division. Mercy/run-ahead rules. Extra innings and ties. Reading a
line score (R/H/E) — a first look at what Chapter 21 develops fully.

Must include: a `divisionnote` on game length and mercy rules by division, a
second `divisionnote` or `compare` on mandatory play, at least two `diagram`
sections (a `timeline` of a half-inning and a line-score/`bar` treatment both
work), one `interactive` (`safeOrOut` with `opts.mode: 'game-state'`, or
`makeTheCall` with `opts.mode: 'game-flow'` — 5–6 cases such as "the home team
leads after the top of the last inning: do they bat?"), and a `keypoints` recap.

KB reading: `concepts/mercy-run-rules.md`, `concepts/age-divisions.md`,
`concepts/grassroots-divisions.md`, `concepts/mandatory-play-and-substitution.md`,
`concepts/lineup-construction.md` (basics only).

---

## Acceptance

- `src/curriculum-t2.js` exists, is an ES5-safe IIFE, loads in Node, and calls
  `HRL_CURRICULUM.register([...])` with exactly `ch05`–`ch08`.
- Every chapter meets the minimums from brief 04a: ≥8 sections, ≥2 `diagram`,
  ≥1 `interactive`, 3–5 `objectives`, 6–8 `quizIds`, closing `keypoints`.
- Every `svg` name and option exists in `svg.js`; every `widget` name is from the
  approved sixteen; every interactive `opts` carries real, complete case content.
- Every rule statement traces to a KB page you read. No invented numbers.
- No TODOs, no `...` placeholders.

## Report back

Same format as brief 04a, section "Report back": tier chapters with `quizIds`,
section `type/heading` lists, objectives, **the complete list of new glossary
slugs introduced**, the `HRL_SVG` builders/options and widget names/opts used,
the KB pages read, and any deviations.
