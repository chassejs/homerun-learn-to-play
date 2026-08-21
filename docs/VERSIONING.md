# Versioning

Homerun Learn to Play ships as a static site with no build step. A push to
`main` is a deploy, so every deploy must carry a distinguishable version.
`npm run bump` is the one-command stamp; `.githooks/pre-push` refuses a
push to `main` that skips it.

## What each constant means

All of these live in `version.js` (`window.HRL_VERSION`). `npm run bump`
maintains `APP_VERSION`, `BUILD_ID`, and `BUILD_TIME` together with
`package.json` and `version.json`. `DATA_VERSION` is independent and is
never touched by the bump.

| Constant | What it is | When it moves |
|---|---|---|
| `APP_VERSION` | Human-facing release label, `<major>.<minor>` (for example `1.0`, `1.10`). Shown in the footer, the What's-New modal, and every backup. | Every release, via `npm run bump` (minor) or `npm run bump:major`. |
| `BUILD_ID` | Short opaque id for this specific build (8–12 character hex). Compared by **identity**, never ordering, against `version.json`'s `buildId`. | Every bump, even when the human-facing label also moves. |
| `BUILD_TIME` | ISO-8601 UTC timestamp the build was stamped. | Every bump, with `BUILD_ID`. |
| `DATA_VERSION` | Schema of the exported JSON backup. Embedded in every backup file. | Only when the backup payload shape changes in a way that could break a restore. Hand-edit; do not use `npm run bump`. |
| `MIN_COMPATIBLE_DATA_VERSION` | Oldest `DATA_VERSION` this build can import (after the migration chain in `versionCompat.js`). | Raise it when a breaking schema change makes older files unrestorable. |

`package.json`'s `"version"` is `APP_VERSION` with a patch of `0`
(`1.10` → `1.10.0`). `version.json` is the freshness probe the running
app fetches: it carries `version`, `released` (local calendar date
`YYYY-MM-DD`), `buildId`, and `buildTime`. Those four fields must agree
with `version.js` after every bump. `/version.json` is never precached
and is served `Cache-Control: no-store` so the update check always
sees the deployed copy.

## Minor vs major

- **Minor** (`npm run bump`) is the default for any routine release:
  content, copy, bug fixes, and ordinary behaviour changes. `1.0` →
  `1.1`; `1.9` → `1.10`. The numbers are integers, not decimals —
  `1.10` is newer than `1.9`.
- **Major** (`npm run bump:major`) is a deliberate call the app owner
  makes, typically for a significant content or behaviour change.
  `1.4` → `2.0`. The minor number resets to zero.

Do not hand-edit `APP_VERSION`. The bump script is what keeps
`version.js`, `package.json`, and `version.json` in agreement; the
test suite fails if they drift.

## Release procedure

1. **Write the release notes first.** Prepend a newest-first object to
   the array in `changelog.js` (and update the hand-maintained
   `CHANGELOG.md` mirror). The What's-New modal and `changelog.html`
   both read `changelog.js`. Required shape:

   ```js
   {
     version: '1.1',
     date: 'YYYY-MM-DD',
     type: 'minor',   // or 'major'
     title: '<short title>',
     highlights: ['<what changed>']
   }
   ```

2. **Stamp the version.** `npm run bump` (or `npm run bump:major`).
   That updates all eight fields in one run: `APP_VERSION`, `BUILD_ID`,
   `BUILD_TIME` in `version.js`; `package.json` `"version"`; and
   `version.json`'s `version`, `released`, `buildId`, and `buildTime`.
   Use `--dry-run` to print the transition without writing.

3. **Verify.** `npm test`. `tests/versionCompat.test.js` asserts that
   `version.js`, `package.json`, `version.json`, and the newest
   `changelog.js` entry all agree.

4. **Commit** the bump and the notes together.

5. **Push to `main`.** This publishes nothing — `main` is not
   Netlify's production branch. Work accumulates here freely.

6. **Promote to deploy.** This is the deploy:

   ```
   git push origin main:deploy
   ```

   The `pre-push` hook runs preflight and checks the version increased
   over what is already deployed, then Netlify publishes the `deploy`
   branch. `./deploy.sh` remains available as a cheaper direct upload
   that bypasses Netlify's build pipeline.

### Release notes are required

The bump script exits non-zero if `changelog.js` has no entry whose
`version` equals the new version. The version files stay bumped; only
the exit code signals the missing notes — add the entry and run the
tests, do not bump again.

The test suite also fails without a newest-first entry for the
shipping `APP_VERSION`. A deploy without What's-New copy is not a
valid release.

## The deploy branch

Netlify's production branch for this site is **`deploy`**, not `main`.

- Pushing to `main` publishes **nothing**. Day-to-day work, review, and
  merging are free and unguarded.
- Pushing `main` to `deploy` **is** the deploy gesture:

  ```
  git push origin main:deploy
  ```

`git log deploy` is therefore a true deploy history: every commit on it
was published, in the order it shipped.

This exists because deploys are metered and were being spent carelessly —
across six sites the account averaged 2.0 deploys per work session. When
every push deployed, there was no moment at which to think. Now there is,
and it is a deliberate second command.

### The promotion hook

`.githooks/pre-push` gates pushes to `deploy` — and **only** to `deploy`.
Pushes to `main` pass through untouched and instantly.

A promotion is refused if either:

1. **Preflight fails** (`scripts/preflight.mjs`). Every check in it
   encodes a defect that previously cost a second deploy.
2. **`APP_VERSION` did not increase** over the version currently on
   `deploy`. Integer comparison, so `1.10` beats `1.9`.

Failing to *read* the deployed version (shallow clone, unfetched object)
warns and allows — not being able to check is not evidence of a problem.
Creating `deploy` for the first time is accepted.

Why a check and not an automatic bump: git has already decided which refs
to send by the time `pre-push` runs, so a commit created here would sit
unpushed and the very next push would fail.

### Installing the hook

`npm install` sets it via the `prepare` script. By hand:

```
git config core.hooksPath .githooks
```

This repo has no dependencies, so nobody runs `npm install` in normal
use — on a fresh clone, run the `git config` line once. Without it the
hook is silently absent and nothing gates a deploy.

### When the hook blocks you

Write the `changelog.js` entry, then:

```
npm run bump
git commit -am "x.y — summary"
git push origin main && git push origin main:deploy
```

A promotion that ships no user-visible code (docs, tooling, build
artifacts) does not belong on `deploy` at all — leave it on `main`.

## Deploying deliberately

Deploys are metered. Across this Netlify account the six no-build sites
averaged **2.0 deploys per work session** — 100 deploys for 51 sessions of
actual work. The second deploy in a session is almost always "deployed,
noticed something, deployed again", which means the thing noticed could have
been caught before deploying.

**The rule: one promotion to `deploy` per work session, at the end.**

Before deploying, run:

```
npm run preflight
```

It runs the test suite, checks that every version record agrees, checks that
`sw.js`'s cache name carries the current `BUILD_ID` (without which the deploy
does not invalidate anything), confirms every file `index.html` and `sw.js`
reference actually exists, and flags images larger than they render. Each of
those checks exists because that exact defect previously cost a second deploy.

`./deploy.sh` runs preflight itself and refuses to deploy if it fails, so the
gate is not something you can forget.

**Push freely, promote deliberately.** Pushing to `main` costs nothing; the
promotion to `deploy` is the metered act. Batch a session's work behind a
single version bump rather than bumping per fix — that is what makes a version
number mean something.

## Backup schema (`DATA_VERSION`)

`DATA_VERSION` is independent of `APP_VERSION`. A cosmetic or
curriculum release does not move it. Move it only when the exported
JSON shape changes in a way that could break a restore:

1. Hand-edit `DATA_VERSION` in `version.js`.
2. Add a migration step in `versionCompat.js` from the previous
   `DATA_VERSION` to the new one.
3. Raise `MIN_COMPATIBLE_DATA_VERSION` only when older files become
   unrestorable.

The bump script will not do any of that.
