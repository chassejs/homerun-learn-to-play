# Implementer Brief — Chunk 4c — Tier 3 (chapters 9–12) → `src/curriculum-t3.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Read first

1. **`.claude/build-runs/2026-08-20T03-09-55/brief-04a-curriculum-core-t1.md`** —
   all conventions apply unchanged (coding standards, chapter shape, the ten
   section types, widget names, glossary-slug rule, sourcing rules, per-chapter
   minimums, report-back format).
2. `src/curriculum-data.js`, `src/curriculum-t1.js`, `src/curriculum-t2.js` —
   match their structure exactly.
3. `svg.js` — use only builders and options that exist there.
4. The KB pages named per chapter, under
   `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`.

## Deliverable

**One file: `src/curriculum-t3.js`**, registering exactly `ch09`–`ch12`,
orders 9–12, all `tier: 'diamond'`. `ch09.prev = 'ch08'`; `ch12.next = 'ch13'`
(does not exist yet — correct). `quizIds`: `q0901`…, `q1001`…, `q1101`…, `q1201`…
(6–8 each).

## Voice and level for Tier 3

This tier is about **doing** rather than knowing — how to actually hit, throw,
field, and pitch. The reader is a rec/house-league player or a parent who has
just agreed to coach one. Assume all Tier 1–2 vocabulary.

Two things make this tier distinctive and you must honour both:

- **Age-appropriateness is the content.** The KB's skill-roadmap syntheses
  (`wiki/syntheses/skill-roadmap-*.md`) give, per age band, what to introduce,
  what to reinforce, what should be mastered, and — critically — **what NOT to
  teach yet**. Every mechanics chapter must carry that "not yet" guidance,
  because teaching a 7-year-old hip rotation is the single most common youth
  coaching error. Use a `divisionnote` (columns: age band, introduce, not yet) or
  a `timeline`/`steps` treatment for the progression.
- **Cues over anatomy.** Teach with the coaching cue a player can act on, then
  explain what it accomplishes. Avoid biomechanical jargon.

---

## THE FOUR CHAPTERS

### `ch09` — Hitting Fundamentals · *Stance to finish, and what to work on first*

Grip and knuckle alignment. Stance: balance, width, plate coverage. The load and
why it exists. The stride as a timing move. Bat path to the ball — the swing is
neither "level" nor "chopping down"; explain what it actually is. Contact point
and how it changes for inside vs outside pitches. The finish and balance.
The teaching progression: tee → soft toss → side toss → front toss → live, and
why the tee never stops being useful. The age-band progression, including what
not to teach yet.

Must include: the `swingSequence` `diagram`, a second `diagram` (contact point by
pitch location — a `strikeZone` with contact-point annotation, or a `timeline` of
the age progression), the `swingOrder` `interactive`, a `steps` section for the
tee→live progression, a `coachnote` on the most common youth hitting mistake, and
a `keypoints` recap.

KB reading: `concepts/hitting-mechanics.md`,
`concepts/tee-and-soft-toss-progressions.md`,
`syntheses/skill-roadmap-hitting.md`.

### `ch10` — Throwing & Catching · *The four-seam grip, the arm path, and arm care*

The four-seam grip and why it matters (a ball thrown across the seams carries
straighter). Body position: glove-side lead, feet aligned to the target. The arm
path — thumb down, fingers on top at release — and the common youth faults
(short-arming, dart-throwing, all-arm throws). Follow-through and momentum toward
the target. **Catching:** two hands, giving with the ball, catching above vs
below the waist, watching it into the glove. **Arm care:** why it is the most
important part of this chapter — warm-up, throwing progression, rest between
outings, and the warning signs that mean stop. Age-band progression.

Must include: the `throwSequence` `diagram` with `showGrip`, a second `diagram`,
the `armCareCheck` `interactive` (supply real pitch-count/rest scenarios drawn
from the KB's actual limits), a `coachnote` on pain being a stop signal, and a
`keypoints` recap.

KB reading: `concepts/throwing-mechanics.md`, `concepts/catching.md`,
`concepts/arm-care-and-injury-prevention.md`,
`syntheses/skill-roadmap-throwing.md`, `concepts/pitch-count-rules.md`
(for the `armCareCheck` cases).

### `ch11` — Playing the Infield · *Ready position, the triangle, and the exchange*

The ready position and the pre-pitch move that gets you into it. Getting the body
in front. The fielding triangle (feet and glove). Working **through** the ball
rather than waiting on it. The funnel to the chest and the exchange to the
throwing hand. Footwork for the throw. Backhands and short hops. First-base
footwork on a throw. Feeds and the double-play turn at second (introduce; Chapter
13 covers depth and positioning). Communication and who has priority.

Must include: a `field` `diagram` with `positions: true` showing infield
positioning, a second `diagram` (double-play feed arrows via the `arrows` option),
one `interactive` (`placeThePositions` with `opts.mode` set for an infield-only
task, or `spotTheAlignment`), a `steps` section for the field-funnel-exchange-throw
sequence, and a `keypoints` recap.

KB reading: `concepts/infield-play.md`, `concepts/infield-drills.md`,
`syntheses/skill-roadmap-fielding-infield.md`.

### `ch12` — The Outfield & Pitching Basics · *Routes, the crow hop, and the delivery*

**Outfield:** the drop step and first move, taking a route rather than a curve,
catching above the throwing shoulder, the crow hop to throw, hitting the cutoff,
calling for the ball and priority (centre fielder rules the outfield), playing a
ball off the fence, and the do-not-let-it-past-you principle with a runner on.
**Pitching:** the delivery chain from the set/windup through balance, stride,
separation, and release; the strike-first mindset; which pitches are appropriate
at which ages (use the KB's real guidance — this matters for arm health); and
pitch-count limits and required rest by division.

Must include: a `field` `diagram` showing outfield positioning and routes, a
second `diagram` (the delivery via `throwSequence`, or a `timeline` of
age-appropriate pitch types), one `interactive` (`armCareCheck` with pitching
scenarios, or `sequencePitches` at a beginner level), a `divisionnote` on pitch
counts and rest by division, a `coachnote`, and a `keypoints` recap.

KB reading: `concepts/outfield-play.md`, `concepts/outfield-drills.md`,
`syntheses/skill-roadmap-fielding-outfield.md`, `concepts/pitching-mechanics.md`,
`concepts/pitch-types-by-age.md`, `concepts/pitch-count-rules.md`,
`syntheses/skill-roadmap-pitching.md`.

---

## Acceptance

- `src/curriculum-t3.js` exists, is an ES5-safe IIFE, loads in Node, registers
  exactly `ch09`–`ch12`.
- Every chapter meets the brief-04a minimums.
- Every chapter carries explicit age-band progression guidance including a
  "not yet" element, sourced from the KB skill roadmaps.
- Every `svg` name/option exists in `svg.js`; every `widget` is from the approved
  sixteen; every interactive `opts` carries real, complete case content.
- Pitch-count and rest numbers come from the KB, not from memory.
- No TODOs, no `...` placeholders.

## Report back

Same format as brief 04a: chapters with `quizIds`, section `type/heading` lists,
objectives, **the complete list of new glossary slugs**, `HRL_SVG` builders and
options used, widget names and opts used, KB pages read, and any deviations.
Also state the pitch-count/rest table you used and which KB page it came from.
