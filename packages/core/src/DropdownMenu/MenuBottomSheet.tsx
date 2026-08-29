// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file MenuBottomSheet.tsx
 * @input Uses BottomSheet and Section
 * @output Internal action-sheet host for menu content
 * @position Shared by DropdownMenu and ContextMenu adaptive presentations
 */

import {lazy, Suspense, type ReactNode} from 'react';
import {Section} from '../Section/Section';

const LazyBottomSheet = lazy(async () =>
  import('../BottomSheet/BottomSheet').then(module => ({
    default: module.BottomSheet,
  })),
);

interface MenuBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  label: string;
  children: ReactNode;
}

export function MenuBottomSheet({
  isOpen,
  onOpenChange,
  label,
  children,
}: MenuBottomSheetProps) {
  return (
    <Suspense fallback={null}>
      <LazyBottomSheet
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        label={label}
        height="hug"
        purpose="info">
        <Section paddingBlock={4} paddingInline={1}>
          {children}
        </Section>
      </LazyBottomSheet>
    </Suspense>
  );
}

MenuBottomSheet.displayName = 'MenuBottomSheet';
