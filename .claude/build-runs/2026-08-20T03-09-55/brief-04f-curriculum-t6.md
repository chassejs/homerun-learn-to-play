# Implementer Brief — Chunk 4f — Tier 6 (chapters 21–24) → `src/curriculum-t6.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Read first

1. **`.claude/build-runs/2026-08-20T03-09-55/brief-04a-curriculum-core-t1.md`** —
   all conventions apply unchanged.
2. `src/curriculum-data.js` and the existing tier files — match structure.
3. `svg.js` — use only builders and options that exist there. This tier uses
   `sprayChart`, `scaleGauge`, `radar`, `bar`, and `timeline` more than `field`.
4. The KB pages named per chapter.

## Deliverable

**One file: `src/curriculum-t6.js`**, registering exactly `ch21`–`ch24`,
orders 21–24, all `tier: 'promind'`. `ch21.prev = 'ch20'`; **`ch24.next = null`**
(this is the last chapter — the chain ends here).
`quizIds`: `q2101`…, `q2201`…, `q2301`…, `q2401`… (6–8 each).

## Voice and level for Tier 6

The reader is an adult — a serious coach, a scout, an analyst, or a parent who
wants a professional's understanding. Write for that reader: precise, honest
about uncertainty, and willing to say what a number does not tell you.

**The intellectual honesty requirement for this tier is strict.** Chapters 22 and
23 deal with statistics and evaluation, where confident-sounding nonsense is easy
to write. Rules:

- Define every statistic by **what question it answers**, then state **what it
  hides** and **what sample size it needs** before it means anything.
- Do **not** invent specific league-average constants, park factors, wOBA
  weights, or WAR coefficients. These change every season and are not in the KB.
  Describe the *shape* and *purpose* of a statistic and use clearly-labelled
  illustrative figures ("a .320 on-base percentage is roughly league-average in
  many contexts") rather than asserting a precise current value as fact.
- Where a concept is genuinely contested among analysts (defensive metrics, WAR
  formulations, the reliability of youth velocity projection), say so.
- The 20–80 scale, five tools, and pitch metrics are well documented and stable —
  those you can state plainly.

---

## THE FOUR CHAPTERS

### `ch21` — Reading the Game · *Scorekeeping, the box score, and what a scorer decides*

Position numbers in action: 6-4-3, 5-3, F8, K vs backwards-K, U3. The standard
notation for every common play. Keeping a scorebook: the diamond-per-at-bat
convention, tracking runs and RBI, and where the count and pitch count go.
**Hit vs error** — the scorer's judgment call, the "ordinary effort" standard,
and why it matters (it changes a pitcher's ERA and a hitter's average). Fielder's
choice. The box score: what each column means and how to read a game from it.
The line score (R/H/E) and reconstructing the story of a game from it.

Must include: at least two `diagram` sections (a `positionGrid` for the numbering
and a `bar` or `sprayChart` treatment of a box score/batted-ball profile), the
`scoreThePlay` `interactive` with **8–10 cases** (given a play description,
produce the notation — include at least two hit-vs-error judgment calls and one
fielder's choice), a `compare` of a hit and an error on near-identical plays, and
a `keypoints` recap.

KB reading: this chapter builds on `concepts/defensive-positioning.md` and
`concepts/infield-play.md` for the position numbering. Scorekeeping notation is
standard and stable — write it carefully and consistently.

### `ch22` — Analytics Foundations · *What each number answers, and what it hides*

Work up the ladder, each stat introduced as an answer to a limitation of the one
before:

- **AVG** — hits per at-bat. Hides walks entirely; treats a single and a home run
  as equal.
- **OBP** — how often the batter avoids making an out. The single most important
  simple offensive number.
- **SLG** — total bases per at-bat. Values extra-base hits, but its weights are
  arbitrary (a double is not worth exactly two singles).
- **OPS** — a rough, convenient sum of two things measured on different scales.
  Useful; not principled.
- **BABIP** — batting average on balls in play. Its main use is as a *luck and
  sample-size flag*, not a skill measure.
- **wOBA / wRC+** — properly weighted offensive value, and the park- and
  league-adjusted index version where 100 is average.
- **ERA vs FIP vs WHIP** — what a pitcher controls versus what their defence
  does; why FIP exists.
- **WAR** — what it is trying to be (one number, all contributions, versus a
  freely-available player), why versions disagree, and why small differences in
  WAR are noise.

Close with the honest part: **sample size**. Why a .400 average in 30 at-bats
means very little, why defensive metrics need multiple seasons, and why almost
no youth-baseball sample is large enough for any of this — which is exactly why
the KB's development framework is built on skill progression rather than results.

Must include: at least two `diagram` sections (a `bar` comparing what different
stats say about the same two players, and a `timeline` or second `bar` on
sample-size reliability), the `statMatch` `interactive` (10–12 pairs: match each
stat to the question it answers, with deliberate trap options built from the
common misreadings), a `compare` of two players who rank differently by AVG than
by OBP, a `coachnote` on why none of this replaces watching a player, and a
`keypoints` recap.

KB reading: `syntheses/skill-roadmap-hitting.md` and
`concepts/player-evaluation-and-tryouts.md` for the youth-evaluation tie-in.

### `ch23` — Scouting & Player Development · *The five tools, the 20–80 scale, and projection*

The **five tools** for position players (hit, power, run, field, throw) and the
pitcher equivalents (fastball, secondary pitches, command, delivery/durability).
The **20–80 scale**: 50 is major-league average, each 10 points is one standard
deviation, and grades are given as present *and* future. Why a 45 present / 60
future grade is a completely different player than a 60 present / 60 future.
**Pitch metrics**: velocity, spin rate, induced vertical break, extension — what
each one actually measures and why velocity alone is a poor predictor.
**Projection vs performance** — the central scouting problem: a 14-year-old's
current results are a weak signal, and frame, athleticism, and rate of
improvement matter more. Tie this to the KB's LTAD model: the developmental
stages, relative age effect, early specialization risks, and the Canadian
pathways from grassroots through to higher levels. Finish with what a youth
evaluation/tryout should actually measure and how to run one fairly.

Must include: at least two `diagram` sections (a `scaleGauge` for the 20–80 scale
and a `timeline` of LTAD stages / the Canadian pathway), the `gradeTheTool`
`interactive` (6–8 cases: given a description of a player's tool, place it on the
20–80 scale), a `compare` of present vs future grades on the same player, a
`coachnote` on the harm of grading young players in front of them, and a
`keypoints` recap.

KB reading: `concepts/player-evaluation-and-tryouts.md`, `concepts/ltad-model.md`,
`concepts/pathways-overview.md`, `concepts/age-appropriate-skill-progression.md`,
`concepts/coaching-certification.md`.

### `ch24` — The Rulebook's Edges · *Appeals, batting out of order, and the rest*

The last chapter: the situations that come up once a season and that nobody at
the field is sure about.

- **Appeal plays** — missing a base, leaving early on a tag-up, batting out of
  order. How an appeal is made and when the right to appeal is lost.
- **Batting out of order** — who is actually out, what happens to the runners,
  and the difference between appealing before and after the next pitch. Work
  through a full example.
- **Rundowns** — the defensive responsibilities, the "make him commit" principle,
  the number of throws to aim for, and the obstruction risk in a rundown.
- **Obstruction types** — the two categories and their different remedies.
- **Courtesy runners** — where they are allowed, for whom, and the restrictions.
- **Ground rules** — what they can and cannot override, and how they are agreed
  before a game.
- **Protests** — what is protestable (a misapplied rule) versus what is not (a
  judgment call), and the procedure.

Must include: at least two `diagram` sections (a `basePaths` or `field` for the
rundown responsibilities, plus one more), the `makeTheCall` `interactive` with
**8–10 edge-case scenarios** — each with the situation, the choices, the correct
ruling, and an explanation naming the rule that decides it — a worked `example`
section for batting out of order, and a `keypoints` recap.

Close the chapter (and the curriculum) with a short `prose` section pointing the
reader at what to do next: the Baseball IQ test, the review deck, and the
Homerun Baseball Ottawa values they started with in Chapter 4.

KB reading: `concepts/courtesy-runner-rules.md`,
`concepts/rundowns-and-pickoffs.md`, `concepts/interference-and-obstruction.md`,
`concepts/balk-rules.md`, `concepts/coach-umpire-interaction.md`,
`concepts/game-management.md`.

---

## Acceptance

- `src/curriculum-t6.js` exists, is an ES5-safe IIFE, loads in Node, registers
  exactly `ch21`–`ch24`, and **`ch24.next` is `null`**.
- Every chapter meets the brief-04a minimums.
- Chapter 22 contains no invented precise constants presented as current fact,
  and explicitly addresses sample size and what each statistic hides.
- Chapter 23 states the 20–80 scale correctly (50 = MLB average, 10 points = one
  standard deviation, present vs future grades).
- Every `svg` name/option exists in `svg.js`; every `widget` is from the approved
  sixteen; every interactive `opts` carries real, complete case content.
- No TODOs, no `...` placeholders.

## Report back

Same format as brief 04a, plus:
- Every statistic defined in ch22, with the one-line "what it hides" you wrote.
- Every `makeTheCall` case in ch24 with its correct ruling and justification.
- **The complete cumulative list of glossary slugs** used across ch21–ch24.
