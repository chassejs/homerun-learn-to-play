# Homerun Learn to Play

A progressive, interactive baseball curriculum for Homerun Baseball Ottawa.
It takes a learner from “I have never seen a game” to “I can read a scouting
report and grade a tool on the 20–80 scale.”

Everything runs in the browser — no account, no install beyond what you
choose to pin to your home screen, no internet after the first load.

## How to open

Double-click **`index.html`**. It runs entirely in your browser — no install,
no server, no internet connection required after the first load. (Chrome,
Edge, Safari, or Firefox.)

Or, from this directory:

```
npm start
```

That serves the folder at `http://localhost:3000`. There is no build step;
`npm run build` is a no-op.

All your data is saved automatically in that browser's local storage on this
computer. There is no cloud and no account.

> **Important:** because data lives in *this browser on this computer*, it is
> not automatically shared between devices, and clearing your browser data
> will erase it. Use **Export** regularly (see below) to keep a backup file.

## Placement quiz

The first time you open the app, a short placement quiz finds a starting
point: three questions about you (role, experience, goal), then eight
adaptive baseball questions. Coaches are never placed below Diamond (tier 3).
You can skip it and start from Rookie, and you can re-run it later from Home.

Every chapter stays unlocked. Placement only highlights where to start.

## The six tiers and 24 chapters

**Tier 1 — Rookie** — for someone who has never watched a game.

1. What Baseball Is
2. The Field
3. The Nine Positions
4. Gear, Safety & the Homerun Way

**Tier 2 — Sandlot** — the rules of play, for a first-season player or parent.

5. Balls, Strikes & the Count
6. Getting On, Getting Out
7. Running the Bases
8. How a Game Is Played and Won

**Tier 3 — Diamond** — how to actually play each position.

9. Hitting Fundamentals
10. Throwing & Catching
11. Playing the Infield
12. The Outfield & Pitching Basics

**Tier 4 — Select** — situations, systems, and team defence.

13. Defensive Positioning
14. Cutoffs, Relays & Backups
15. Baserunning IQ
16. Bunting & Small Ball

**Tier 5 — Elite** — the rulebook’s hard parts and game management.

17. The Tricky Rules
18. Pitching Strategy
19. Hitting Approach
20. Managing the Game

**Tier 6 — Pro Mind** — scoring, analytics, scouting, and the rulebook’s edges.

21. Reading the Game
22. Analytics Foundations
23. Scouting & Player Development
24. The Rulebook’s Edges

Each chapter has short lessons, SVG diagrams, and at least one interactive
exercise. The last section is a keypoints recap, then the chapter quiz.

## Chapter quizzes

Each chapter ends in a retention quiz (six to eight questions from a 300+
question bank). **75% is the pass line** — exactly 75% passes; 74% does not.
You can retake as often as you like; the best score is kept. Every miss is
saved for review.

## Review deck

Missed questions come back on a spaced schedule (Leitner boxes):

| Box | Due after |
|---|---|
| 1 | 1 day |
| 2 | 3 days |
| 3 | 7 days |
| 4 | 16 days |
| 5 | 35 days |

A correct answer promotes one box (capped at 5). A miss resets the card to
box 1. Open **Review** from the nav when cards are due.

## Baseball IQ

A separate 20-question adaptive test, not a chapter quiz. Questions get a
little harder when you are right and a little easier when you are not. There
is no right/wrong feedback until the end.

Your score is **BBIQ on a 40–160 scale**:

| BBIQ | Band |
|---|---|
| 40–69 | Rookie |
| 70–89 | Sandlot |
| 90–109 | Diamond |
| 110–124 | Select |
| 125–139 | Elite |
| 140–160 | Pro Mind |

The result card shows a per-topic radar and points you at chapters for the
weaker topics. Turn the 45-second timer off for relaxed mode.

## Progress, export, and import

Your path, quiz scores, review deck, and Baseball IQ history live in
**this browser on this device**. There is no account and no cloud copy.

- **Export** downloads a `homerun-learn-progress-YYYY-MM-DD.json` file.
  Keep it somewhere safe, or copy it to another device.
- **Import** reads a file you exported earlier and *merges* it with what is
  already here: higher quiz scores win, completed chapters stay completed,
  review items keep the later due date, and IQ attempts concatenate.

Export before you clear browser data, switch devices, or update the app if
you want a belt-and-suspenders copy.

## Accessibility

- Semantic landmarks and real focusable controls, not clickable `div`s.
- Every diagram is `role="img"` with a `<title>` and `<desc>`.
- Quiz results are announced with `aria-live`.
- Colour is never the sole carrier of meaning.
- Touch targets are at least 44×44px.
- All sixteen interactive widgets can be completed with the keyboard alone.
- `prefers-reduced-motion` is honoured (including the IQ countdown — no
  spinning animation when you have asked for reduced motion).

## Content provenance

Baseball rules, mechanics, and division-specific variations are written from
the Youth Baseball Canada knowledge base
(`/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`). Where a rule
differs between Little League and Baseball Canada pathways, the split is
stated explicitly.

The visual identity follows the Homerun Baseball Ottawa brand guidelines
(`/Users/jschasse/knowledge-base/homerun-ottawa/brand/`) — navy `#062448`,
red `#a3301f`, cream `#f6f3ec`. Do not change these five hex values; see
[`styles.css`](styles.css). Optional raster hero art (see
[`design/hero-image-prompts.md`](design/hero-image-prompts.md)) degrades to
an SVG fallback; the app never depends on those images being present.

Youth imagery is limited to the approved brand assets; no identifiable
child faces.

## Tests

```
npm test
```

That runs `node tests/run-all.js`: a plain Node suite with zero
dependencies (Node ≥18). It checks syntax, curriculum integrity, the
question bank, the quiz engine, placement, Baseball IQ scoring, progress
merge/import, and version compatibility.

## Deploy to Netlify from GitHub

There is no build command. Netlify publishes the repo root.

1. Push this repo to GitHub (for example `chassejs/homerun-learn-to-play`).
2. Create a Netlify site linked to that repo.
3. Set **Build command** to empty (or leave the no-op `npm run build`).
4. Set **Publish directory** to `.`
5. Deploy. Confirm the live URL loads Home, one chapter, and one quiz.

`netlify.toml` already sets `publish = "."` and cache headers so
`/version.json` is never cached (it is the in-app freshness probe).
