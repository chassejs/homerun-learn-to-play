# Implementer Brief — Chunk 3 of 9 — `progress.js` + `shell.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command —
not `ls`, not `node --check`, not `git`, not `npm`. A shell call silently
cancels this turn. The reviewer runs every check afterward.

## Context

**Homerun Learn to Play** — progressive interactive baseball curriculum app for
Homerun Baseball Ottawa. Authoritative spec: `docs/BUILD-PLAN.md` (read §7
Progress/storage and §8 Views).

Already built and on disk — **read these before writing**:
- `index.html` — the shell markup. All eight `.view` sections, the six nav
  buttons (`data-view` = `home|path|iq|review|glossary|help`), the six render
  roots (`#path-root`, `#chapter-root`, `#quiz-root`, `#iq-root`, `#review-root`,
  `#glossary-root`), the home placeholders `#home-continue` and `#home-tier-rail`,
  the buttons `#home-placement-btn` and `#home-browse-btn`, plus
  `#modal-root` and `#toast-root`.
- `styles.css` — the design system. Use its existing class names; do not invent
  a parallel set.
- `svg.js` (`HRL_SVG`) — diagram builders, already written in Chunk 2.
- `version.js` (`HRL_VERSION`) — `APP_VERSION`, `DATA_VERSION`,
  `MIN_COMPATIBLE_DATA_VERSION`.
- `versionCompat.js` (`HRL_VERSION_COMPAT`) — **read its public API carefully**
  and use it for import validation rather than reimplementing version checks.
- `uiModal.js` (`HRL_MODAL`) — the modal helper; use it for confirms and dialogs.
- `appUpdates.js` (`HRL_APP_UPDATES`) — already reads the storage key
  `homerun-learn/progress/v1`. Your `progress.js` **must use that exact key.**

## Coding standards (unchanged)

- One IIFE per file assigning exactly one `window.HRL_*` global. `'use strict';`.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, or
  `Object.assign` (write a local `extend()`).
- House banner comment at the top of each file.
- No dependencies, no network calls, no external URLs.

## `progress.js` — `HRL_PROGRESS`

### Must be loadable in Node (the test suite requires it)

Start with:
```js
var root = typeof window !== 'undefined' ? window : this;
```
assign to `root.HRL_PROGRESS`, and end with:
```js
if (typeof module !== 'undefined' && module.exports) { module.exports = root.HRL_PROGRESS; }
```
Guard **every** `localStorage` access in try/catch and every `document` access
behind `typeof document !== 'undefined'`. Under Node with no `localStorage`, the
module must load and all pure functions must work.

### Storage

- Key: `'homerun-learn/progress/v1'` (exactly — `appUpdates.js` depends on it).
- If `localStorage` is unavailable or throws (Safari private mode), fall back to
  an in-memory store, set an internal `storageAvailable = false` flag, expose it
  via `HRL_PROGRESS.storageAvailable()`, and never throw. `shell.js` shows a
  one-time dismissible notice when it is false.

### State shape (create this exact structure by default)

```js
{
  version: '1.0',            // from HRL_VERSION.DATA_VERSION
  placement: { done: false, recommendedTier: 1, role: null, goal: null,
               experience: null, theta: 0, takenAt: null },
  chapters: {},              // chapterId -> { visited, completed, bestScore,
                             //                attempts, completedAt, lastSeenAt }
  badges: [],                // array of badge id strings
  review:  [],               // [{ qid, box, dueAt, lastResult, misses }]
  iq: { attempts: [], best: null },   // attempts: [{ takenAt, bbiq, band, byTopic, answers }]
  streak: { current: 0, longest: 0, lastActiveDay: null },  // lastActiveDay = 'YYYY-MM-DD'
  settings: { timerEnabled: true, reducedMotion: false, textSize: 'normal' }
}
```

Missing keys in a loaded state must be filled from the default (defensive
merge on load) so an older or partial payload never causes a crash.

### API — implement every one of these exactly

**Lifecycle**
- `load()` → loads from storage (or returns the in-memory state), fills defaults, returns state
- `get()` → current in-memory state
- `save()` → persists; returns `true`/`false`
- `reset()` → replaces with a fresh default state and saves
- `storageAvailable()` → bool

**Placement**
- `isFirstRun()` → true when `placement.done` is false and no chapter has been visited
- `setPlacement(obj)` → merges `{ recommendedTier, role, goal, experience, theta }`, sets `done: true` and `takenAt`, saves
- `getPlacement()` → the placement object

**Chapters**
- `markVisited(chapterId)` → sets `visited: true`, updates `lastSeenAt`, saves
- `recordQuiz(chapterId, scorePct, passed)` → increments `attempts`, raises
  `bestScore` only if higher, sets `completed: true` (sticky — never back to
  false) and `completedAt` on the first pass, awards the chapter badge, saves.
  Returns `{ bestScore, completed, newlyCompleted, badgesAwarded }`.
- `getChapter(chapterId)` → the chapter record (default-filled, never undefined)
- `isComplete(chapterId)` → bool
- `tierProgress(tierKey)` → `{ total, complete, pct }` (pct 0–100 integer)
- `overallProgress()` → `{ total, complete, pct }`
- `nextChapter()` → the chapter id to resume: the first incomplete chapter at or
  after the recommended tier's first chapter; if all of those are complete, the
  first incomplete chapter anywhere; if everything is complete, `null`.

Chapter/tier lookups read `window.HRL_CURRICULUM` when it exists. Under Node
(where it may not), these functions must degrade gracefully and return zeroed
results rather than throwing.

**Review deck (Leitner)**
- `BOX_INTERVALS` → the literal array `[1, 3, 7, 16, 35]` (days), exported
- `addMiss(qid, nowMs)` → adds the question at box 1 due in 1 day, or, if already
  present, resets it to box 1 due in 1 day and increments `misses`
- `recordReview(qid, correct, nowMs)` → correct promotes the box by 1 (capped at
  5) and reschedules by `BOX_INTERVALS[box - 1]` days; wrong resets to box 1 due
  in 1 day and increments `misses`. An entry answered correctly at box 5 is
  **retired** (removed from the deck). Returns the updated entry or `null` if retired.
- `dueReviews(nowMs)` → array of qids with `dueAt <= nowMs`, oldest due first
- `reviewCounts(nowMs)` → `{ due, total }`

Day arithmetic uses exact 24h milliseconds (`86400000`), not calendar math.

**Baseball IQ**
- `recordIq(attempt)` → pushes `{ takenAt, bbiq, band, byTopic, answers }`, updates
  `iq.best` when higher, awards `iq-first` always and `iq-elite` at bbiq ≥ 125, saves
- `iqHistory()` → attempts, newest first
- `bestIq()` → the best attempt or `null`

**Badges**
- `awardBadge(id)` → adds if absent, saves, returns true if newly awarded
- `hasBadge(id)` / `badges()`
- Badge ids: `'chapter-<chapterId>'` per chapter, `'tier-<tierKey>'` when every
  chapter in a tier is complete, `'iq-first'`, `'iq-elite'`, `'perfect-quiz'`
  (a 100% chapter quiz), `'streak-3'`, `'streak-7'`, `'streak-30'`.
- `checkTierBadges()` → awards any tier badge now earned; called from `recordQuiz`

**Streak**
- `touchStreak(nowMs)` → compares today's local `YYYY-MM-DD` with `lastActiveDay`:
  same day → no change; exactly one day later → `current + 1`; any larger gap →
  `current = 1`. Updates `longest`, awards streak badges at 3/7/30, saves.
  Returns `{ current, longest, changed, badgesAwarded }`.

**Settings**
- `getSetting(key)`, `setSetting(key, value)` (saves)

**Backup — these must be pure and independently testable**
- `exportPayload()` → the envelope
  ```js
  { app: 'homerun-learn-to-play',
    appVersion: HRL_VERSION.APP_VERSION,
    dataVersion: HRL_VERSION.DATA_VERSION,
    exportedAt: <ISO string>,
    data: <state> }
  ```
- `exportFilename(date)` → `'homerun-learn-progress-YYYY-MM-DD.json'`
- `mergeState(current, incoming)` → **pure function, no storage, no globals.**
  Merge rules, exactly:
  - `chapters`: union by id. `bestScore` = max. `attempts` = sum. `completed` =
    logical OR (sticky true). `completedAt` = the earlier of the two non-null
    values. `visited` = OR. `lastSeenAt` = the later.
  - `badges`: set union, order preserved (current first, then new ones).
  - `review`: union by `qid`. On conflict keep the entry with the **later**
    `dueAt`; `misses` = max; `box` = the box from the kept entry.
  - `iq.attempts`: concatenate, then dedupe by `takenAt`, sorted newest first.
    `iq.best` = the higher `bbiq`.
  - `streak`: `longest` = max; `current` and `lastActiveDay` from whichever side
    has the later `lastActiveDay`.
  - `placement`: keep the one with the later `takenAt`; if only one is `done`, keep that one.
  - `settings`: incoming wins for keys it defines; current keeps the rest.
  - Neither input is mutated.
- `importPayload(obj)` → validates through `HRL_VERSION_COMPAT` (use its real
  API — read `versionCompat.js`), then merges via `mergeState`, saves, and returns
  `{ ok: true, message: '<human summary of what merged>' }` or
  `{ ok: false, message: '<clear reason>' }`. **Never throws** — malformed JSON,
  a payload from a different app, a missing `data` key, a `null`, a string, an
  array, or a future `dataVersion` all return `{ ok: false }` with a useful message.
- `importText(jsonString)` → parses with try/catch then calls `importPayload`

## `shell.js` — `HRL_SHELL`

Browser-only (no Node export needed). Owns navigation and cross-view plumbing.

**API**
- `init()` → wires everything; called on `DOMContentLoaded`
- `showView(name, opts)` → toggles `.active` on `.view` sections and `.nav-btn`
  buttons, moves focus to the newly shown view's heading (`tabindex="-1"` set
  programmatically), scrolls to top, and fires the `viewchange` event.
  `view-chapter` and `view-quiz` have no nav button — showing them clears the
  active state from all nav buttons **except** `path`, which stays highlighted
  as the section the reader belongs to.
- `openChapter(chapterId)` → calls `HRL_LEARN.renderChapter(chapterId)` if it
  exists, then `showView('chapter')`, and `HRL_PROGRESS.markVisited(chapterId)`
- `openQuiz(chapterId)` → calls `HRL_QUIZ.start(chapterId)` if it exists, then `showView('quiz')`
- `current()` → the active view name
- `toast(message, kind)` → renders a `.toast` into `#toast-root`
  (`kind` = `'info' | 'success' | 'warn' | 'error'`), auto-dismisses after ~4s,
  and is announced by the existing `aria-live` region
- `on(eventName, fn)` / `off(eventName, fn)` → minimal event bus supporting
  `'viewchange'`; other modules subscribe to re-render on entry
- `renderHome()` → fills `#home-continue` and `#home-tier-rail`:
  - **Continue card**: when `HRL_PROGRESS.nextChapter()` returns an id, show the
    chapter title, its tier, overall progress as a `.progress-bar`, and a
    "Continue" button that opens it. When everything is complete, show a
    congratulations state pointing at the Baseball IQ test. On a true first run,
    show the placement invitation instead.
  - **Tier rail**: one `.tier-rail-item` per tier with its name, chapter count,
    completion ring, and a click that opens My Path scrolled to that tier.
- `renderSettings()` → the settings controls live in the Help view; append a
  "Your progress" panel to `#view-help` containing: Export (downloads the JSON
  via a Blob + object URL), Import (a file input that reads the file and calls
  `HRL_PROGRESS.importText`, reporting the result via `toast`), Reset progress
  (confirm through `HRL_MODAL` first), a Reduced-motion toggle (adds/removes
  `body.reduced-motion` and persists via `setSetting`), a quiz-timer toggle, and
  a "Re-run placement" button.

**Wiring `init()` must do**
1. `HRL_PROGRESS.load()`; apply `settings.reducedMotion` to `document.body`.
2. Bind every `.nav-btn` and every element carrying `data-view` (including
   `#home-browse-btn` and the `.quick-link-card` buttons) to `showView`.
3. Bind `#home-placement-btn` to `HRL_PLACEMENT.start()` when it exists.
4. `HRL_PROGRESS.touchStreak(Date.now())`; if a streak badge was newly awarded, `toast` it.
5. On first run (`HRL_PROGRESS.isFirstRun()`), start placement automatically —
   but only after the home view has rendered, and always offer a visible skip.
6. When `HRL_PROGRESS.storageAvailable()` is false, show a single dismissible
   `.toast` of kind `warn` explaining that progress will not survive a reload.
7. Call `renderHome()` and `renderSettings()`, and re-run `renderHome()` on
   every `viewchange` back to `home`.
8. Lazily call the owning module's render function on entry to each view:
   `path` → `HRL_LEARN.renderPath()`, `iq` → `HRL_IQ.renderIntro()`,
   `review` → `HRL_QUIZ.renderReviewDeck()`, `glossary` → `HRL_LEARN.renderGlossary()`.
   Every one of these calls must be guarded — a module that has not loaded yet
   must produce a friendly `.empty-state`, never a thrown error.
9. Keyboard: `Escape` closes any open modal via `HRL_MODAL`.

## Acceptance for this chunk

- Both files exist, are ES5-safe single IIFEs, and define every API name above.
- `progress.js` loads under Node with no `window`, no `document`, and no
  `localStorage`, and `mergeState`, `exportFilename`, `exportPayload`,
  `BOX_INTERVALS`, and the Leitner functions all work there.
- No `localStorage` or `document` access outside a guard.
- `importPayload` returns `{ ok: false }` rather than throwing for: `null`,
  `undefined`, `'not json'`, `[]`, `{}`, `{ app: 'something-else' }`,
  and a payload whose `dataVersion` is newer than `MIN_COMPATIBLE_DATA_VERSION` allows.
- `mergeState` does not mutate either argument.
- No TODOs, no `...` placeholders, no stubbed function bodies.

## Report back (required)

End your turn with:

1. The complete exported API of `HRL_PROGRESS` and of `HRL_SHELL` — every
   function name with its parameters and return shape.
2. The exact default state object you create.
3. The exact badge id strings you generate.
4. The `viewchange` event payload shape and how other modules should subscribe.
5. Every function you call on another `HRL_*` module, with the exact signature
   you assumed — so the chunks that build those modules match your expectations.
6. Any deviation from this brief, and why.
