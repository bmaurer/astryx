---
'@astryxdesign/core': patch
---

[fix] Toast: the card's shadow is no longer clipped away.

Each toast sits in a box with `overflow: hidden` — the clip is what makes the
wrapper's grid-row collapse read as the toast folding away. But that box hugs
the card's border box exactly, with no slack on any side, so it also cut off
every shadow the card casts. Astryx's own `--shadow-med` has been declared on
the toast and invisible: measured against a white page, the pixels immediately
below a stock toast were pure white.

The clip is now `overflow: clip` with `overflow-clip-margin: 32px` — still
clipping, but letting the card paint that far outside the box. 32px is the
reach of `--shadow-high` (`0 8px 24px`), the largest elevation shadow the
system ships, so any built-in shadow and any theme's up to that size paints in
full. `min-height: 0` comes with it: `hidden` zeroes a grid item's automatic
minimum size and `clip` does not, so without it the row could no longer
shrink and the collapse stopped animating.

Below a stock toast, on a white page, per pixel row: `255,255,255` at every
offset before; `237 → 245 → 250 → 254` over the shadow's 14px reach after.

@freddymeta
