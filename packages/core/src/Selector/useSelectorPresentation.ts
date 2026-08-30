// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file useSelectorPresentation.ts
 * @input Uses the shared adaptive presentation policy and usePopover
 * @output Coordinates popover and bottom-sheet disclosure state
 * @position Internal presentation controller shared by Selector and MultiSelector
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type RefObject,
} from 'react';
import {
  usePopoverInternal,
  type UsePopoverOptions,
  type UsePopoverReturn,
} from '../Popover/usePopover';
import {
  useResolvedMenuPresentation,
  type MenuPresentation,
  type ResolvedMenuPresentation,
} from '../DropdownMenu/menuPresentation';
import {
  getInteractionModality,
  trackInteractionModality,
} from '../utils/interactionModality';

interface UseSelectorPresentationOptions {
  presentation: MenuPresentation;
  onHide: () => void;
  popoverOptions: Omit<UsePopoverOptions, 'onHide'>;
  triggerRef: RefObject<HTMLElement | null>;
}

interface SelectorPresentationController {
  activePresentation: ResolvedMenuPresentation;
  hide: () => void;
  isOpen: boolean;
  isSheetOpen: boolean;
  onSheetOpenChange: (isOpen: boolean) => void;
  onTriggerFocus: (event: FocusEvent<HTMLElement>) => void;
  popover: UsePopoverReturn & {wasJustDismissed: () => boolean};
  show: () => void;
  wasJustDismissed: () => boolean;
}

export function useSelectorPresentation({
  presentation,
  onHide,
  popoverOptions,
  triggerRef,
}: UseSelectorPresentationOptions): SelectorPresentationController {
  const resolvedPresentation = useResolvedMenuPresentation(presentation);
  const activePresentationRef =
    useRef<ResolvedMenuPresentation>(resolvedPresentation);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isSheetOpenRef = useRef(false);
  const onHideRef = useRef(onHide);
  const shouldClearRestoredFocusRef = useRef(false);
  onHideRef.current = onHide;

  useEffect(() => {
    trackInteractionModality();
  }, []);

  const prepareFocusRestoration = useCallback(() => {
    shouldClearRestoredFocusRef.current =
      getInteractionModality() === 'pointer';
  }, []);

  const handlePopoverHide = useCallback(() => {
    prepareFocusRestoration();
    onHideRef.current();
    triggerRef.current?.focus();
  }, [prepareFocusRestoration, triggerRef]);
  const popover = usePopoverInternal({
    ...popoverOptions,
    onHide: handlePopoverHide,
  });
  const {
    hide: hidePopover,
    show: showPopover,
    wasJustDismissed: wasPopoverJustDismissed,
  } = popover;

  const show = useCallback(() => {
    activePresentationRef.current = resolvedPresentation;
    if (resolvedPresentation === 'bottom-sheet') {
      isSheetOpenRef.current = true;
      setIsSheetOpen(true);
    } else {
      showPopover();
    }
  }, [resolvedPresentation, showPopover]);

  const hide = useCallback(() => {
    if (isSheetOpenRef.current) {
      prepareFocusRestoration();
      isSheetOpenRef.current = false;
      setIsSheetOpen(false);
      onHideRef.current();
    } else {
      hidePopover();
    }
  }, [hidePopover, prepareFocusRestoration]);

  const handleTriggerFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    if (
      shouldClearRestoredFocusRef.current &&
      getInteractionModality() === 'pointer'
    ) {
      shouldClearRestoredFocusRef.current = false;
      event.currentTarget.blur();
    }
  }, []);

  const handleSheetOpenChange = useCallback(
    (nextIsOpen: boolean) => {
      if (nextIsOpen) {
        show();
      } else {
        hide();
      }
    },
    [hide, show],
  );

  const isOpen = popover.isOpen || isSheetOpen;
  const activePresentation = isOpen
    ? activePresentationRef.current
    : resolvedPresentation;

  const wasJustDismissed = useCallback(
    () =>
      activePresentationRef.current === 'popover' && wasPopoverJustDismissed(),
    [wasPopoverJustDismissed],
  );

  return {
    activePresentation,
    hide,
    isOpen,
    isSheetOpen,
    onSheetOpenChange: handleSheetOpenChange,
    onTriggerFocus: handleTriggerFocus,
    popover,
    show,
    wasJustDismissed,
  };
}
