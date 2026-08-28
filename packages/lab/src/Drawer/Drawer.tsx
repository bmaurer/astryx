// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file Drawer.tsx
 * @input Uses React (incl. createPortal), StyleX, theme tokens, Icon/IconButton, useScrollLock/useDevWarning/useDrawerDialogPresence, BaseProps, mergeProps/mergeRefs, themeProps
 * @output Exports Drawer component and DrawerProps
 * @position Lab implementation; consumed by index.ts, tested by Drawer.test.tsx, demonstrated in Storybook
 *
 * Overlay panel for inspectors and detail views — the "click a table row,
 * see its details" pattern. Slides in from the inline start or end edge and
 * floats above the page content: unlike a docked panel it never reflows the
 * layout underneath, it overlays it (with or without a scrim).
 *
 * Inline axis only (start/end). Block-axis sheets are BottomSheet's job;
 * a drawer is always a full-height side panel.
 *
 * Bounded to the viewport by default; `containerRef` binds it to an element
 * instead, so the panel slides against that element's edge at its height.
 * Bounded drawers use `show()` because the browser top layer is always
 * viewport-sized; modal enforcement is scoped to the container with `inert`,
 * and a requested scrim is rendered inside that same container.
 *
 * Sizing is viewport-aware: `width` is the desktop budget, and below
 * the mobile breakpoint it preserves a 56px reveal of the page behind, capped
 * by the requested width (or fills the viewport with `isFullWidthOnMobile`).
 *
 * Uses the native `<dialog>` element (same precedent as Dialog/MobileNav):
 * - `showModal()` when `modality="modal"` (default) — top-layer rendering, focus
 *   trapping, `::backdrop`, no z-index management.
 * - `show()` when `modality="nonModal"` — the area behind stays interactive
 *   (e.g. master-detail inspectors).
 * `hasScrim` is the separate visual axis and follows `modality` by default.
 *
 * Entry animation uses `@starting-style`; exit slides out before
 * `dialog.close()` releases the top layer and restores focus to the element
 * that opened the drawer. React owns `display` for both legs rather than a
 * discrete `display` transition, so the panel stops painting in the same
 * commit as `close()` — see the `rendered` style for why that matters.
 *
 * Sibling drawers coordinate through a module-level LIFO registry: Escape
 * closes only the top (last-opened) drawer, and non-modal drawers stack
 * last-opened-on-top via registry-assigned z-indexes.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/lab/src/Drawer/Drawer.doc.mjs (props table, features, usage)
 * - /packages/lab/src/Drawer/Drawer.test.tsx (tests for new/changed behavior)
 * - /packages/lab/src/Drawer/index.ts (exports if types change)
 * - /apps/storybook/stories/Drawer.stories.tsx (examples and visual coverage)
 */

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {createPortal} from 'react-dom';
import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '@astryxdesign/core';
import {
  borderVars,
  colorVars,
  durationVars,
  easeVars,
  radiusVars,
  shadowVars,
  spacingVars,
} from '@astryxdesign/core/theme/tokens.stylex';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {useDevWarning, useScrollLock} from '@astryxdesign/core/hooks';
import {
  composeEventHandlers,
  mergeProps,
  mergeRefs,
  themeProps,
} from '@astryxdesign/core/utils';
import {overlayPaddingReset} from '@astryxdesign/core/Layout';
import {useDrawerDialogPresence} from './useDrawerDialogPresence';

// =============================================================================
// LIFO stacking registry (internal)
// =============================================================================

// Module-level registry of currently open drawers, in open order (last entry
// is the top of the stack). SSR-safe: only mutated inside effects. Escape
// handling consults isTopDrawer() so sibling drawers close innermost-first,
// and non-modal (show()) drawers get incrementing z-indexes so the
// last-opened one paints on top; modal drawers rely on the native top
// layer's chronological stacking instead.
type DrawerRegistryEntry = {id: string; close: () => void};

// Without the top layer (`modality="nonModal"` uses show(), not showModal())
// the panel needs explicit stacking. No z-index token exists in the theme;
// 1000 matches the app-level drawer convention.
const NON_MODAL_BASE_Z = 1000;

const openDrawerStack: DrawerRegistryEntry[] = [];
let registrationCounter = 0;

// Subscribers to stack membership. Nested stacking needs every drawer to know
// how many drawers sit ON TOP of it, and that answer changes when a sibling
// opens or closes rather than when this drawer re-renders — so the registry
// publishes changes instead of each drawer polling. `useSyncExternalStore`
// then keeps depth in sync without a render-phase read of module state.
const stackListeners = new Set<() => void>();

function notifyStackChanged(): void {
  for (const listener of stackListeners) {
    listener();
  }
}

function subscribeToDrawerStack(listener: () => void): () => void {
  stackListeners.add(listener);
  return () => {
    stackListeners.delete(listener);
  };
}

/**
 * How many drawers are stacked above `id`. 0 for the top of the stack, and for
 * a drawer that is not open. This is the nesting depth the recede transform
 * keys off: the deeper a drawer is buried, the further it withdraws.
 */
function countDrawersAbove(id: string): number {
  const index = openDrawerStack.findIndex(entry => entry.id === id);
  return index === -1 ? 0 : openDrawerStack.length - 1 - index;
}

function registerDrawer(id: string, close: () => void): number {
  openDrawerStack.push({id, close});
  registrationCounter += 1;
  notifyStackChanged();
  return NON_MODAL_BASE_Z + registrationCounter - 1;
}

function unregisterDrawer(id: string): void {
  const index = openDrawerStack.findIndex(entry => entry.id === id);
  if (index !== -1) {
    openDrawerStack.splice(index, 1);
  }
  if (openDrawerStack.length === 0) {
    registrationCounter = 0;
  }
  notifyStackChanged();
}

function isTopDrawer(id: string): boolean {
  return openDrawerStack[openDrawerStack.length - 1]?.id === id;
}

// =============================================================================
// Exit timing
// =============================================================================

// =============================================================================
// Styles
// =============================================================================

// Below this viewport width the drawer preserves a fixed reveal of the page
// behind instead of growing proportionally with the viewport. 640px is the
// repo's mobile breakpoint.
const MOBILE_BREAKPOINT = 640;

// Material's established mobile drawer pattern leaves a 56dp reveal. Using
// the same value in CSS pixels gives the overlay a stable visual relationship
// to the page behind while the requested width remains an upper bound.
const MOBILE_PAGE_REVEAL = 56;
const MOBILE_WIDTH_FULL = '100dvw';

// The bounded panel measures its reveal against the container, not the
// viewport: `100%` on an absolutely positioned box resolves against its
// containing block, which is the container the consumer handed us.
const BOUNDED_WIDTH_FULL = '100%';

const styles = stylex.create({
  dialog: {
    // Reset native <dialog> defaults — the dialog element IS the panel.
    position: 'fixed',
    margin: 0,
    padding: 0,
    border: 'none',
    // Square corners: the drawer is flush with the viewport edge on three
    // sides, so a radius would only ever cut the two edge-adjacent corners.
    borderRadius: 0,
    maxWidth: 'none',
    maxHeight: 'none',
    boxSizing: 'border-box',
    flexDirection: 'column',
    backgroundColor: colorVars['--color-background-surface'],
    boxShadow: shadowVars['--shadow-high'],
    overflow: 'hidden',
    overscrollBehavior: 'contain',
    outline: 'none',
    // The public geometry of the nested stack, declared on the element that
    // carries the `drawer` theme target so a theme can retune the effect
    // without forking the component — the same door `--spinner-diameter`
    // opens, e.g. drawer: { base: { '--drawer-stack-peek': '24px' } }.
    //
    // The scale step is unitless per level rather than a px inset like the
    // EPS Sheet this is lifted from. An inset in px has to be divided by the
    // measured panel size to become a scale, which costs a ResizeObserver and
    // makes the recede shallower on tall screens than on short ones; a ratio
    // is resolution-independent and needs no measurement.
    '--drawer-stack-peek': '40px',
    '--drawer-stack-scale-step': '0.04',
    '--drawer-stack-min-scale': '0.8',
    '--drawer-stack-radius': radiusVars['--radius-element'],
    // Full-height side panel, pinned across the block axis.
    insetBlockStart: 0,
    insetBlockEnd: 0,
    height: '100dvh',
    // Closed state. `display` is owned by React (see `rendered`), not by a
    // discrete `display` transition, so only `transform` animates here.
    display: 'none',
    // `border-radius` rides along because a drawer that recedes behind a
    // child rounds its corners on the way back, and snapping that corner
    // would read as a different panel rather than the same one moving.
    transitionProperty: 'transform, border-radius',
    transitionDuration: durationVars['--duration-medium'],
    transitionTimingFunction: easeVars['--ease-standard'],
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01s',
    },
  },
  // Rendered while the drawer is open AND while it slides out. Applied from
  // React state, not from a discrete `display` transition: `close()` drops the
  // dialog out of the top layer, and any ancestor that establishes a
  // containing block for fixed positioning (transform, filter, container-type,
  // contain) then becomes the origin for the panel's `position: fixed`. A
  // panel still painting after `close()` therefore snaps back INTO the layout
  // and covers the page for the rest of the hold. Owning `display` lets the
  // hide land in the same commit as `close()`, so no frame is ever painted
  // outside the top layer.
  //
  // Applied via the isOpen/exit state, not :where([open]) — attribute
  // selectors have zero specificity and can lose to default styles
  // depending on CSS source order (same rationale as Dialog/MobileNav).
  rendered: {
    display: 'flex',
  },
  // Bounded: the panel is pinned to an edge of the container rather than the
  // viewport. `position: absolute` resolves against the container (which the
  // consumer positions), and `height: 100%` fills it instead of the screen.
  // Never in the top layer — a top-layer element is always viewport-sized, so
  // a bounded drawer cannot be a modal `<dialog>` and is `show()`n instead.
  bounded: {
    position: 'absolute',
    height: '100%',
  },
  // Scrim for the bounded panel. `::backdrop` only paints for a top-layer
  // element, so a bounded drawer renders its own and confines it to the
  // container — which is the point: the area the drawer belongs to is the
  // area it blocks.
  boundedScrim: {
    position: 'absolute',
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    border: 'none',
    padding: 0,
    cursor: 'default',
    backgroundColor: colorVars['--color-overlay'],
    backdropFilter: 'blur(2px)',
    opacity: {
      default: 1,
      '@starting-style': 0,
    },
    transitionProperty: 'opacity',
    transitionDuration: durationVars['--duration-medium'],
    transitionTimingFunction: easeVars['--ease-standard'],
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01s',
    },
  },
  // A non-modal viewport drawer cannot use ::backdrop because it is opened
  // with show(). This sibling paints the requested scrim but deliberately
  // stays out of hit testing — modality, not paint, owns interaction.
  viewportScrim: {
    position: 'fixed',
    pointerEvents: 'none',
  },
  boundedScrimClosed: {
    opacity: 0,
  },
  // The bounded panel's own clipping box, filling the container's scrollport.
  //
  // Sized and offset imperatively (see the sync effect): `inset: 0` would
  // resolve against the container's SCROLLED padding box, so in a scrollable
  // pane the panel rides the content out of view. Only the start corner is
  // pinned here; the size and the scroll offset are written to the node.
  //
  // `overflow: clip`, NOT `hidden`, and this is the whole reason the wrapper
  // exists. `hidden` makes a box a SCROLL container: the panel enters at
  // translateX(100%), which overflows it, and the browser's focus
  // scroll-into-view then scrolls that box to reveal the panel — by exactly
  // the transform, so the panel appears frozen while the page content flies
  // past it. Measured in Chromium: with `hidden` the panel sits at x=437 for
  // every frame while the container scrolls 0 -> 260px; with `clip` the panel
  // animates 697 -> 437 and the container never scrolls. `clip` provides no
  // scrolling mechanism at all, so nothing can be scrolled away.
  //
  // It also means the consumer's container needs no `overflow` rule of its
  // own for the panel to stay inside it.
  boundedClip: {
    position: 'absolute',
    insetBlockStart: 0,
    insetInlineStart: 0,
    overflow: 'clip',
    // The wrapper spans the whole container, so it must not intercept the
    // clicks the container is still meant to receive; the scrim and the panel
    // re-enable pointer events for themselves.
    pointerEvents: 'none',
  },
  boundedInteractive: {
    pointerEvents: 'auto',
  },
  // start/end transforms flip under RTL so the panel always slides in from
  // the edge it is anchored to.
  end: {
    insetInlineEnd: 0,
    insetInlineStart: 'auto',
    borderInlineStartWidth: borderVars['--border-width'],
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: colorVars['--color-border'],
    transform: {
      default: 'translateX(100%)',
      ':is([dir="rtl"] *)': 'translateX(-100%)',
    },
  },
  endOpen: {
    transform: {
      default: 'translateX(0)',
      '@starting-style': {
        default: 'translateX(100%)',
        ':is([dir="rtl"] *)': 'translateX(-100%)',
      },
    },
  },
  start: {
    insetInlineStart: 0,
    insetInlineEnd: 'auto',
    borderInlineEndWidth: borderVars['--border-width'],
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: colorVars['--color-border'],
    transform: {
      default: 'translateX(-100%)',
      ':is([dir="rtl"] *)': 'translateX(100%)',
    },
  },
  startOpen: {
    transform: {
      default: 'translateX(0)',
      '@starting-style': {
        default: 'translateX(-100%)',
        ':is([dir="rtl"] *)': 'translateX(100%)',
      },
    },
  },
  // Scrim via the browser's ::backdrop pseudo-element (top layer).
  scrim: {
    '::backdrop': {
      backgroundColor: colorVars['--color-overlay'],
      backdropFilter: 'blur(2px)',
      opacity: 0,
      transitionProperty: 'opacity',
      transitionDuration: durationVars['--duration-medium'],
      transitionTimingFunction: easeVars['--ease-standard'],
    },
    '@media (prefers-reduced-motion: reduce)': {
      '::backdrop': {
        transitionDuration: '0.01s',
      },
    },
  },
  scrimOpen: {
    '::backdrop': {
      opacity: {
        default: 1,
        '@starting-style': 0,
      },
    },
  },
  // Scrollable content area — full-bleed; consumers compose their own
  // header/body/footer padding.
  // touch-action + overscroll containment keep momentum scrolling inside
  // the panel on touch devices; the safe-area inset keeps the last row of
  // content clear of the home indicator.
  content: {
    flexGrow: 1,
    minHeight: 0,
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'contain',
    touchAction: 'pan-y',
    paddingBlockEnd: 'env(safe-area-inset-bottom, 0px)',
    outline: 'none',
  },
  // Close affordance floats in the top-trailing corner, above the
  // scrollable content.
  controls: {
    position: 'absolute',
    insetBlockStart: spacingVars['--spacing-2'],
    insetInlineEnd: spacingVars['--spacing-2'],
    display: 'flex',
    gap: spacingVars['--spacing-1'],
    zIndex: 1,
  },
});

const dynamicStyles = stylex.create({
  // Width budget: the `width` prop on desktop, a share of the viewport below
  // the mobile breakpoint. maxWidth keeps a large desktop budget from
  // overflowing a narrow window.
  inlineSize: (desktopWidth: string, mobileWidth: string) => ({
    width: {
      default: desktopWidth,
      [`@media (max-width: ${MOBILE_BREAKPOINT}px)`]: mobileWidth,
    },
    maxWidth: '100dvw',
  }),
  // Bounded panels cap against the container, not the viewport.
  boundedInlineSize: (desktopWidth: string, mobileWidth: string) => ({
    width: {
      default: desktopWidth,
      [`@media (max-width: ${MOBILE_BREAKPOINT}px)`]: mobileWidth,
    },
    maxWidth: '100%',
  }),
  stackZ: (z: number) => ({
    zIndex: z,
  }),
  // The recede: a drawer with `depth` drawers stacked on top withdraws toward
  // its own edge and shrinks, so the stack reads as layered pages rather than
  // one panel replacing another.
  //
  // The panel slides AWAY from its own closing edge, so the leading edge of
  // each buried page stays visible beside the one in front, and the origin is
  // pinned to that same edge so the shrink reads as withdrawal into the page
  // rather than a panel floating free of it. Both flip under RTL, where the
  // closing edge is the other side of the screen.
  stackRecede: (depth: number, isEnd: boolean) => ({
    transform: {
      default: `translateX(calc(var(--drawer-stack-peek) * ${isEnd ? -depth : depth})) scale(max(var(--drawer-stack-min-scale), calc(1 - var(--drawer-stack-scale-step) * ${depth})))`,
      ':is([dir="rtl"] *)': `translateX(calc(var(--drawer-stack-peek) * ${isEnd ? depth : -depth})) scale(max(var(--drawer-stack-min-scale), calc(1 - var(--drawer-stack-scale-step) * ${depth})))`,
    },
    transformOrigin: {
      default: isEnd ? 'right center' : 'left center',
      ':is([dir="rtl"] *)': isEnd ? 'left center' : 'right center',
    },
    borderRadius: 'var(--drawer-stack-radius)',
  }),
});

// =============================================================================
// Types
// =============================================================================

export interface DrawerProps extends BaseProps<HTMLDialogElement> {
  /** Ref forwarded to the root <dialog> element */
  ref?: React.Ref<HTMLDialogElement>;

  /**
   * Whether the drawer is open. Fully controlled — pair with `onOpenChange`.
   */
  isOpen: boolean;

  /**
   * Called when the drawer requests an open-state change. Escape, scrim
   * click, and the built-in close button call it with `false`. The caller owns
   * the open state. When sibling drawers are open, Escape only closes the top
   * (last-opened) drawer.
   */
  onOpenChange: (isOpen: boolean) => void;

  /**
   * Which edge the drawer slides from.
   * - `'end'` — inline-end edge (right in LTR) — the inspector convention
   * - `'start'` — inline-start edge (left in LTR)
   * @default 'end'
   */
  side?: 'start' | 'end';

  /**
   * Desktop width budget. A number is pixels; a string is any CSS length
   * (`'50%'`, `'32rem'`). Below the mobile breakpoint (640px), this
   * remains the maximum while the drawer preserves a 56px reveal of the page
   * behind — see `isFullWidthOnMobile`.
   * @default 400
   */
  width?: number | string;

  /**
   * Whether the drawer covers the full viewport width on mobile
   * (below 640px) instead of preserving the default 56px reveal of the page
   * behind. The reveal makes the drawer read as an overlay rather than a
   * navigation.
   * @default false
   */
  isFullWidthOnMobile?: boolean;

  /**
   * Accessible label for the drawer (required — the drawer has no
   * built-in heading to derive a name from).
   */
  label: string;

  /**
   * Whether the drawer takes the area behind it out of play.
   * - `'modal'` (default) — the area behind is blocked: not clickable, not
   *   tabbable, not in the accessibility tree.
   * - `'nonModal'` — the area behind stays interactive. Escape still closes
   *   while focus is inside the drawer.
   *
   * `containerRef` changes which area that is — the container rather than
   * the page — not what the word means. The mechanism differs because the
   * browser top layer is always viewport-sized: a viewport drawer uses
   * `showModal()` (top layer, focus trap, body scroll lock), a bounded one
   * makes its container `inert`. Same guarantee, smaller scope; a bounded
   * modal is not `aria-modal` and does not lock body scroll, because
   * neither is true of it.
   * @default 'modal'
   */
  modality?: 'modal' | 'nonModal';

  /**
   * Whether to paint a scrim over the area behind the drawer.
   *
   * Independent of `modality`: this is what the user SEES, `modality` is
   * what is enforced. It defaults to match — a modal drawer scrims, a
   * non-modal one does not — so it only needs setting when you want them
   * apart, e.g. a non-modal inspector that still dims its context, or a
   * modal one over content that should stay legible. For modal drawers, the
   * scrim is also the pointer dismissal surface; a non-modal scrim is paint
   * only and does not intercept the interactive area behind it.
   * @default modality === 'modal'
   */
  hasScrim?: boolean;

  /**
   * Bound the drawer to an element instead of the viewport. The panel is
   * portalled into that element and slides against ITS edge, at its height —
   * the master-detail inspector that belongs to one pane rather than the whole
   * screen.
   *
   * The container must establish a containing block for absolute positioning:
   * give it `position: relative` (a dev warning fires if it is `static`).
   *
   * Scope only — it chooses the host, narrowing what `modality` and
   * `hasScrim` apply TO (the container, not the page) without changing what
   * either means. A bounded `modality="modal"` blocks its container with
   * `inert` rather than the top layer, so the rest of the page stays live;
   * it is not `aria-modal` and does not lock body scroll, because neither
   * is true of it.
   */
  containerRef?: React.RefObject<HTMLElement | null>;

  /**
   * Whether to render the built-in close button in the top-trailing
   * corner. Enabled by default for both modal and non-modal drawers so every
   * overlay has an obvious dismissal affordance.
   * @default true
   */
  hasCloseButton?: boolean;

  /**
   * Whether this drawer recedes when another drawer opens on top of it.
   *
   * Sibling drawers stack last-opened-on-top (see the stacking contract). By
   * default a buried drawer withdraws toward its own edge and shrinks a
   * little per level, so the stack reads as layered pages with each one's
   * leading edge still visible — the user can see what they came from and how
   * deep they are, instead of one panel silently replacing another.
   *
   * Set `false` to keep the panel at rest while children open over it. The
   * geometry is themeable rather than per-call: `--drawer-stack-peek`,
   * `--drawer-stack-scale-step`, `--drawer-stack-min-scale` and
   * `--drawer-stack-radius` on the `drawer` theme target.
   * @default true
   */
  hasStackRecede?: boolean;

  /**
   * Drawer content. Rendered inside a full-height scrollable area.
   * Focus the element with `data-autofocus` on open, if present.
   */
  children: ReactNode;

  /**
   * Test ID for the root element.
   */
  'data-testid'?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * An overlay panel for inspectors and detail views.
 *
 * Slides in from the logical start or end edge and floats above the page
 * using the native `<dialog>` element: modal with a scrim by default, or a
 * non-modal overlay with `modality="nonModal"` that leaves the area behind
 * interactive. `width` is the desktop budget; below 640px the panel preserves
 * a 56px page reveal without exceeding that budget (or fills the viewport
 * with `isFullWidthOnMobile`). Escape
 * closes the top-most open drawer; focus returns to the element that
 * opened it.
 *
 * @example
 * ```
 * const [selected, setSelected] = useState(null);
 * <Drawer
 *   isOpen={selected != null}
 *   onOpenChange={isOpen => !isOpen && setSelected(null)}
 *   label={`Details: ${selected?.name}`}>
 *   <HostDetails host={selected} />
 * </Drawer>
 * ```
 */
export function Drawer({
  isOpen,
  onOpenChange,
  side = 'end',
  width = 400,
  isFullWidthOnMobile = false,
  label,
  modality = 'modal',
  hasScrim,
  hasCloseButton = true,
  hasStackRecede = true,
  containerRef,
  children,
  xstyle,
  className,
  style,
  onClick: onClickProp,
  onKeyDown: onKeyDownProp,
  ref,
  ...props
}: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Registry identity + latest onOpenChange (stable across re-renders so the
  // registration effect doesn't churn on every onOpenChange identity change).
  const drawerId = useId();
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);
  // z-index assigned by the registry on open (non-modal stacking only).
  const [stackZ, setStackZ] = useState(NON_MODAL_BASE_Z);
  // Whether the panel paints: true while open and for the whole slide-out.
  const [isRendered, setIsRendered] = useState(isOpen);

  // Adjusted during render, not in an effect: the panel has to be rendered in
  // the same commit that targets the open transform, or @starting-style has
  // nothing to animate from.
  if (isOpen && !isRendered) {
    setIsRendered(true);
  }

  // Bounded mode. The portal target is read in a layout effect because the
  // consumer's ref is not populated on our first render.
  const isBounded = containerRef != null;
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  // Nothing to portal into until the panel actually paints, so an unopened
  // bounded Drawer never resolves a target and never pays the second commit
  // that resolving one costs. `isRendered` covers the whole slide-out too.
  const needsPortalTarget = isBounded && isRendered;
  // No dep array: the ref's *contents* can be swapped without the ref object
  // changing identity, and a resolved element can be unmounted from under us.
  // The comparison makes that free — a ref read per render, and a commit only
  // when the answer actually changed.
  useLayoutEffect(() => {
    const next = needsPortalTarget ? (containerRef?.current ?? null) : null;
    setPortalTarget(current => {
      if (current === next) {
        return current;
      }
      return next;
    });
  });
  // A resolved container that leaves the document takes the panel with it,
  // and nothing re-renders us to notice — the drawer would sit `isOpen` with
  // no dialog. Watch the document while we depend on one.
  useEffect(() => {
    if (!needsPortalTarget || portalTarget == null) {
      return;
    }
    const observer = new MutationObserver(() => {
      const next = containerRef?.current ?? null;
      if (next !== portalTarget || !portalTarget.isConnected) {
        setPortalTarget(next?.isConnected === true ? next : null);
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, [needsPortalTarget, portalTarget, containerRef]);

  // Three independent axes: `containerRef` is WHERE, `modality` is what
  // interaction is ENFORCED, and `hasScrim` is what is PAINTED. The visual
  // default follows modality, but callers can deliberately separate them.
  const blocksBehind = modality === 'modal';
  const showsScrim = hasScrim ?? blocksBehind;
  // The browser top layer is viewport-sized. A bounded modal enforces the
  // same promise over its container with `inert` instead.
  const isTopLayerModal = blocksBehind && !isBounded;
  // Dev-only, and in an effect rather than in render: getComputedStyle is a
  // style read, and one per render per Drawer is a cost the shipped build
  // should never pay to produce a warning it will never print.
  const [isStaticContainer, setIsStaticContainer] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || portalTarget == null) {
      return;
    }
    setIsStaticContainer(
      window.getComputedStyle(portalTarget).position === 'static',
    );
  }, [portalTarget]);
  useDevWarning(
    'Drawer',
    'containerRef points at a `position: static` element, so the panel will ' +
      'escape it and pin to the nearest positioned ancestor instead. Give ' +
      'the container `position: relative`.',
    isBounded && isStaticContainer,
  );

  // Pin the clip box to the container's SCROLLPORT, not to its scrolled
  // content. An absolutely positioned child of a scroll container has the
  // scrolled padding box as its containing block, so `inset: 0` alone rides
  // the content: measured in Chromium, scrolling a pane 0 -> 180px carried a
  // 292px panel from y=44 to y=-136, i.e. most of the way out of view.
  //
  // Written straight to the node rather than through state: this runs on
  // every scroll frame, and a re-render per frame is not affordable. A
  // transform keeps it on the compositor. For a container that does not
  // scroll, scrollLeft/scrollTop are 0 and client sizes are the padding box,
  // so this is exactly the old `inset: 0` — one code path, not two.
  useLayoutEffect(() => {
    const host = portalTarget;
    if (host == null) {
      return;
    }
    const sync = () => {
      const clip = clipRef.current;
      if (clip == null) {
        return;
      }
      clip.style.transform = `translate(${host.scrollLeft}px, ${host.scrollTop}px)`;
      clip.style.inlineSize = `${host.clientWidth}px`;
      clip.style.blockSize = `${host.clientHeight}px`;
    };
    sync();
    host.addEventListener('scroll', sync, {passive: true});
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(sync);
    observer?.observe(host);
    return () => {
      host.removeEventListener('scroll', sync);
      observer?.disconnect();
    };
  }, [portalTarget, isRendered]);

  // Bounded mode's half of `modality="modal"`. A bounded panel cannot use the top
  // layer, so this is what "the area behind is out of play" means for a
  // container: `inert` covers pointer, tab order and the accessibility tree
  // at once. Before it, the scrim blocked the pointer only — two reverse Tabs
  // out of the panel landed on the dimmed opener and Enter fired a control no
  // click could reach.
  //
  // Held for the whole open lifetime, not stamped once at open. A pane is
  // live content: a row streams in, a menu opens, a lazy panel resolves. A
  // one-shot pass over `host.children` leaves every one of those focusable
  // behind a scrim that already blocks the pointer — the same inconsistency
  // one layer down. The observer re-runs the pass on any child list change,
  // which is the only thing that can add one.
  useLayoutEffect(() => {
    const host = portalTarget;
    if (host == null || !blocksBehind || !isRendered) {
      return;
    }
    // Only what this drawer inerted, so a container that was already inert
    // for someone else's reason is handed back exactly as it was found.
    const blocked = new Set<HTMLElement>();

    const apply = () => {
      const clip = clipRef.current;
      for (const child of Array.from(host.children)) {
        if (
          child === clip ||
          !(child instanceof HTMLElement) ||
          child.hasAttribute('inert')
        ) {
          continue;
        }
        // The attribute rather than the IDL property: the property is not
        // implemented everywhere (jsdom has no `inert`), the attribute
        // reflects into it where it is, and it is what a consumer can see in
        // the DOM.
        child.setAttribute('inert', '');
        blocked.add(child);
      }
    };

    apply();
    // childList only: an attribute or subtree filter would fire on our own
    // writes and on every keystroke inside the pane, and neither can add a
    // child to the container.
    const observer = new MutationObserver(apply);
    observer.observe(host, {childList: true});

    return () => {
      observer.disconnect();
      for (const child of blocked) {
        child.removeAttribute('inert');
      }
    };
  }, [portalTarget, blocksBehind, isRendered]);

  // Opening, closing, the exit transition and the unmount cleanup all live in
  // the presence hook (#5549). Bounded mode hands it `isTopLayerModal`, not
  // the prop: a bounded panel never enters the top layer, so it must open
  // with show() even when it is modal.
  useDrawerDialogPresence({
    dialogRef,
    isOpen,
    isModal: isTopLayerModal,
    setIsRendered,
    mountHost: portalTarget,
  });

  // LIFO registry membership: register on open, unregister on close or
  // unmount. The returned z-index stacks non-modal siblings in open order.
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const z = registerDrawer(drawerId, () => onOpenChangeRef.current(false));
    setStackZ(z);
    return () => unregisterDrawer(drawerId);
  }, [isOpen, drawerId]);

  // How many drawers sit on top of this one. Read from the same registry that
  // already orders the stack, rather than from React nesting: the documented
  // contract is that sibling drawers stack (never nest them), so a context
  // walking the tree would find nothing to walk. The server snapshot is 0 —
  // nothing is open during SSR, so the first client paint matches the markup.
  const stackDepth = useSyncExternalStore(
    subscribeToDrawerStack,
    () => countDrawersAbove(drawerId),
    () => 0,
  );
  const recedeDepth = hasStackRecede && isOpen ? stackDepth : 0;

  // Lock body scroll while a modal drawer is open (iOS Safari workaround).
  // A bounded drawer blocks its container, not the page.
  useScrollLock(isOpen && isTopLayerModal);

  // Escape closes. The native `cancel` event only fires for showModal();
  // this React keydown handler covers the non-modal show() path too. Only the
  // top of the drawer stack closes, so stacked siblings peel off
  // innermost-first.
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isTopDrawer(drawerId)) {
          onOpenChange(false);
        }
      }
    },
    [onOpenChange, drawerId],
  );

  // Native cancel event (browser Escape handling) — prevent the browser
  // from closing the dialog directly and route through onOpenChange so the
  // caller's state stays the source of truth. Same top-of-stack rule as
  // the keydown path.
  const handleCancel = useCallback(
    (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      if (isTopDrawer(drawerId)) {
        onOpenChange(false);
      }
    },
    [onOpenChange, drawerId],
  );

  // Clicks on the ::backdrop target the <dialog> element itself; clicks on
  // drawer content always target a child (the content area fills the panel).
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget && isTopLayerModal) {
        onOpenChange(false);
      }
    },
    [isTopLayerModal, onOpenChange],
  );

  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const mobileWidth = isBounded
    ? isFullWidthOnMobile
      ? BOUNDED_WIDTH_FULL
      : `min(${widthValue}, calc(100% - ${MOBILE_PAGE_REVEAL}px))`
    : isFullWidthOnMobile
      ? MOBILE_WIDTH_FULL
      : `min(${widthValue}, calc(100dvw - ${MOBILE_PAGE_REVEAL}px))`;

  // The side the panel is ANCHORED to, which is the side it must slide back
  // out to. Latched at open, because a consumer commonly derives `side` from
  // the same state that drives `isOpen` (`side={selected?.side ?? 'end'}`):
  // that state clears on close, so the live prop flips mid-exit and the panel
  // teleports to the other edge and slides out the wrong way. Children stay
  // mounted for the exit for the same reason; so does the anchor.
  const exitSideRef = useRef(side);
  if (isOpen) {
    exitSideRef.current = side;
  }
  const anchoredSide = isOpen ? side : exitSideRef.current;

  const sideStyle = anchoredSide === 'start' ? styles.start : styles.end;
  const sideOpenStyle =
    anchoredSide === 'start' ? styles.startOpen : styles.endOpen;

  // Filter out native `open` to prevent InvalidStateError when passed
  const {open: _open, ...safeProps} = props as Record<string, unknown>;

  const panel = (
    <dialog
      ref={mergeRefs(ref, dialogRef)}
      {...mergeProps(
        themeProps('drawer', {side: anchoredSide}),
        stylex.props(
          styles.dialog,
          overlayPaddingReset.reset,
          sideStyle,
          isBounded
            ? dynamicStyles.boundedInlineSize(widthValue, mobileWidth)
            : dynamicStyles.inlineSize(widthValue, mobileWidth),
          isBounded && styles.bounded,
          isBounded && styles.boundedInteractive,
          isRendered && styles.rendered,
          isOpen && sideOpenStyle,
          recedeDepth > 0 &&
            dynamicStyles.stackRecede(recedeDepth, anchoredSide === 'end'),
          isTopLayerModal ? styles.scrim : dynamicStyles.stackZ(stackZ),
          isTopLayerModal && showsScrim && isOpen && styles.scrimOpen,
          xstyle,
        ),
        className,
        style,
      )}
      {...safeProps}
      // How many drawers are stacked on top of this one, mirrored onto the DOM
      // so the recede is inspectable and an app can hang its own rules off it.
      // Absent at rest, so the common single drawer carries no extra state.
      data-stack-depth={recedeDepth > 0 ? recedeDepth : undefined}
      aria-label={label}
      aria-modal={isTopLayerModal ? 'true' : undefined}
      onClick={composeEventHandlers(onClickProp, handleClick)}
      onKeyDown={composeEventHandlers(onKeyDownProp, handleKeyDown)}
      onCancel={handleCancel}>
      {/* Scrollable content area — tabIndex so the dialog's focusing steps
          land on the panel body rather than the first button inside. */}
      <div tabIndex={-1} {...stylex.props(styles.content)}>
        {children}
      </div>
      {hasCloseButton && (
        <div {...stylex.props(styles.controls)}>
          <IconButton
            icon={<Icon icon="close" size="sm" color="inherit" />}
            label="Close"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          />
        </div>
      )}
    </dialog>
  );

  const customScrim = !isTopLayerModal && showsScrim && isRendered && (
    <button
      type="button"
      data-drawer-scrim=""
      // This is never a keyboard destination. In modal bounded mode it is the
      // pointer dismissal plane; in non-modal mode it is paint only and stays
      // out of hit testing so the underlying scope remains interactive.
      tabIndex={-1}
      aria-hidden="true"
      {...stylex.props(
        styles.boundedScrim,
        !isBounded && styles.viewportScrim,
        blocksBehind && styles.boundedInteractive,
        !isOpen && styles.boundedScrimClosed,
        dynamicStyles.stackZ(stackZ),
      )}
      onClick={blocksBehind ? () => onOpenChange(false) : undefined}
    />
  );

  if (!isBounded) {
    return (
      <>
        {customScrim}
        {panel}
      </>
    );
  }

  // Bounded: portal the panel into the container so it positions against it,
  // and carry its own scrim — `::backdrop` paints only for the top layer.
  // Nothing is rendered until the container ref resolves.
  if (portalTarget == null) {
    return null;
  }

  return createPortal(
    <div ref={clipRef} {...stylex.props(styles.boundedClip)}>
      {customScrim}
      {panel}
    </div>,
    portalTarget,
  );
}

Drawer.displayName = 'Drawer';
