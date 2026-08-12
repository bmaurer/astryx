---
'@astryxdesign/core': patch
'@astryxdesign/cli': patch
---

[feat] `defineTheme` gains a conditional theme layer: named conditions whose values apply only where the condition matches, starting with `mobile`. A `mobile` block takes a partial theme (`typography`, `color`, `radius`, `motion`, `tokens`, `components` — each axis independent) and compiles to `@media (max-width: <breakpoint>px) and (pointer: coarse)`, so it means narrow _and_ touch: a narrowed desktop window never matches. The width defaults to 756px and is configurable with `breakpoints: {mobile: 640}`. Inside a matching condition the conditional value wins over the base theme; outside it the base theme is untouched. The feature is opt-in — a theme that sets no condition emits no conditional CSS and its output is byte-identical to before. Works in both distribution modes: runtime `<Theme>` injection and `astryx theme build`.

@cixzhang
