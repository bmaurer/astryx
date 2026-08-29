---
'@astryxdesign/core': patch
---

[fix] Typeahead keeps its width when a value is selected. Selecting one collapses the input, which is the only child giving the field an intrinsic width, so in any layout that sizes the field to its content — a flex item, `inline-block`, a shrink-to-fit grid track — the field shrank onto the token (measured 199px to 44px). A themeable floor, `--typeahead-min-width`, holds the width while the token shows; an unselected field is unchanged. (#5560)

@freddymeta
