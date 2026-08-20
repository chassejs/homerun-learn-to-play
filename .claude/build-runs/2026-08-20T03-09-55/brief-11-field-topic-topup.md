# Implementer Brief — Chunk 11 — top up the `field` topic in the question bank

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## The problem

The finished question bank has **356 questions** and passes every validity check
except one: the acceptance criteria require **≥15 questions per topic**, and the
topic `field` currently has only **12**.

The adaptive Baseball IQ test forces coverage of ≥8 distinct topics across its 20
questions, so a thin topic gets drawn from disproportionately and its questions
start repeating between attempts. Twelve is not enough depth.

Current topic counts, for context:

```
analytics=16  baserunning=24  field=12   fielding=38  hitting=35  pitching=24
positions=26  rules=83        safety=22  scoring=27   scouting=16 strategy=33
```

## The fix

Add **five new questions with `topic: 'field'`** — bringing the total to 17, a
sensible margin above the threshold rather than scraping it.

### Where they go

Append them to **`src/questions-t1.js`** (chapter `ch02`, "The Field", is the
natural home) and/or **`src/questions-t2.js`**. Use `Edit` to extend the existing
`register([...])` array — do not rewrite either file.

**Read the file first** to find the highest existing index for the chapter you
are appending to, and continue from there. If `ch02` currently ends at `q0215`,
your new ones are `q0216`, `q0217`, and so on. **Do not reuse an existing id and
do not touch any question already in a chapter's `quizIds`.**

### What they should test

Not more of the same. The existing `field` questions cover the basic parts of the
diamond. Go after the things a learner still gets wrong after Chapter 2:

1. **Fair vs foul on a bounding ball** — a ball that lands fair in the infield and
   then rolls foul before passing first or third, versus one that passes the base
   in fair territory. This is the single most misunderstood field-geometry rule.
2. **The foul pole** — that it is in fair territory despite the name, and a ball
   striking it is fair.
3. **Field dimensions by division** — a real comparison from
   `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/concepts/field-dimensions-by-division.md`.
   **Read the page; use its real distances.** Do not write a number from memory.
4. **The running lane / the area around first base**, or the batter's box
   boundaries — where a foot may and may not be.
5. **A `hotspot` question** on the `field` diagram — ask the learner to click a
   part of the field. Confirm every id you use against `HRL_SVG.FIELD_PARTS` in
   `svg.js`.

### Conventions

Everything in
`.claude/build-runs/2026-08-20T03-09-55/brief-06-questions-conventions.md`
applies unchanged — the object shape, the quality rules, plausible distractors
built from real misconceptions, an `explain` that teaches, and a `source` slug.

Additional constraints for these five:

- `topic` is `'field'` on all five.
- `tier` must match the chapter's tier (`'rookie'` for `ch02`, `'sandlot'` for a
  ch05–ch08 chapter).
- Spread `difficulty` across roughly 2–6 — these are field-geometry questions, and
  the fair/foul bounding-ball one earns a 5 or 6.
- Vary the correct-answer index; do not put them all at the same position.
- At least one `hotspot` type among the five.

## Acceptance

- Exactly five new questions added, all with `topic: 'field'`.
- The bank's `field` count reaches 17 and every other topic count is unchanged.
- All new ids are unique, match `/^q\d{4}$/`, and continue their chapter's
  existing sequence without colliding with anything.
- No existing question is modified, and no chapter's `quizIds` list changes.
- Every `answer` is a valid index; every `explain` is non-empty and explanatory;
  every `hotspot` target exists in `HRL_SVG.FIELD_PARTS`.
- Both files still parse.

## Report back

1. The five new question ids, with their chapter, tier, type, difficulty, and a
   one-line summary of what each tests.
2. The field-dimension figures you used and the KB page you read them from.
3. The `hotspot` question's `targets` and `opts.hotspots`.
4. Confirmation that no existing question or `quizIds` list was touched.
