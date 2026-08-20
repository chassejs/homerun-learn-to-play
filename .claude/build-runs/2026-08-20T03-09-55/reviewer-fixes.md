# Reviewer-applied corrections

Small, anchored corrections applied during the per-chunk review passes. Each was
verified by re-running the relevant check. Anything larger than a few lines went
back to Grok as a corrective brief instead.

| # | Chunk | File | Defect | Fix | Verified by |
|---|---|---|---|---|---|
| 1 | 1 | `index.html` | Feedback button used `id="help-feedback-btn"`, but `appUpdates.js` binds `readme-feedback-btn` — the Help view's Send feedback button would have been dead. | Renamed the id to `readme-feedback-btn`. | `grep` for the id in both files |
| 2 | 2 | `svg.js` | Root `<svg>` carried `height="auto"`, which is not a valid SVG length. Every diagram logged `Error: <svg> attribute height: Expected length, "auto"` in the browser console — 15 errors on a page with 15 diagrams. **This came from an error in the chunk-2 brief, not from Grok.** | Removed the `height="auto"` attribute from the root element builder (single anchored replacement, uniqueness asserted). | `node --check`, re-render, browser console clean of the error |
| 3 | 2 | `styles.css` | With the height attribute gone, nothing declared the diagram aspect behaviour explicitly. | Added a `.hrl-svg { display:block; width:100%; max-width:100%; height:auto; }` rule with a comment explaining why the attribute is absent. | Visual check of rendered diagrams |
