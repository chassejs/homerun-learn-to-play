# Implementer Brief — Chunk 4e — Tier 5 (chapters 17–20) → `src/curriculum-t5.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Read first

1. **`.claude/build-runs/2026-08-20T03-09-55/brief-04a-curriculum-core-t1.md`** —
   all conventions apply unchanged.
2. `src/curriculum-data.js` and the existing tier files — match structure.
3. `svg.js` — use only builders and options that exist there.
4. The KB pages named per chapter. **This tier is the rules-accuracy tier — read
   the KB pages carefully and quote their conditions precisely. A wrong rule here
   is the worst defect the app can ship.**

## Deliverable

**One file: `src/curriculum-t5.js`**, registering exactly `ch17`–`ch20`,
orders 17–20, all `tier: 'elite'`. `ch17.prev = 'ch16'`; `ch20.next = 'ch21'`.
`quizIds`: `q1701`…, `q1801`…, `q1901`…, `q2001`… (6–8 each).

## Voice and level for Tier 5

The reader is a high-school/U18 player, an experienced coach, or a serious parent
who wants to stop being confused by the calls. Write with precision. State
conditions as conditions — "all four of the following must be true" — and be
explicit about what a rule does **not** cover, because the misconceptions are as
important as the rules. Where the KB documents a division split (and in this tier
it very often does), it goes in a `divisionnote` with real values.

---

## THE FOUR CHAPTERS

### `ch17` — The Tricky Rules · *Infield fly, dropped third strike, balks, interference*

The four rules that decide games and start arguments.

- **Infield fly.** All four trigger conditions together (fair fly, ordinary
  effort by an infielder, runners on first-and-second or bases loaded, fewer than
  two outs). The batter is out the instant the call is made, whether or not the
  ball is caught. Runners are *not* forced and may advance at their own risk.
  "Infield Fly, if Fair" near the lines. Why the rule exists (it prevents a
  deliberate drop into a double play). **And the division applicability — it does
  not apply in every youth division; get this from the KB.**
- **Dropped third strike.** When the batter may run (and the first-base-occupied,
  fewer-than-two-outs exception), what the defence must do, and again the
  division applicability.
- **Balks.** What a balk protects against, the common balk actions, and the
  penalty. Note where balks are not enforced or are handled with a warning.
- **Interference vs obstruction.** The distinction — interference is by the
  offence (or a runner) hindering a fielder; obstruction is by the defence
  impeding a runner. The different remedies each carries.

Must include: at least two `diagram` sections (a `field` with `runners` set for
the infield-fly condition, and one more), the `makeTheCall` `interactive` with
**8–10 scenarios** covering all four rules — each case giving the situation, the
choices, the correct ruling, and a full explanation citing the condition that
decided it — a `divisionnote` on which of these rules apply in which divisions,
and a `keypoints` recap.

KB reading: `concepts/infield-fly-rule.md`, `concepts/dropped-third-strike.md`,
`concepts/balk-rules.md`, `concepts/interference-and-obstruction.md`.

### `ch18` — Pitching Strategy · *Sequencing, holding runners, and calling a game*

Pitching backwards vs conventional sequencing. Changing eye level and changing
speeds as the two levers that matter most at the youth/high-school level.
Establishing a pitch to set up another. Working the count — what a pitcher is
trying to do at 0-0, 1-2, and 3-1. The catcher's role in calling a game: reading
the hitter's stance, swing, and previous at-bat; managing the pitcher's confidence
and pace; when to go to the mound. Holding runners: varying the look and the hold
time, the slide step, pickoff moves to first and second, and staying legal (link
back to balks). Mound-visit rules and their limits by division.

Must include: at least two `diagram` sections (a `countMatrix` with
`shade: 'leverage'`, plus a `strikeZone` showing a sequence's locations with
numbered pitches), the `sequencePitches` `interactive` (6–8 cases: given a hitter
profile and a count, build a three-pitch sequence and get feedback on eye/level
changes), a `divisionnote` on mound visits and pitching-change rules, a
`coachnote` on not over-managing a young pitcher, and a `keypoints` recap.

KB reading: `concepts/pitching-approach-and-strategy.md`,
`concepts/holding-runners-and-pickoffs.md`,
`concepts/pitching-rules-and-mound-visits.md`,
`concepts/catcher-game-calling.md`, `concepts/balk-rules.md`.

### `ch19` — Hitting Approach · *Counts, zones, and the two-strike swing*

Approach as a decision made before the pitch, not during it. Count leverage —
which counts belong to the hitter and which to the pitcher, and what to do with
each. Hunting a zone and a pitch rather than reacting to everything. The
difference between plate discipline and passivity (taking a hittable strike is
not patience). The **two-strike approach**: choke up, widen the zone, shorten the
swing, put it in play — and why it is a deliberate change of goal, not a worse
swing. Situational hitting: moving a runner from second with nobody out, the
infield-in ground ball, the sacrifice fly, hitting behind the runner. On-deck
preparation.

Must include: at least two `diagram` sections (a `countMatrix` and a `strikeZone`
showing how the target zone widens with two strikes), one `interactive`
(`makeTheCall` with `opts.mode: 'approach'`, or `strikeZoneTrainer` with
`opts.mode: 'swing-decision'` — 6–8 cases where the learner decides swing or take
given the count and location), a `compare` of the same at-bat handled well and
badly, and a `keypoints` recap.

KB reading: `concepts/hitting-approach-and-plate-discipline.md`,
`concepts/two-strike-approach.md`, `concepts/offensive-strategy.md`.

### `ch20` — Managing the Game · *Lineups, substitutions, signs, and umpires*

Lineup construction: what each spot in the order is actually for, and how that
changes in a youth league where everyone bats and mandatory play applies.
Substitution and re-entry rules (real ones from the KB — these vary a lot by
pathway and are a common source of protests). Sign systems: simple indicator
systems, why they must be simple enough that a 12-year-old executes them under
pressure, and changing them when they are stolen. Coach–umpire interaction: what
you may question, how, who may do it, and what gets you ejected — plus the ROOTS
framing that officials are part of the game, not the opposition. In-game
decisions: pitching changes, when to pull an infield in, the intentional walk,
and managing a blowout in both directions. Managing multi-age teams.

Must include: at least two `diagram` sections (a `bar` or `timeline` treatment of
lineup roles, plus one more — a `field` with `covering` set for a defensive
substitution scenario works), one `interactive` (`makeTheCall` with
`opts.mode: 'management'` — 6–8 cases: a substitution legality question, a
mound-visit limit, a mandatory-play compliance check, an umpire-interaction
judgment call), a `divisionnote` on substitution and mandatory-play rules by
division/pathway, a `coachnote` on the ROOTS code applied to officials, and a
`keypoints` recap.

KB reading: `concepts/lineup-construction.md`,
`concepts/mandatory-play-and-substitution.md`,
`concepts/sign-systems-and-communication.md`,
`concepts/coach-umpire-interaction.md`, `concepts/game-management.md`,
`concepts/managing-multi-age-teams.md`,
`concepts/positive-coaching-and-communication.md`.

---

## Acceptance

- `src/curriculum-t5.js` exists, is an ES5-safe IIFE, loads in Node, registers
  exactly `ch17`–`ch20`.
- Every chapter meets the brief-04a minimums.
- `ch17` states all four infield-fly conditions correctly and covers division
  applicability for both infield fly and dropped third strike, sourced from the KB.
- Every rules statement in this tier traces to a specific KB page. **Do not write
  a rule from memory — read the page.**
- Every `svg` name/option exists in `svg.js`; every `widget` is from the approved
  sixteen; every interactive `opts` carries real, complete case content with
  correct rulings and explanations.
- No TODOs, no `...` placeholders.

## Report back

Same format as brief 04a, plus: for `ch17`, list every rule scenario in the
`makeTheCall` cases with its correct ruling and the KB page and passage that
justifies it — the reviewer checks these line by line against the source.
