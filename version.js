/* ===================================================================
   Homerun Learn to Play — version.js
   Single source of truth for all version constants.

   HOW TO UPDATE:
   - Bump APP_VERSION for any user-visible release (including cosmetic changes).
   - Bump DATA_VERSION only when the shape of the exported JSON changes
     in a way that could break a restore. See docs/VERSIONING.md.
   - Keep package.json "version" in sync with APP_VERSION (major.minor.0).
   - `npm run bump` maintains APP_VERSION, BUILD_ID, BUILD_TIME, package.json
     and version.json together. Do not edit them by hand.
   - The three `var APP_VERSION/BUILD_ID/BUILD_TIME = '...';` lines below are
     parsed as TEXT by scripts/bump-version.mjs and .githooks/pre-push.
     Keep their exact literal shape or that tooling breaks.
   =================================================================== */

// Exposed on window so the rest of the app can read it without ES modules.
window.HRL_VERSION = (function () {
  'use strict';

  // Human-facing release label shown in the UI and embedded in every backup.
  var APP_VERSION = '1.2';

  // Identity of this specific build. Unlike APP_VERSION it changes on every
  // bump, so the update check can spot a redeploy even at the same label.
  var BUILD_ID = '1f1fa939ce';

  // When this build was stamped, ISO-8601 UTC.
  var BUILD_TIME = '2026-08-21T02:40:31Z';

  // Governs backup/restore compatibility. Incremented independently of
  // APP_VERSION when the exported JSON payload shape changes.
  var DATA_VERSION = '1.0';

  // The oldest DATA_VERSION this build can import (after migration chain).
  // Raise this when a breaking schema change makes older files unrestorable.
  var MIN_COMPATIBLE_DATA_VERSION = '1.0';

  return {
    APP_VERSION: APP_VERSION,
    BUILD_ID: BUILD_ID,
    BUILD_TIME: BUILD_TIME,
    DATA_VERSION: DATA_VERSION,
    MIN_COMPATIBLE_DATA_VERSION: MIN_COMPATIBLE_DATA_VERSION
  };
}());
