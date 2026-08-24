---
'@astryxdesign/core': patch
---

[fix] Keep DropdownMenu and submenu flyouts inside the viewport with safe inline gutters and viewport-aware height limits. Only overflowing menus become internal scroll containers, while `menuWidth` keeps its existing minimum-width behavior up to the available space.

@rubycheung
