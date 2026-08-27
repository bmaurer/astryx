// Copyright (c) Meta Platforms, Inc. and affiliates.

import type {CSSProperties} from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Text} from '@astryxdesign/core/Text';
import {HStack, VStack} from '@astryxdesign/core/Layout';

const meta: Meta<typeof Spinner> = {
  title: 'Core/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    shade: {
      control: 'select',
      options: ['default', 'onMedia'],
      description: 'Color shade',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/**
 * A flex host of a fixed width, drawn so the spinner's relationship to it is
 * visible. Deliberately a raw flex container: the point of the story below is
 * what an arbitrary consumer's layout does to the spinner's box.
 */
const narrowHost = (width: number): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width,
  border: '1px dashed #b0b0b0',
  padding: 4,
});

export const Default: Story = {
  args: {
    size: 'md',
    shade: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={4} vAlign="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </HStack>
  ),
};

export const Shades: Story = {
  render: () => (
    <HStack gap={4} vAlign="center">
      <Spinner shade="default" />
      <div
        style={{
          backgroundColor: '#1a1a2e',
          padding: 16,
          borderRadius: 8,
        }}>
        <Spinner shade="onMedia" />
      </div>
    </HStack>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <HStack gap={8} vAlign="start">
      <Spinner size="lg" label="Loading..." />
      <Spinner
        size="lg"
        label={
          <VStack gap={0} hAlign="center">
            <Text type="body" weight="bold">
              Fetching data
            </Text>
            <Text type="supporting" color="secondary">
              This may take a moment
            </Text>
          </VStack>
        }
        aria-label="Fetching data"
      />
    </HStack>
  ),
};

/**
 * A flex host narrower than the spinner in it. The box keeps the ring's size
 * and overflows the host visibly; before the fix the host compressed the box
 * and the ring was cut off at its edge, silently — a sliced ring still spins,
 * so nothing reported a problem. The dashed rule is the host, drawn so the
 * overflow is legible.
 *
 * All three are ordinary layouts rather than contrived ones: a label beside a
 * spinner in a narrow row, a spinner next to a sibling that will not give up
 * its width, and a host smaller than the spinner outright.
 */
export const NarrowFlexHost: Story = {
  render: () => (
    <VStack gap={4} hAlign="start">
      <VStack gap={1} hAlign="start">
        <Text type="supporting" color="secondary">
          Label beside it, in a 140px row
        </Text>
        <div style={narrowHost(140)}>
          <Spinner size="md" />
          <Text type="body">Uploading attachments…</Text>
        </div>
      </VStack>

      <VStack gap={1} hAlign="start">
        <Text type="supporting" color="secondary">
          Beside a sibling that keeps its width (flex: 1 0 100px)
        </Text>
        <div style={narrowHost(120)}>
          <Spinner size="lg" />
          <div style={{flex: '1 0 100px', height: 8, background: '#e0e0e0'}} />
        </div>
      </VStack>

      <VStack gap={1} hAlign="start">
        <Text type="supporting" color="secondary">
          Host narrower than the spinner outright (16px)
        </Text>
        <div style={narrowHost(16)}>
          <Spinner size="xl" />
        </div>
      </VStack>
    </VStack>
  ),
};
