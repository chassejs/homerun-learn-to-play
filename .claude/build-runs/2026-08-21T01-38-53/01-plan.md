## Goal

Bring Homerun Learn to Play's version and feedback machinery up to the standard set by `heat-advisory-app`, and make feedback reachable from anywhere in the app. The app already has three of the four version features in some form — a What's-New modal, a changelog history page, and a load-time update check — but it is missing the piece that makes them trustworthy: **nothing forces the version to move when a build is deployed**. Today a push to `main` auto-deploys via Netlify with `version.json` untouched, so two materially different builds can both call themselves 1.0, the update check has nothing to compare, and the What's-New modal never fires. This build adds a one-command bump that updates every place the version is written, a `pre-push` hook that refuses a deploy which did not bump, a per-deploy build id so a redeploy is detectable even at the same version label, and a persistent feedback affordance on every view that emails `feedback-learn@homerunbaseballottawa.ca` with the version and build stamped in.

## Constraints

- **Match the existing app's stack, not heat-advisory's.** That project is React + TypeScript + Vite; this one is vanilla ES5-safe JavaScript with classic `<script>` tags, one `window.HRL_*` global per file, and no build step. Port the *design* of heat-advisory's version system, not its code.
- **ES5-safe syntax in all app files** (`var`, `function` expressions, string concatenation; no `let`/`const`, arrow functions, template literals, `class`, destructuring, optional chaining, `Array.prototype.includes`, `Object.assign`). `tests/*.js`, `sw.js`, and `scripts/*.mjs` may use modern syntax — they run only under Node or as a worker.
- **Do not rewrite what already works.** `appUpdates.js` already implements the What's-New modal with correct first-install-is-silent semantics, the update self-check, and the deferred-version handling; `changelog.html` already renders history. Extend these; do not replace them.
- **Four files must agree on the version and a test enforces it.** `tests/versionCompat.test.js` asserts that `version.js` `APP_VERSION`, `package.json` `version`, `version.json` `version`, and the newest `changelog.js` entry all match. Any bump must update all four atomically or the suite goes red. This is a feature — preserve it.
- **`version.json` must never be precached.** `sw.js` deliberately excludes it; it is the freshness probe and must always come from the network. Its `Cache-Control: no-store` header in `netlify.toml` must stay.
- **A pre-push hook must not create commits.** Git has already decided which refs to send by the time `pre-push` runs, so a bump committed there would sit unpushed and the next push would fail. The hook blocks; `npm run bump` does the edit. This constraint is inherited from heat-advisory and its reasoning is documented in that repo's hook.
- Deployment is GitHub → Netlify continuous deployment (publish root, no build command). The integration point for "on deploy" is therefore the push to `main`.
- No new runtime dependencies, no network calls beyond the existing `version.json` probe, no external URLs.
- Feedback is a `mailto:` draft only — the app never sends mail itself and has no backend.

## Step-by-Step Implementation Plan

1. **Extend `version.js`** with `BUILD_ID` and `BUILD_TIME` constants alongside the existing `APP_VERSION` / `DATA_VERSION` / `MIN_COMPATIBLE_DATA_VERSION`, keeping the existing literal shape of the `APP_VERSION` line intact so the bump script and hook can parse it.
2. **Write `scripts/bump-version.mjs`** — increments the minor number by default (`1.0` → `1.1`), or the major with `--major` (`1.4` → `2.0`, minor reset to zero). It must update, in one run: `version.js` (`APP_VERSION`, a fresh `BUILD_ID`, `BUILD_TIME`), `package.json` (`version`, as `major.minor.0`), and `version.json` (`version`, `released`, `buildId`, `buildTime`). It must then check `changelog.js` for an entry matching the new version and exit non-zero with a clear message if one is missing, so release notes are a build-blocking step.
3. **Add `npm run bump` and `npm run bump:major`** to `package.json`, plus a `prepare` script that points `core.hooksPath` at `.githooks` so the hook installs itself.
4. **Write `.githooks/pre-push`** — refuses a push to `main` whose `APP_VERSION` is not strictly greater than the one on the remote, comparing major and minor as integers so `1.10` beats `1.9`. Unreadable remote state warns and allows rather than blocking, since failing to check is not evidence of a missing bump.
5. **Extend `version.json`** to `{ version, released, buildId, buildTime }`.
6. **Extend `appUpdates.js`'s update check** to compare `buildId` as well as the version label, so redeploying the same version is still detected. Build-id comparison must be by identity, not ordering — a rollback is as much a mismatch as a roll-forward — and an unreadable or absent build id must never report staleness.
7. **Add `HRL_FEEDBACK.mount()`** to `feedback.js`: a persistent floating feedback button rendered once into the app shell, visible on every view, keyboard reachable, hidden when printing, and not overlapping the footer or any view's primary action.
8. **Include version and build identity in the generated email** — the mailto body must carry `APP_VERSION`, `BUILD_ID`, the current view, and the browser user-agent, so a report is actionable without a follow-up question.
9. **Extend the feedback category dropdown** with a "Which part of the app?" context selector, pre-filled from the view the user was on when they opened the form.
10. **Update `sw.js`'s precache list** to include any new file, while continuing to exclude `/version.json`.
11. **Add `docs/VERSIONING.md`** documenting the release procedure: when to bump minor vs major, that release notes are required, and how the hook enforces it.
12. **Add tests** — `tests/version.test.js` for the bump arithmetic and build-id semantics, and extend `tests/versionCompat.test.js` for the four-file agreement including `buildId` presence.

## File List

**To create**

| Path | Responsibility |
|---|---|
| `scripts/bump-version.mjs` | One-command version bump; updates `version.js`, `package.json`, `version.json`; refuses to finish without a matching `changelog.js` entry |
| `.githooks/pre-push` | Refuses a push to `main` that does not increase `APP_VERSION` |
| `tests/version.test.js` | Bump arithmetic, version comparison, build-id staleness semantics |
| `docs/VERSIONING.md` | Release procedure: minor vs major, required release notes, how enforcement works |

**To modify**

| Path | Change |
|---|---|
| `version.js` | Add `BUILD_ID` and `BUILD_TIME`; keep the `APP_VERSION` line's literal shape parseable |
| `version.json` | Add `buildId` and `buildTime` alongside `version` and `released` |
| `package.json` | Add `bump`, `bump:major`, and `prepare` scripts |
| `appUpdates.js` | Compare `buildId` as well as the version label in the update check |
| `feedback.js` | Add `mount()` floating button; add the context dropdown; stamp version, build id, view, and user-agent into the mailto body |
| `styles.css` | Style the floating feedback button; hide it in print |
| `index.html` | Mount point for the floating feedback button |
| `shell.js` | Call `HRL_FEEDBACK.mount()` on init; expose the current view to the feedback form |
| `sw.js` | Refresh the precache list; keep `/version.json` excluded |
| `tests/versionCompat.test.js` | Extend the four-file agreement check to cover `buildId` |
| `deploy.sh` | Verify version consistency before deploying; fail loudly on a mismatch |
| `CHANGELOG.md` / `changelog.js` | A release entry for the version this work ships as |

**Do not touch:** `src/*` data files, `learn.js`, `quiz.js`, `iq.js`, `placement.js`, `interactive.js`, `svg.js`, `progress.js`, `versionCompat.js` migration logic, `netlify.toml` headers.

## Acceptance Criteria

1. `node scripts/bump-version.mjs` on a clean tree moves `1.0` → `1.1` and updates `version.js`, `package.json`, and `version.json` consistently; `node scripts/bump-version.mjs --major` moves `1.4` → `2.0` with the minor reset to zero.
2. The bump script exits non-zero with an actionable message when `changelog.js` has no entry for the new version, and exits zero once one exists.
3. `version.json` contains `version`, `released`, `buildId`, and `buildTime`, and `buildId` changes on every bump.
4. `tests/versionCompat.test.js` still passes and now also asserts `version.json` carries a non-empty `buildId`; `version.js`, `package.json`, `version.json`, and the newest `changelog.js` entry all agree on the version.
5. `.githooks/pre-push` blocks a simulated push to `main` whose `APP_VERSION` did not increase, allows one that did, allows branch creation, and allows (with a warning) when the remote version cannot be read. Verified by invoking the hook directly with crafted stdin — no real push required.
6. Integer comparison is used throughout: `1.10` is treated as newer than `1.9` by both the hook and the in-app comparison.
7. The update check detects a deployed build whose `buildId` differs from the running one even when the version label is unchanged, and never reports staleness when the deployed build id is absent, empty, or unreadable.
8. The What's-New modal still fires only for a genuine upgrade: silent on a first-ever install, silent on an equal or older version, shown once for a strictly newer version with a changelog entry.
9. A floating feedback button is present and clickable on every one of the eight views, is reachable by keyboard, does not obscure the footer or any view's primary action at 360px, 768px, and 1440px, and is hidden in print output.
10. The feedback form offers a context dropdown pre-filled from the view the user opened it from, and the generated `mailto:` targets `feedback-learn@homerunbaseballottawa.ca`.
11. The generated email body contains the app version, the build id, the selected context, and the user agent, and every interpolated value is percent-encoded so no user-typed content can inject additional mail headers.
12. `npm test` passes with the new tests included, and the suite still fails when a defect is injected.
13. Every changed `.js` file parses (`node --check`) and app files remain ES5-safe per `tests/syntax.test.js`.
14. `sw.js`'s precache list contains only files that exist and still excludes `/version.json`.
15. `docs/VERSIONING.md` documents the release procedure, including when to bump major versus minor and that release notes are required.
16. No console errors on a fresh load, and the app still works from `file://` (the feedback button and update check must both degrade rather than throw).
