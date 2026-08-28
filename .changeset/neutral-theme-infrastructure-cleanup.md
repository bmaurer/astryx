---
'@astryxdesign/theme-neutral': patch
'@astryxdesign/cli': patch
'@astryxdesign/core': patch
---

[fix] Clean up the maintained neutral theme as the canonical agent-facing example:
use current component target names, correct control and progress contrast,
deduplicate semantic state colors, remove redundant radius overrides, align the
error hover treatment, adopt the approved balanced OKLCH categorical palette,
strengthen SelectableCard selection rings without changing Card backgrounds,
expose the complete named palette through the theme contract, map semantic
tokens to exact palette stops, and fix the setup/font documentation. The CLI
template ships the same theme and palette guidance.

@rubyycheung
