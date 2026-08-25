---
'@astryxdesign/core': patch
---

[fix] Spinner: the box no longer shrinks when a flex host is narrower than it (#5484)

Several components paint a spinner inside a fixed-size control, and some of those controls are exactly the size of the spinner in them — a Switch thumb is 14px at the smallest size, the same as the `sm` box. Those hosts are flex containers, and under a flex item's default `flex-shrink: 1` the host was free to compress the spinner's box while the ring kept drawing at the size its own attributes asked for. `overflow: hidden` on the box then clipped the ring it exists to contain, so the spinner rendered a slice of itself with nothing reporting a problem. The box now refuses to shrink, which keeps it and the ring one measurement: a spinner that does not fit its host overflows visibly there instead of being silently cut. No change at any size or shade that already fitted.

@freddymeta
</content>
<parameter name="node_id">85252.od.fbinfra.net
