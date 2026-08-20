# Implementer Brief — Chunk 4d — Tier 4 (chapters 13–16) → `src/curriculum-t4.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Read first

1. **`.claude/build-runs/2026-08-20T03-09-55/brief-04a-curriculum-core-t1.md`** —
   all conventions apply unchanged.
2. `src/curriculum-data.js` and `src/curriculum-t1.js` … `t3.js` — match structure.
3. `svg.js` — use only builders and options that exist there. This tier leans on
   `field()` harder than any other, especially its `alignment`, `roles`, `arrows`,
   `covering`, `runners`, and `ball` options. Read them carefully.
4. The KB pages named per chapter, under
   `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`.

## Deliverable

**One file: `src/curriculum-t4.js`**, registering exactly `ch13`–`ch16`,
orders 13–16, all `tier: 'select'`. `ch13.prev = 'ch12'`; `ch16.next = 'ch17'`.
`quizIds`: `q1301`…, `q1401`…, `q1501`…, `q1601`… (6–8 each).

## Voice and level for Tier 4

The reader can play. This tier is about **the game above the skill** — where to
stand before the pitch, what your job is on a ball you are not fielding, and how
nine players act as one defence. Reader is a competitive travel/select player
(roughly 11–15) or their coach. Full baseball vocabulary is fair game; keep
sentences tight and load-bearing.

The organising idea for the whole tier: **on every batted ball, all nine players
have a job — field the ball, cover a base, or back someone up. Nobody stands still.**

---

## THE FOUR CHAPTERS

### `ch13` — Defensive Positioning · *Where to stand before the pitch, and why*

Standard alignment as the default and what it assumes. Then the situational
alignments and the trade-off each one buys and pays for:
- **Infield in** — cuts the run at the plate, widens every hole.
- **Double-play depth** — buys the turn, costs range to the line.
- **Corners in / bunt defence** — who charges, who covers first and third.
- **No-doubles** — outfielders deep and toward the lines, concedes the single.
- **Outfield shallow / deep** — by hitter and by score.
Also: who covers second on a steal (and how the middle infielders decide),
positioning by hitter tendency, and adjusting for the count.

Must include: at least three `field` `diagram` sections using different
`alignment` values (standard vs infield-in vs DP depth is the minimum useful set),
the `spotTheAlignment` `interactive` (6–8 cases: given a game situation, pick the
right alignment — include cases where the "obvious" answer is wrong), a `compare`
section on what each alignment gains and gives up, and a `keypoints` recap.

KB reading: `concepts/defensive-positioning.md`, `concepts/defensive-strategy.md`.

### `ch14` — Cutoffs, Relays & Backups · *Ball, base, backup — nobody stands still*

**The centrepiece chapter of this tier.** The three jobs: one player goes to the
ball, others cover bases, the rest back up. Cutoff responsibility by hit
location: who is the cut on a ball to left, to centre, to right; the first
baseman's role as cut on throws home; the relay on a ball in the gap; the
trailer. Where the cutoff sets up (aligned between the outfielder and the target)
and why the target position calls the throw. Backup responsibilities — the
pitcher backing up third and home, the right fielder backing up first on an
infield throw, outfielders backing each other. What happens when a cut is missed.

Must include: at least three `field` `diagram` sections with `roles` set to show
ball/base/backup assignments for different hit locations (use the `arrows` option
for the throw sequence), the `assignTheNine` `interactive` — the app's signature
widget — with **8–10 cases** covering ground balls, gap hits, line-drive
situations, and at least two with runners on, and a `keypoints` recap.

For the `assignTheNine` cases, each case object must carry the situation (hit
type, location, runners, outs) **and the correct role for all nine positions**,
plus a one-line rationale the widget shows after scoring. Get these right —
they are the hardest content in the app to fake and the easiest to get wrong.
Work them out from the KB page before writing them.

KB reading: `concepts/cutoffs-and-relays.md`, `concepts/defensive-positioning.md`,
`concepts/outfield-play.md`, `concepts/infield-play.md`.

### `ch15` — Baserunning IQ · *Leads, reads, steals, and first-and-third*

Primary and secondary leads and how they differ by division (some youth divisions
do not permit leading off at all — check the KB and put it in a `divisionnote`).
Reading the pitcher: what tells a runner it is a pitch and not a pickoff. Getting
a jump and what "stealing on the pitcher, not the catcher" means. Delayed steals.
Reading the ball off the bat as a runner on first vs second vs third — including
the freeze on a line drive. Tagging up and when to try. The first-and-third
situation from both sides: what the offence is trying to create and what the
defence's options are. Base coach communication and when to pick up the coach.

Must include: at least two `basePaths` or `field` `diagram` sections (one for
leads, one for first-and-third), the `stealRead` `interactive` (6–8 cases: given
a pitcher's move and a game state, go / hold / it's a balk), a `divisionnote` on
leading off and stealing by division, a `compare` on the first-and-third play
from offence and defence, and a `keypoints` recap.

KB reading: `concepts/base-stealing-and-leadoffs.md`,
`concepts/first-and-third-situations.md`, `concepts/tagging-up-and-reads.md`,
`concepts/base-coaching-duties.md`, `concepts/holding-runners-and-pickoffs.md`.

### `ch16` — Bunting & Small Ball · *Moving the runner, and when it is worth an out*

Bunting mechanics: pivot vs square, top hand behind the bat, bat angle, catching
the ball with the bat, and bunting only strikes. The bunt types and their intent —
**sacrifice** (give the out, take the base), **drag** (bunt for a hit, from the
left side), **push** (past the pitcher toward second), **squeeze** (safety vs
suicide), and the **slash/fake-bunt-swing**. Defending the bunt: who charges,
who covers, and the wheel play. The strategic question — when a sacrifice is
actually worth an out, given the score, the inning, the outs, and how likely the
next hitter is to drive a run in. Be honest that at higher levels the sacrifice
bunt is used less than it used to be, and say why.

Must include: at least two `diagram` sections (a `field` with `alignment:
'bunt-defense'` showing who charges and covers, plus one more), one `interactive`
(`makeTheCall` with `opts.mode: 'small-ball'`, or `spotTheAlignment` on bunt
defence — 6–8 cases), a `compare` of sacrifice vs swinging away in a specific
situation, a `coachnote` on teaching the bunt to younger players, and a
`keypoints` recap.

KB reading: `concepts/bunting.md`, `concepts/offensive-strategy.md`,
`concepts/defensive-strategy.md`.

---

## Acceptance

- `src/curriculum-t4.js` exists, is an ES5-safe IIFE, loads in Node, registers
  exactly `ch13`–`ch16`.
- Every chapter meets the brief-04a minimums (≥8 sections, ≥2 `diagram`,
  ≥1 `interactive`, 3–5 objectives, 6–8 `quizIds`, closing `keypoints`).
- `ch14` has ≥3 `field` diagrams with `roles` set and an `assignTheNine` widget
  with 8–10 fully specified cases (all nine roles per case + rationale).
- Every `svg` name/option exists in `svg.js`; every `widget` is from the approved
  sixteen; every interactive `opts` carries real, complete case content.
- Rules about leading off, stealing, and bunt legality come from the KB.
- No TODOs, no `...` placeholders.

## Report back

Same format as brief 04a, plus: the full role assignment table you used for each
`assignTheNine` case, and the KB page that justifies it.
