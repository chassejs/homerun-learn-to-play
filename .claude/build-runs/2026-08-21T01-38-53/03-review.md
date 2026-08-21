## Summary

Both halves landed cleanly and the result is better than the brief asked for in two places. The version system now has the piece it was actually missing: a one-command bump that updates all eight version fields atomically, a `pre-push` hook that refuses a deploy which did not bump, and a per-build `BUILD_ID` so a redeploy is detectable even at an unchanged version label. The three features the user listed as new — release-note popup, release-note history, load-time version check — already existed in `appUpdates.js` and `changelog.html`; they were extended rather than rebuilt, which is the right call and keeps the existing first-install-is-silent semantics intact.

The implementation shows real judgment in two spots. The bump script, on finding no release-note entry for the new version, exits non-zero but leaves the version files bumped, and *says so explicitly* — "The version files stay bumped; only this exit code signals the missing notes. Add the entry, then re-run the tests — do not run bump again." That removes exactly the ambiguity that would otherwise have someone bump twice. And in `feedback.js`, the metadata footer was moved *above* the free-text field rather than appended after it, so the version, build id, and context survive the existing `MAIL_BODY_LIMIT` truncation — the brief flagged the risk and the implementer solved it structurally instead of raising the limit.

Everything was verified by running it, not by reading it: the bump script through both modes, the hook through all seven of its branches with crafted stdin, the deploy guard with an injected mismatch, and the feedback flow end to end in a browser with the generated email captured off the clipboard.

Two defects were found and fixed, one of them mine.

## Acceptance Criteria Verdicts

- PASS — Criterion 1: `node scripts/bump-version.mjs` moved `1.0` → `1.1`, and `--major` moved `1.1` → `2.0` with the minor reset. `version.js`, `package.json` (`1.1.0` / `2.0.0`), and `version.json` all tracked together in both runs.
- PASS — Criterion 2: with no `1.1` entry in `changelog.js` the script exited 1 and printed the file, the version, a paste-ready entry skeleton, and an explicit note that the version files stay bumped. `npm test` then failed with `FAIL: changelog.js newest entry is the current release`, confirming the gate is real.
- PASS — Criterion 3: `version.json` carries `version`, `released`, `buildId`, `buildTime`. `buildId` changed on every bump (`caf5e0d0f4` → `57a3f07ea4`).
- PASS — Criterion 4: `tests/versionCompat.test.js` reports 22 passed, 0 failed, and now asserts a non-empty `buildId` matching `version.js`.
- PASS — Criterion 5: the hook was invoked directly with crafted stdin across all seven branches — non-`main` ref passes through; branch deletion skips; branch creation accepts; equal versions **block** with the remedy printed; an unreadable remote sha warns and allows; a real `1.0` → `1.10` bump is **allowed**; the reverse is **blocked**.
- PASS — Criterion 6: `1.0` → `1.10` was accepted and `1.10` → `1.0` rejected, so the `awk` comparison is integer, not float. `tests/version.test.js` asserts the same for the in-app comparison.
- PASS — Criterion 7: `isStaleBuild` exercised under Node against a running id of `abc123` — same id false, different id true, and `null`, `undefined`, `''`, a number, and an object all false. `checkForUpdate` fires on either a newer version label or a stale build id, with independent deferral for each.
- PASS — Criterion 8: `shouldAutoShow` is unchanged — silent when nothing is stored and no prior state exists (first install), silent on equal or older, shown once for a strictly newer version with a changelog entry.
- PASS — Criterion 9: the floating button was found present and visible on all eight views, is a real `<button type="button">` named "Send feedback", measures 48×48 (label collapsed to a 1×1 clip) below 768px and 152×44 with a visible label above it, covers **no** footer control at either 360px or 1440px, produces no horizontal scroll, and carries `no-print`.
- PASS — Criterion 10: opening the form from the chapter view pre-selected `#feedback-context` to "A chapter"; the option list is `home|path|chapter|quiz|iq|review|glossary|help|other`. The confirmation screen shows `feedback-learn@homerunbaseballottawa.ca`.
- PASS — Criterion 11: the captured report reads `App version: 1.0` / `Build: ead1c37c10` / `Where: A chapter, The Tricky Rules` plus page, device, screen, and timestamp — the chapter title was resolved from the rendered view. Both `subject` and `body` pass through `encodeURIComponent` and the address is a hardcoded constant, so a newline in the details field becomes `%0A` and cannot inject a mail header; tested with a literal `\nBcc:` payload.
- PASS — Criterion 12: `npm test` reports **211 passed, 0 failed** (up from 181; `version.test.js` contributes 27). The suite was confirmed still able to fail — removing the changelog entry produced a precise failure and exit 1.
- PASS — Criterion 13: `node --check` passes on every changed `.js` file; `bash -n` passes on `deploy.sh`; `tests/syntax.test.js` (72 assertions) confirms the app files remain ES5-safe.
- PASS — Criterion 14: all 44 precache entries exist on disk, `/version.json` is excluded, and every `index.html` reference is covered.
- PASS — Criterion 15: `docs/VERSIONING.md` (142 lines) covers what each constant means, minor vs major, the end-to-end release procedure, that release notes are required, how the hook enforces it, how to install it, what to do when it blocks, and that `DATA_VERSION` is independent.
- PASS — Criterion 16: a fresh load issued 44 requests, all `200`, no `404`s and no console errors. `appUpdates.js` and `feedback.js` both guard on `location.protocol`, so the update check and the page line degrade rather than throw under `file://`.

## Issues

- [MAJOR — fixed] `.githooks/pre-push` shipped **non-executable** (`-rw-r--r--`). Git silently ignores a hook without the execute bit, so the enforcement everything else depends on would have been dead on arrival while appearing installed. Grok cannot `chmod` in shell-free mode, so this was expected work for the reviewer; fixed with `chmod +x` and `git update-index --chmod=+x` so the bit is recorded in the index and survives a fresh clone.
- [MAJOR — fixed, my error] While reverting a test bump I ran `git checkout -- version.js version.json package.json`, but the run's baseline predated chunk A, so the checkout wiped the newly added `BUILD_ID` / `BUILD_TIME` declarations rather than just undoing the bump. `npm test` caught it immediately with nine precise failures. Restored by re-adding the constants in the exact literal shape the tooling parses, verified back to 211 green. Worth noting the test suite written in this very run is what caught it.
- [MINOR — accepted] `node scripts/bump-version.mjs --dry-run` exits 1 when the target version has no changelog entry, even though a dry run writes nothing. This is defensible — the exit code reports "you are not ready to release" — and the output says `No files were written (--dry-run)`, so it cannot be mistaken for a partial write. Left as is.
- [MINOR — accepted] The `prepare` script wires `core.hooksPath` on `npm install`, but this repo has no dependencies, so nobody runs `npm install` in normal use. `docs/VERSIONING.md` documents the manual one-liner, and the reviewer set it for this working copy. A collaborator cloning fresh must run it once; the doc says so.

## Overall Verdict

READY — All 16 acceptance criteria pass with evidence from actually running the bump script, the hook, the deploy guard, the test suite, and the feedback flow in a browser; both defects found were fixed and re-verified.
