# Implementer Brief — Chunk A of B — the version system

## HARD CONSTRAINT: NO SHELL ACCESS

You have **Read, Write, Edit, and directory listing only**. Do **not** attempt
any command — not `ls`, not `node --check`, not `git`, not `npm`. A shell call
silently cancels this turn and wastes the run. The reviewer runs every check,
every test, and every git operation afterward.

The directories `scripts/`, `.githooks/`, and `docs/` already exist — I created
them for you. Just write files into them.

## Context

**Homerun Learn to Play** — a vanilla, build-step-free static web app for
Homerun Baseball Ottawa. Deployed to Netlify by continuous deployment from
GitHub: a push to `main` publishes the repo root with no build command.

**Read these before writing** — you are extending them, not replacing them:

- `version.js` — the current single source of truth (`APP_VERSION`,
  `DATA_VERSION`, `MIN_COMPATIBLE_DATA_VERSION`)
- `version.json` — the freshness probe the app fetches; currently
  `{ "version": "1.0", "released": "2026-08-19" }`
- `appUpdates.js` — **already implements** the What's-New modal, the update
  self-check, the version footer, and deferred-version handling. You are adding
  build-id comparison to its check, nothing more.
- `changelog.js` — the release register the What's-New modal and
  `changelog.html` both read
- `tests/versionCompat.test.js` — **read the "app version constants" section
  near line 225.** It already asserts that `version.js`, `package.json`,
  `version.json`, and the newest `changelog.js` entry all agree. That agreement
  is load-bearing; your bump script must maintain it.
- `package.json`, `deploy.sh`, `sw.js`, `netlify.toml`

**Reference design** (read for the *shape of the idea*, not to copy code — that
project is React/TypeScript/Vite and this one is vanilla ES5):

- `/Users/jschasse/Documents/JS Chassé/Projects/heat-advisory-app/scripts/bump-version.mjs`
- `/Users/jschasse/Documents/JS Chassé/Projects/heat-advisory-app/.githooks/pre-push`
- `/Users/jschasse/Documents/JS Chassé/Projects/heat-advisory-app/src/lib/buildInfo.ts`
- `/Users/jschasse/Documents/JS Chassé/Projects/heat-advisory-app/src/lib/version.ts`

## The problem this solves

Right now a push to `main` auto-deploys with `version.json` untouched. Two
materially different builds can both call themselves `1.0`, so the update check
has nothing to compare, and the What's-New modal never fires. The fix is to make
a version bump a required, one-command, enforced step of every deploy.

## Coding standards

- **App files** (`version.js`, `appUpdates.js`) are **ES5-safe**: `var`,
  `function` expressions, string concatenation. No `let`/`const`, arrow
  functions, template literals, `class`, destructuring, default parameters,
  optional chaining, `Array.prototype.includes`, `Object.assign`.
- **`scripts/*.mjs` and `tests/*.js`** run only under Node ≥18 — modern syntax
  is fine there.
- **`.githooks/pre-push`** is POSIX `sh`, not bash.
- House banner comment at the top of every file you create.
- No new dependencies. No network calls.

---

## 1. `version.js` — add build identity

Keep the existing three constants and the file's structure. Add two more:

- `BUILD_ID` — a short opaque identifier for this specific build (e.g. an
  8–12 character base36 or hex string). It changes on **every** bump.
- `BUILD_TIME` — the ISO-8601 timestamp the build was stamped.

**Critical:** the bump script and the git hook both parse `version.js` as text.
Keep the `APP_VERSION` assignment on its own line in exactly this literal shape,
and write `BUILD_ID` / `BUILD_TIME` in the same single-quoted, one-per-line form:

```js
  var APP_VERSION = '1.0';
  var BUILD_ID = 'k3f9a2b1';
  var BUILD_TIME = '2026-08-21T01:38:53Z';
```

Export all five on the returned object. Update the file's `HOW TO UPDATE`
comment to say that `npm run bump` maintains these and that the three literal
lines above are parsed by tooling, so their shape must not change.

Also fix the stale comment on line ~12 — it says "so practice.js and
versionCompat.js can read" and `practice.js` does not exist in this app.

## 2. `scripts/bump-version.mjs` — the one-command bump

`node scripts/bump-version.mjs` bumps the **minor** number; with `--major` it
bumps the major and resets the minor to zero.

```
1.0  --minor(default)-->  1.1
1.4  --major           -->  2.0
1.9  --minor           -->  1.10     (integers, not decimals — 1.10 > 1.9)
```

In a **single run** it must update all of:

| File | Field | New value |
|---|---|---|
| `version.js` | `APP_VERSION` | the bumped `<major>.<minor>` |
| `version.js` | `BUILD_ID` | a freshly generated id |
| `version.js` | `BUILD_TIME` | now, ISO-8601 |
| `package.json` | `version` | `<major>.<minor>.0` |
| `version.json` | `version` | the bumped version |
| `version.json` | `released` | today's **local** calendar date, `YYYY-MM-DD` |
| `version.json` | `buildId` | the same id written to `version.js` |
| `version.json` | `buildTime` | the same timestamp written to `version.js` |

Requirements:

- Use the **local** calendar date, not UTC — a late-evening bump must not be
  stamped with tomorrow's date.
- Edit `version.js` by regex-replacing the three literal lines, not by
  regenerating the file, so the diff stays readable and the comments survive.
- If any expected line is missing, **fail with a clear message naming the exact
  line shape to restore** and change nothing. Never write a partial update: read
  and validate everything first, then write.
- Preserve `package.json`'s existing key order and two-space indentation.
- **After writing**, check `changelog.js` for an entry whose `version` equals the
  new version. If there is none, print an actionable message — naming the file,
  the version, the required entry shape, and the fact that
  `tests/versionCompat.test.js` will fail until it exists — and
  **`process.exit(1)`**. The version files stay bumped; only the exit code
  signals the missing notes. Say so explicitly in the message so the operator
  is not confused about state.
- Print the transition (`bump-version: 1.0 → 1.1 (build k3f9a2b1, released 2026-08-21)`).
- Support `--dry-run`, printing what would change without writing.

## 3. `package.json` — scripts

Add, preserving existing keys and ordering:

```json
"bump": "node scripts/bump-version.mjs",
"bump:major": "node scripts/bump-version.mjs --major",
"prepare": "git config core.hooksPath .githooks 2>/dev/null || true"
```

The `prepare` script wires the hook up automatically on `npm install`.

## 4. `.githooks/pre-push` — refuse an un-bumped deploy

POSIX `sh`. Refuses a push to `main` whose `APP_VERSION` is not strictly greater
than the version currently on the remote.

**Why a check and not an automatic bump** — document this in a header comment:
git has already decided which refs to send by the time `pre-push` runs, so a
commit created here would sit unpushed and the very next push would fail. The
hook blocks; `npm run bump` does the edit.

Behaviour, reading the standard `pre-push` stdin lines
(`<local_ref> <local_sha> <remote_ref> <remote_sha>`):

- Only applies to `refs/heads/main`; every other ref passes through.
- Skip branch **deletions** (local sha all zeros).
- **Creating** `main` (remote sha all zeros): accept, print the version.
- Read `APP_VERSION` from the *committed* file at each sha via
  `git show <sha>:version.js`, parsing
  `var APP_VERSION = '<major>.<minor>';` with `sed`.
- If the version cannot be read from the **local** commit: **block**, with a
  message naming the exact line shape to restore.
- If it cannot be read from the **remote** commit (shallow clone, unfetched
  object, history predating this scheme): **warn and allow** — failing to check
  is not evidence of a missing bump.
- Compare major then minor as **integers** using `awk`, so `1.10` beats `1.9`.
- On failure, print the two versions and the exact remedy:
  `npm run bump && git commit -a --amend --no-edit`, or committing the bump
  separately.
- Exit 0 on success.

## 5. `version.json` — add build identity

Extend to:

```json
{
  "version": "1.0",
  "released": "2026-08-19",
  "buildId": "<id matching version.js>",
  "buildTime": "<ISO-8601 matching version.js>"
}
```

Fill `buildId` / `buildTime` with values that match what you write into
`version.js`. Do **not** change `version` or `released` — this chunk ships as
1.0; the reviewer runs the first real bump.

## 6. `appUpdates.js` — compare build id as well as version

Find `checkForUpdate` and its `version.json` handler. Today it only compares the
version label, so a redeploy at the same version is invisible.

Add build-id comparison with these exact semantics:

- Stale when the deployed `buildId` differs from the running `BUILD_ID`.
- **Identity comparison, never ordering** — build ids are not sortable, and a
  rollback is as much a mismatch as a roll-forward.
- If the deployed build id is **absent, empty, or not a string**, that is "no
  information": never report staleness on it. A failed or malformed check must
  be silent, not a spurious "update available".
- Keep the existing version-label comparison; the update is offered when
  *either* signal fires.
- Keep the existing deferred-version behaviour ("Later" suppresses the prompt
  for that version) and extend it so deferring also suppresses re-prompting for
  the same build id in that session.
- Everything stays guarded: `file://` still returns early, offline still returns
  early, a malformed JSON body must not throw.

Write a short comment block explaining why identity-not-ordering is correct.

## 7. `deploy.sh` — verify before deploying

Before invoking `netlify deploy`, verify that `version.js`, `package.json`, and
`version.json` agree on the version, and abort with a clear message if they do
not. Use `node -e` for the parsing. Keep the existing deploy command and its
commit-message behaviour.

Add a comment noting that the normal path is `git push` (Netlify CD) and this
script is the manual fallback.

## 8. `sw.js` — precache list

Add any newly created runtime file to `ASSETS`. **`/version.json` must stay out
of the list** — it is the freshness probe and must always come from the network.
Keep the existing comment saying so, the cache name, and the event handlers.
`scripts/`, `.githooks/`, `docs/`, and `tests/` are not runtime assets — do not
add them.

## 9. `docs/VERSIONING.md`

Document the release procedure:

- What `APP_VERSION`, `DATA_VERSION`, `BUILD_ID`, and `BUILD_TIME` each mean and
  when each moves.
- **Minor vs major:** minor for any routine release; major is a deliberate call
  the app owner makes (`npm run bump:major`), typically for a significant
  content or behaviour change.
- The release procedure end to end: write the `changelog.js` entry → `npm run bump`
  → verify `npm test` → commit → push (Netlify deploys automatically).
- That release notes are **required** — the bump script exits non-zero and the
  test suite fails without an entry for the shipping version.
- How `.githooks/pre-push` enforces the bump, how to install it
  (`npm install`, or `git config core.hooksPath .githooks`), and what to do when
  it blocks you.
- That `DATA_VERSION` is independent and only moves on a backup-schema change.

## 10. `tests/version.test.js`

Plain Node, zero dependencies, matching the house style of the existing test
files — a local assert helper, one line per assertion, and the
`global.__HRL_TEST_RUNNER` registration epilogue that the other test files use
(**read `tests/quiz.test.js`'s last 12 lines and copy that pattern exactly**, or
`run-all.js` will not count your file).

Assert:

1. `version.js` exposes `APP_VERSION`, `DATA_VERSION`,
   `MIN_COMPATIBLE_DATA_VERSION`, `BUILD_ID`, and `BUILD_TIME`.
2. `BUILD_ID` is a non-empty string; `BUILD_TIME` parses as a valid date.
3. The three tooling-parsed literal lines in `version.js` match the exact
   regexes the bump script and the hook use — read the file as **text** and
   assert the patterns, so a reformat that would break tooling fails here first.
4. Integer version comparison: `1.10` is newer than `1.9`; `2.0` is newer than
   `1.99`; equal versions compare equal.
5. Build-id staleness: differing ids are stale; identical are not; `null`,
   `undefined`, `''`, and a non-string are never stale.
6. `version.json`'s `buildId` and `buildTime` match `version.js`'s.

If the staleness logic lives inside `appUpdates.js`'s IIFE and is not reachable
from Node, **export it** on `window.HRL_APP_UPDATES` (add it to the returned
object) so the test can reach it, and load the file the way
`tests/versionCompat.test.js` loads `version.js` — with `new Function('window', code + '; return window.X')`.

## 11. `tests/versionCompat.test.js`

**Add** to the existing "app version constants" section — do not restructure it:

- `version.json` carries a non-empty string `buildId` and a parseable `buildTime`.
- `version.json`'s `buildId` equals `version.js`'s `BUILD_ID`.

Leave every existing assertion exactly as it is.

## Acceptance for this chunk

- Every file above exists with real, complete content — no TODOs, no `...`
  placeholders, no stubbed function bodies.
- `version.js` and `appUpdates.js` remain ES5-safe and parse.
- The bump script updates all eight fields in one run, validates before writing,
  uses the local calendar date, supports `--major` and `--dry-run`, and exits
  non-zero when release notes are missing.
- The hook is POSIX `sh`, compares integers, blocks an un-bumped push to `main`,
  allows branch creation, and warns-and-allows on an unreadable remote.
- The update check treats build ids by identity and stays silent on absent or
  malformed values.
- `sw.js` still excludes `/version.json`.
- New tests register with `global.__HRL_TEST_RUNNER`.

## Report back (required — end your turn with this)

1. The exact `BUILD_ID` and `BUILD_TIME` you wrote into `version.js` and `version.json`.
2. The exact regexes your bump script and your hook use to parse `version.js`.
3. The full public API of `HRL_APP_UPDATES` after your change, flagging anything
   newly exported for testability.
4. The `ASSETS` array as you left it.
5. Every assertion you added, per test file.
6. Anything in this brief that conflicted with what you found on disk, and how
   you resolved it.
