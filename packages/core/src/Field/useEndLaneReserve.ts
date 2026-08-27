// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useEndLaneReserve.ts
 * @input Uses React
 * @output Exports useEndLaneReserve, which measures a field's inline-end
 *   lane and returns the padding the input needs to clear it.
 * @position Shared field internal. Used by Typeahead and Tokenizer, both of
 *   which park their clear button, end content and busy indicator in one
 *   absolutely-positioned lane at the field's inline end.
 *
 * SYNC: When modified, update this header and the two callers:
 * - /packages/core/src/Typeahead/Typeahead.tsx
 * - /packages/core/src/Tokenizer/Tokenizer.tsx
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import * as stylex from '@stylexjs/stylex';

// Keep the input's text and caret out from under the lane.
//
// The input's content box already stops one wrapper padding short of the
// border, and the lane is inset from that same border — so what is left for
// the input to clear is the lane's inset plus its width, less the padding it
// already has, plus a padding's worth of gap so the text does not touch the
// glyph. The two paddings cancel, which is why this reads as inset + width.
const reserveStyles = stylex.create({
  reserve: (laneInset: string, laneWidth: number) => ({
    paddingInlineEnd: `calc(${laneInset} + ${laneWidth}px)`,
  }),
});

/**
 * Measure a field's inline-end lane, so the input can keep its text out from
 * under it.
 *
 * The lane is absolutely positioned — it has to be, because these wrappers
 * wrap, and an in-flow sibling gets pushed onto a second row by a token — and
 * an out-of-flow box reserves no space by definition. There is no CSS that
 * makes one do so: the input cannot see a sibling's width, and a custom
 * property set on the lane cannot travel sideways to it. So the width is
 * measured and handed back, and the caller spends it as padding.
 *
 * What the lane holds is not a fixed set: a clear button that comes and goes
 * with the value, a busy indicator that comes and goes with the search, and,
 * in Tokenizer, arbitrary `endContent`. Measuring covers all of it, including
 * the combinations, and needs no constant kept in step with what renders.
 *
 * Takes the lane's inset from the field's inline-end border, as the CSS
 * expression that positions it, and returns a ref callback for the lane plus
 * the style the input needs — `undefined` when there is no lane to clear.
 */
export function useEndLaneReserve(
  laneInset: string,
): [(node: HTMLElement | null) => void, stylex.StyleXStyles] {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    },
    [],
  );

  const laneRef = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (node == null) {
      // No lane rendered: nothing to reserve. Not a measurement of zero — the
      // lane is gone, and the input takes the room back.
      setWidth(0);
      return;
    }

    // jsdom implements no ResizeObserver, and this runs in every consumer's
    // component tests. `offsetWidth` is 0 there too, so the reserve is simply
    // absent rather than wrong.
    if (typeof ResizeObserver === 'undefined') {
      setWidth(node.offsetWidth);
      return;
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry == null) {
        return;
      }
      // Border box: the lane's own padding and border are part of what the
      // input has to clear. `borderBoxSize` is the value the observer already
      // computed, so it costs no layout; the fallback for a browser without
      // it reads `offsetWidth`, which is border-box too — `contentRect` is
      // not, and would under-reserve the moment the lane grows a padding.
      const next =
        entry.borderBoxSize?.[0]?.inlineSize ??
        (entry.target as HTMLElement).offsetWidth;
      // Round up. A fractional width left as-is reserves a hair too little and
      // the glyph's last subpixel column still lands on the caret.
      setWidth(Math.ceil(next));
    });
    observer.observe(node);
    observerRef.current = observer;
    setWidth(Math.ceil(node.getBoundingClientRect().width));
  }, []);

  return [laneRef, width > 0 ? reserveStyles.reserve(laneInset, width) : undefined];
}
