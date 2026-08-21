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

5. **Push** to `main`. Netlify continuous deployment publishes the
   repo root with no build command. `deploy.sh` is the manual fallback
   and re-checks that the three version files agree before calling
   `netlify deploy`.

### Release notes are required

The bump script exits non-zero if `changelog.js` has no entry whose
`version` equals the new version. The version files stay bumped; only
the exit code signals the missing notes — add the entry and run the
tests, do not bump again.

The test suite also fails without a newest-first entry for the
shipping `APP_VERSION`. A deploy without What's-New copy is not a
valid release.

## Push hook

`.githooks/pre-push` refuses a push to `main` whose committed
`APP_VERSION` is not strictly greater (integer major, then integer
minor) than the version currently on the remote. Other branches pass
through. Creating `main` is allowed. Deleting `main` is skipped. If
the remote `version.js` cannot be read (shallow clone, unfetched
object, history from before this scheme), the hook warns and allows
the push: failing to check is not evidence of a missing bump. If the
local commit's `APP_VERSION` line cannot be parsed, the hook blocks
and names the exact line shape to restore.

The hook does not bump for you. Git has already decided which refs to
send by the time `pre-push` runs, so a commit created there would sit
unpushed and the next push would fail. The hook blocks; `npm run bump`
does the edit.

### Installing the hook

`npm install` runs the `prepare` script, which sets
`git config core.hooksPath .githooks`. To wire it by hand:

```
git config core.hooksPath .githooks
```

The hook file must be executable (`chmod +x .githooks/pre-push`).

### When the hook blocks you

It prints the remote version, the version you tried to push, and this
remedy:

```
npm run bump && git commit -a --amend --no-edit
```

Or commit the bump as its own commit, then push again. Write the
`changelog.js` entry before bumping.

### Commits that ship no code

The hook checks every push to `main`, including ones that only touch
documentation, tests, or `.claude/build-runs/` artifacts. Those change
nothing a user can see, so bumping for them would inflate the version
history and make release notes meaningless.

For a commit that touches **no shipped code**, bypass the hook:

```
git push --no-verify
```

Use it only when that is genuinely true. If the push contains any change
to app code, styles, or content, bump instead — that is the case the hook
exists for, and skipping it is how two different builds end up sharing a
version number.

## Deploying deliberately

Deploys are metered. Across this Netlify account the six no-build sites
averaged **2.0 deploys per work session** — 100 deploys for 51 sessions of
actual work. The second deploy in a session is almost always "deployed,
noticed something, deployed again", which means the thing noticed could have
been caught before deploying.

**The rule: one deploy per work session, at the end.**

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

**Push freely, deploy deliberately.** Committing and pushing costs nothing;
the deploy is the metered act. Batch a session's work behind a single version
bump rather than bumping per fix.

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
