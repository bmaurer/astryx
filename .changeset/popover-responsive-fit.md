---
'@astryxdesign/core': patch
---

[fix] Popover layers now cap explicit widths and match-trigger sizing to the available viewport with token safe-area gutters, and long content scrolls inside the layer instead of forcing page overflow on narrow viewports. Dialog-style popovers with read-only content now place initial focus on the labeled dialog container instead of revealing the fallback close button, while preserving Tab access to that fallback escape control.

@rubyycheung
