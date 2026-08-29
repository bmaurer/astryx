// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').TemplateDoc} */
export const doc = {
  type: 'block',
  exampleFor: 'DropdownMenu',
  alsoExampleFor: ['BottomSheet'],
  name: 'DropdownMenu — Bottom sheet alternative',
  displayName: 'DropdownMenu — Bottom sheet alternative',
  description:
    'An explicit action-sheet-style BottomSheet for a short, flat action set on a compact touch surface. Use this as a product-owned alternative when the modal bottom-edge interaction is appropriate; DropdownMenu itself remains anchored and does not switch presentation automatically.',
  isReady: true,
  aspectRatio: 3 / 4,
  componentsUsed: [
    'BottomSheet',
    'Button',
    'Heading',
    'List',
    'ListItem',
    'Section',
    'Stack',
    'Text',
  ],
};
