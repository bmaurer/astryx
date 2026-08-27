---
'@astryxdesign/core': patch
---

[fix] Toast: the card's shadow is no longer clipped away.

Each toast's grid row used `overflow: hidden` throughout its lifetime. The clip
is load-bearing while the row opens and closes — it makes the toast read as
folding into the stack — but at rest it hugs the card's border box with zero
slack on every side and cuts off every shadow the card casts. Astryx's own
`--shadow-med` was declared and invisible: against a white page, every sampled
pixel below a stock toast was pure white.

The row now keeps its cross-engine `overflow: hidden` boundary during entry and
exit, and releases it to `overflow: visible` only after the opening transition
settles. Dismissal restores the clip synchronously and removes pointer events
for the whole exit, so a nearly-collapsed toast cannot fire an out-of-bounds
Undo or close action.

This avoids `overflow-clip-margin`, which WebKit 26.5 does not support, while
preserving the exact paint boundary the exit shipped with before this fix.

Below a settled stock toast on a white page, per pixel row: `255,255,255` at
every offset before; `237 → 245 → 250 → 254` over the shadow's 14px reach
after. During exit, paint outside the shrinking row is clipped and hit testing
is disabled.

@freddymeta
