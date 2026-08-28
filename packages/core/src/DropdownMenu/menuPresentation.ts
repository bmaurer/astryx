// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file menuPresentation.ts
 * @input Uses the shared SSR-safe media-query hook
 * @output Resolves menu presentation policy to popover or bottom sheet
 * @position Internal shared policy for DropdownMenu, MoreMenu, and ContextMenu
 */

import {useMediaQuery} from '../hooks/useMediaQuery';

export type MenuPresentation = 'popover' | 'bottom-sheet' | 'adaptive';
export type ResolvedMenuPresentation = Exclude<MenuPresentation, 'adaptive'>;

// Width keeps desktop-class tablets and large touch displays anchored by
// default. Pointer capability, rather than `hover: none`, avoids excluding
// touch browsers that also report hover capability.
export const COMPACT_TOUCH_MENU_QUERY =
  '(max-width: 768px) and (pointer: coarse)';

export function useResolvedMenuPresentation(
  presentation: MenuPresentation,
): ResolvedMenuPresentation {
  const isCompactTouch = useMediaQuery(COMPACT_TOUCH_MENU_QUERY);
  return presentation === 'adaptive'
    ? isCompactTouch
      ? 'bottom-sheet'
      : 'popover'
    : presentation;
}
