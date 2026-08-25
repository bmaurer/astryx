---
'@astryxdesign/core': patch
---

[feat] Banner: the two painted elements inside the header that a theme cannot reach now carry stable theme targets — `astryx-banner-description` (the supporting line) and `astryx-banner-actions` (the end-aligned actions row). Only the header, the status icon and the content panel were themeable before, so a theme restyling the description, the space between it and the title, or the actions row's edge compensation had to reach in with structural selectors like `.astryx-banner > div:nth-child(2) > div:nth-child(2)`. Purely additive: no existing class, data attribute, or style changes.

The title, the two controls and the header's text column are deliberately not targets. The column paints nothing (`display: flex; flex-direction: column; gap: 0`) and the space it owns is expressible on `banner-description`; the title and the controls already render the way the consuming theme wants them.

@freddymeta
