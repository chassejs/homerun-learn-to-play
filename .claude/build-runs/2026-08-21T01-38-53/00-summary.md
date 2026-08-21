# Build Summary (build-grok)

**Task:** (1) A version system modelled on `heat-advisory-app` — automatic major/minor bump on deploy, a release-note popup on a new version, retained release-note history, and a version check on load. (2) A feedback mechanism reachable throughout the app, with a pre-made context dropdown, emailing `feedback-learn@homerunbaseballottawa.ca` with the app version included.
**Run:** `.claude/build-runs/2026-08-21T01-38-53`
**Date:** 2026-08-20
**Implementer:** Grok CLI (`grok-4.5`), shell-free mode — 2 chunks
**Status:** READY — shipped as 1.1 and live

## Plan

Three of the four version features already existed here in some form: `appUpdates.js` had the What's-New modal and a load-time check, and `changelog.html` held the history. What was missing was the piece that makes them mean anything — **nothing forced the version to move when a build deployed**, so two different builds could both call themselves 1.0 and the check had nothing to compare. The plan therefore ported heat-advisory's *design* (not its React code) into this vanilla ES5 codebase: a one-command bump that updates every version record atomically, a `pre-push` hook that refuses an un-bumped deploy, a per-build `BUILD_ID` so a redeploy is detectable at an unchanged label, and release notes made a build-blocking step. Feedback already had a good form; it needed to be reachable from anywhere and to know where the user was.

## Implementation

1,019 insertions across 13 files (`02-diff-stat.txt`). New: `scripts/bump-version.mjs`, `.githooks/pre-push`, `tests/version.test.js`, `docs/VERSIONING.md`. Modified: `version.js` and `version.json` gained `BUILD_ID`/`BUILD_TIME`; `appUpdates.js` gained build-id comparison with per-version and per-build deferral; `feedback.js` gained a floating button, a view-context selector, and a richer email; `deploy.sh` gained a pre-flight version-consistency guard; plus `package.json`, `index.html`, `shell.js`, `styles.css`, and `tests/versionCompat.test.js`.

Two decisions worth recording. The bump script, when release notes are missing, exits non-zero but leaves the version files bumped **and says so explicitly**, removing the ambiguity that would otherwise cause a double bump. And the email's metadata footer was placed *above* the free-text field rather than appended, so version, build id, and context survive the existing body-truncation limit.

## Review

**READY.** All 16 acceptance criteria pass, every one verified by running the thing rather than reading it: both bump modes, all seven `pre-push` branches driven with crafted stdin, the deploy guard with an injected mismatch, and the feedback flow end to end in a browser with the generated email captured off the clipboard. `npm test` reports **211 passed, 0 failed**, up from 181.

Two defects, both fixed. The hook shipped **non-executable** — git silently ignores a hook without the execute bit, so the enforcement everything depends on would have been dead while appearing installed (expected reviewer work: Grok cannot `chmod` in shell-free mode). And a `git checkout --` of mine, against a baseline that predated chunk A, wiped the new `BUILD_ID` declarations; the suite written in this very run caught it with nine precise failures.

## Key Takeaways

- **The system was used to ship itself.** Release notes were written, `npm run bump` took 1.0 → 1.1, the hook fired on the real push (`pre-push: 1.0 → 1.1.`), and Netlify CD deployed it.
- **The full user-facing loop was verified on production**, not just locally: a seeded returning 1.0 user got the "What's new in v1.1" popup with all four highlights and a history link; dismissing it stamped `lastSeenVersion` and it did not return; and a true first-ever visitor correctly saw **no** popup, with the version stamped silently so it stays suppressed.
- **"Automatic bump upon deploy" is implemented as enforcement, not auto-commit** — deliberately. A hook that commits during `pre-push` creates a commit after git has already chosen which refs to send, so the bump would sit unpushed and the next push would fail. The hook blocks and `npm run bump` does the edit; this reasoning is documented in the hook and in `docs/VERSIONING.md`.
- **One manual step remains for a fresh clone:** `core.hooksPath` is wired by the `prepare` npm script, but this repo has no dependencies so nobody runs `npm install`. A collaborator must run `git config core.hooksPath .githooks` once. It is set in this working copy and documented.
- Major bumps stay a deliberate call: `npm run bump:major`.

## Artifacts

- `.claude/build-runs/2026-08-21T01-38-53/01-plan.md`
- `.claude/build-runs/2026-08-21T01-38-53/implementer-brief.md` (chunk A — version system)
- `.claude/build-runs/2026-08-21T01-38-53/brief-B-feedback.md` (chunk B — feedback)
- `.claude/build-runs/2026-08-21T01-38-53/log-implementer-brief.json`, `log-brief-B-feedback.json`
- `.claude/build-runs/2026-08-21T01-38-53/02-diff-stat.txt`, `02-diff.patch`
- `.claude/build-runs/2026-08-21T01-38-53/03-review.md`
- `.claude/build-runs/2026-08-21T01-38-53/00-summary.md`
- `docs/VERSIONING.md` (the durable operator-facing output)

**Live:** https://homerun-learn-to-play.netlify.app (v1.1, build `a6b1178e50`)
**Repo:** https://github.com/chassejs/homerun-learn-to-play
