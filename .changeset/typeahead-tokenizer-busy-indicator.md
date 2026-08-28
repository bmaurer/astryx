---
'@astryxdesign/core': patch
---

[fix] Typeahead, Tokenizer: the busy indicator is a Spinner in the field's end lane, and the input keeps its text out from under it (#5555)

Three defects in one block. The indicator a search painted was `<Icon icon="clock">` — a static glyph, in a family where every other input paints busy with a `Spinner`, and where `clock` otherwise means _time_. It was an in-flow item at the row's inline end, which is where each field independently parks its clear button, so the two landed on each other: 17×20px of overlap in Typeahead and 19×20px in Tokenizer, the latter leaving part of the ✕ unclickable. And the combobox never carried `aria-busy`, unlike every sibling input.

The base engine now reports the busy state to the field, which paints it in the one inline-end lane it already owns beside its clear button and end content, and sets `aria-busy` on the input. A caller using `BaseTypeahead` directly is unaffected: it still renders its own visible, named "Loading" status, now a Spinner rather than the clock.

The lane is absolutely positioned — these wrappers wrap, and an in-flow sibling gets pushed onto a second row by a token — so it reserved no space, and at a narrow width the query ran underneath it. The input now reserves the lane's measured width, which also closes a pre-existing case of the same bug: at 280px with a value selected, the clear button covered 17px of the live query in Typeahead and 25px in Tokenizer before this change, with no spinner involved at all. Both are 0 now.

The measurement reaches CSS as a custom property written to the field wrapper, never as React state, so a lane that grows or shrinks repaints without re-rendering the field. Held in state it cost a second commit every time the lane changed size — once as the spinner arrived and once as it left — which doubled the field's commits across a search for a value no JavaScript reads. The observation is shared too, through the same `observeResize` singleton `useTruncation` uses, so a page of fields costs one callback per frame rather than one observer each.

@freddymeta
