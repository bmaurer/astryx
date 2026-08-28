// Copyright (c) Meta Platforms, Inc. and affiliates.

import type {Meta, StoryObj} from '@storybook/react';
import {useRef, useState} from 'react';
import {Drawer} from '@astryxdesign/lab';
import {Button} from '@astryxdesign/core/Button';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Divider} from '@astryxdesign/core/Divider';
import {Heading} from '@astryxdesign/core/Heading';
import {Section} from '@astryxdesign/core/Section';
import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

const meta: Meta<typeof Drawer> = {
  title: 'Lab/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A side panel that **floats above** page content — it overlays the',
          'layout instead of reflowing it, which is what separates a drawer',
          'from a docked panel.',
          '',
          '- Anchors to the **inline start or end** edge only (left/right in',
          '  LTR); block-axis sheets are `BottomSheet`.',
          '- Works on **desktop and touch**: `width` is the desktop budget',
          '  budget, and below 640px the panel preserves a 56px reveal',
          '  without exceeding that budget (`isFullWidthOnMobile` makes it',
          '  edge to edge).',
          '- **Three independent axes**: `containerRef` chooses scope,',
          '  `modality` chooses whether that scope is blocked, and `hasScrim`',
          '  chooses whether it is dimmed. Defaults remain modal + scrim.',
          '- **Square corners** (0px radius) — the panel is flush with three',
          '  viewport edges.',
        ].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{width: 560, minHeight: 360, padding: 32}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const HOSTS = [
  {id: 'web-01', region: 'us-east-1', status: 'Healthy', cpu: '32%'},
  {id: 'web-02', region: 'us-east-1', status: 'Healthy', cpu: '41%'},
  {id: 'worker-01', region: 'eu-west-1', status: 'Degraded', cpu: '87%'},
];

const REGIONS = ['us-east-1', 'eu-west-1', 'ap-south-1'];

export const Showcase: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label="Open inspector" onClick={() => setIsOpen(true)} />
        <Drawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          label="Deployment details"
          width={400}>
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>web-prod-04</Heading>
                <Text type="supporting" color="secondary">
                  us-east-1, deployed 12 min ago
                </Text>
              </VStack>
              <Divider />
              <VStack gap={2}>
                <Text type="label">Status</Text>
                <Text type="body">
                  Healthy - all 6 instances passing readiness checks.
                </Text>
              </VStack>
              <VStack gap={2}>
                <Text type="label">Build</Text>
                <Text type="body">#4821 - main @ 03536f1</Text>
              </VStack>
            </VStack>
          </Section>
        </Drawer>
      </>
    );
  },
};

export const RowInspector: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = HOSTS.find(host => host.id === selectedId);
    return (
      <>
        <VStack gap={1}>
          {HOSTS.map(host => (
            <Button
              key={host.id}
              variant="ghost"
              label={`${host.id} / ${host.region}`}
              onClick={() => setSelectedId(host.id)}
            />
          ))}
        </VStack>
        <Drawer
          isOpen={selected != null}
          onOpenChange={isOpen => !isOpen && setSelectedId(null)}
          label={selected ? `Host details: ${selected.id}` : 'Host details'}
          modality="nonModal"
          width={360}>
          {selected != null && (
            <Section padding={4}>
              <VStack gap={4}>
                <VStack gap={1}>
                  <Heading level={3}>{selected.id}</Heading>
                  <Text type="supporting" color="secondary">
                    {selected.region}
                  </Text>
                </VStack>
                <Divider />
                <VStack gap={2}>
                  <Text type="label">Status</Text>
                  <Text type="body">{selected.status}</Text>
                  <Text type="label">CPU</Text>
                  <Text type="body">{selected.cpu}</Text>
                </VStack>
                <Button
                  label="Close inspector"
                  variant="secondary"
                  onClick={() => setSelectedId(null)}
                />
              </VStack>
            </Section>
          )}
        </Drawer>
      </>
    );
  },
};

/**
 * `containerRef` binds the drawer to an element instead of the viewport: the
 * panel slides against the pane's edge, at the pane's height, and its scrim
 * dims only that pane. `modality` then applies to the pane rather than the
 * page — the pane is `inert` while the drawer is open, and the rest of the
 * page stays live. The mechanism differs because the browser top layer is
 * always viewport-sized, so a bounded modal is not `aria-modal` and does not
 * lock body scroll. Give the container `position: relative`.
 */
export const Bounded: Story = {
  render: () => {
    const paneRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = HOSTS.find(host => host.id === selectedId);
    return (
      <VStack gap={3}>
        <Text type="supporting" color="secondary">
          The drawer is bound to the bordered pane. Everything outside it stays
          interactive while the drawer is open.
        </Text>
        <div
          ref={paneRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: 300,
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}>
          <Section padding={4}>
            <VStack gap={1}>
              <Heading level={3}>Hosts</Heading>
              {HOSTS.map(host => (
                <Button
                  key={host.id}
                  variant="ghost"
                  label={`${host.id} / ${host.region}`}
                  onClick={() => setSelectedId(host.id)}
                />
              ))}
            </VStack>
          </Section>
        </div>
        <Button
          label="Still clickable while the drawer is open"
          variant="secondary"
        />
        <Drawer
          isOpen={selected != null}
          onOpenChange={isOpen => !isOpen && setSelectedId(null)}
          label={selected ? `Host details: ${selected.id}` : 'Host details'}
          containerRef={paneRef}
          width={260}>
          {selected != null && (
            <Section padding={4}>
              <VStack gap={4}>
                <VStack gap={1}>
                  <Heading level={3}>{selected.id}</Heading>
                  <Text type="supporting" color="secondary">
                    {selected.region}
                  </Text>
                </VStack>
                <Divider />
                <VStack gap={2}>
                  <Text type="label">Status</Text>
                  <Text type="body">{selected.status}</Text>
                  <Text type="label">CPU</Text>
                  <Text type="body">{selected.cpu}</Text>
                </VStack>
              </VStack>
            </Section>
          )}
        </Drawer>
      </VStack>
    );
  },
};

/**
 * A bounded drawer in a pane that SCROLLS. The panel is pinned to the pane's
 * scrollport, so scrolling the host list moves the list and leaves the
 * inspector where it is — an absolutely positioned child would ride the
 * content out of view instead. With the scrim up, the list behind it is
 * `inert`: it cannot be clicked, and it cannot be tabbed into either.
 */
export const BoundedInAScrollingPane: Story = {
  name: 'Bounded in a scrolling pane',
  render: () => {
    const paneRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = HOSTS.find(host => host.id === selectedId);
    // Enough rows that the pane genuinely scrolls.
    const rows = [...HOSTS, ...HOSTS, ...HOSTS, ...HOSTS];
    return (
      <VStack gap={3}>
        <Text type="supporting" color="secondary">
          Open the drawer, then scroll the pane behind it. The panel stays put.
        </Text>
        <div
          ref={paneRef}
          style={{
            position: 'relative',
            overflow: 'auto',
            height: 300,
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}>
          <Section padding={4}>
            <VStack gap={1}>
              <Heading level={3}>Hosts</Heading>
              {rows.map((host, index) => (
                <Button
                  key={`${host.id}-${index}`}
                  variant="ghost"
                  label={`${host.id} / ${host.region}`}
                  onClick={() => setSelectedId(host.id)}
                />
              ))}
            </VStack>
          </Section>
        </div>
        <Button
          label="Still clickable while the drawer is open"
          variant="secondary"
        />
        <Drawer
          isOpen={selected != null}
          onOpenChange={isOpen => !isOpen && setSelectedId(null)}
          label={selected ? `Host details: ${selected.id}` : 'Host details'}
          containerRef={paneRef}
          width={260}>
          {selected != null && (
            <Section padding={4}>
              <VStack gap={2}>
                <Heading level={3}>{selected.id}</Heading>
                <Text type="body">{selected.region}</Text>
                <Divider />
                <Text type="label">Status</Text>
                <Text type="body">{selected.status}</Text>
              </VStack>
            </Section>
          )}
        </Drawer>
      </VStack>
    );
  },
};

/**
 * Both edges. `side="start"` is left in LTR (and right in RTL) — use it for
 * navigation-adjacent content; `end` is the inspector convention.
 */
export const Sides: Story = {
  render: () => {
    const [side, setSide] = useState<'start' | 'end' | null>(null);
    return (
      <>
        <HStack gap={2}>
          <Button label="Open from start" onClick={() => setSide('start')} />
          <Button label="Open from end" onClick={() => setSide('end')} />
        </HStack>
        <Drawer
          isOpen={side != null}
          onOpenChange={isOpen => !isOpen && setSide(null)}
          label={`Filters (${side ?? 'end'})`}
          side={side ?? 'end'}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Filter by region</Heading>
              <Text type="supporting" color="secondary">
                Sliding in from the {side} edge.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>
    );
  },
};

/**
 * `width` is the desktop budget: a number of pixels or any CSS length.
 * Narrow the browser below 640px: each width remains an upper bound while
 * the drawer preserves a 56px reveal of the page behind.
 */
export const Widths: Story = {
  render: () => {
    const [width, setWidth] = useState<number | string | null>(null);
    return (
      <>
        <HStack gap={2}>
          <Button label="320px" onClick={() => setWidth(320)} />
          <Button label="480px" onClick={() => setWidth(480)} />
          <Button label="50%" onClick={() => setWidth('50%')} />
        </HStack>
        <Drawer
          isOpen={width != null}
          onOpenChange={isOpen => !isOpen && setWidth(null)}
          label="Details"
          width={width ?? 400}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="body">Desktop width budget: {String(width)}</Text>
            </VStack>
          </Section>
        </Drawer>
      </>
    );
  },
};

/**
 * On touch viewports (below 640px) the drawer preserves a 56px reveal of the
 * page behind without exceeding its width budget; `isFullWidthOnMobile` makes
 * it edge to edge. Resize the preview below 640px to compare.
 */
export const MobileWidth: Story = {
  render: () => {
    const [openFull, setOpenFull] = useState(false);
    const [openPartial, setOpenPartial] = useState(false);
    const [selected, setSelected] = useState<string[]>(REGIONS.slice(0, 1));
    const filters = (
      <Section padding={4}>
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={3}>Filter by region</Heading>
            <Text type="supporting" color="secondary">
              Showing hosts in {selected.length} of {REGIONS.length} regions
            </Text>
          </VStack>
          <VStack gap={2}>
            {REGIONS.map(region => (
              <CheckboxInput
                key={region}
                label={region}
                value={selected.includes(region)}
                onChange={checked =>
                  setSelected(current =>
                    checked
                      ? [...current, region]
                      : current.filter(r => r !== region),
                  )
                }
              />
            ))}
          </VStack>
          <Button
            label="Apply filters"
            onClick={() => {
              setOpenFull(false);
              setOpenPartial(false);
            }}
            data-autofocus
          />
        </VStack>
      </Section>
    );
    return (
      <>
        <HStack gap={2}>
          <Button
            label="56px reveal on mobile"
            onClick={() => setOpenPartial(true)}
          />
          <Button
            label="Full width on mobile"
            variant="secondary"
            onClick={() => setOpenFull(true)}
          />
        </HStack>
        <Drawer
          isOpen={openPartial}
          onOpenChange={setOpenPartial}
          label="Region filters">
          {filters}
        </Drawer>
        <Drawer
          isOpen={openFull}
          onOpenChange={setOpenFull}
          label="Region filters (full width)"
          isFullWidthOnMobile>
          {filters}
        </Drawer>
      </>
    );
  },
};

/**
 * A drawer floats above the page: the content underneath keeps its layout
 * and never reflows to make room, which is the difference between a drawer
 * and a docked panel. Compare the text column with the drawer open and
 * closed — nothing behind it moves.
 */
export const FloatsOverContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <VStack gap={3}>
          <Button
            label={isOpen ? 'Close drawer' : 'Open drawer'}
            onClick={() => setIsOpen(open => !open)}
          />
          <Heading level={3}>Deployment log</Heading>
          {[
            'The page keeps its full width while the drawer is open.',
            'No column reflows, no content jumps, nothing is pushed aside.',
            'The drawer is painted on top and the layout underneath is',
            'untouched — which is exactly what a docked panel would not do.',
          ].map(line => (
            <Text key={line} type="body">
              {line}
            </Text>
          ))}
        </VStack>
        <Drawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          label="Deployment details"
          modality="nonModal">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="supporting" color="secondary">
                Floating above the page, not docked beside it.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>
    );
  },
};

/**
 * `modality` controls interaction; `hasScrim` controls paint. Their defaults
 * match, while all four combinations remain available for future products.
 * A non-modal scrim is visual only and does not intercept the page behind it.
 */
export const Scrim: Story = {
  render: () => {
    type Combination =
      'modal-scrim' | 'modal-clear' | 'nonmodal-scrim' | 'nonmodal-clear';
    const [combination, setCombination] = useState<Combination | null>(null);
    const blocksBehind = combination?.startsWith('modal-') ?? true;
    const hasScrim = combination?.endsWith('-scrim') ?? true;

    return (
      <>
        <VStack gap={3}>
          <HStack gap={2} wrap="wrap">
            <Button
              label="Modal + scrim"
              onClick={() => setCombination('modal-scrim')}
            />
            <Button
              label="Modal + clear"
              variant="secondary"
              onClick={() => setCombination('modal-clear')}
            />
            <Button
              label="Non-modal + scrim"
              variant="secondary"
              onClick={() => setCombination('nonmodal-scrim')}
            />
            <Button
              label="Non-modal + clear"
              variant="secondary"
              onClick={() => setCombination('nonmodal-clear')}
            />
          </HStack>
          <Text type="supporting" color="secondary">
            Scope, enforcement and paint are independent: containerRef chooses
            where, modality chooses blocking, and hasScrim chooses dimming.
          </Text>
        </VStack>
        <Drawer
          isOpen={combination != null}
          onOpenChange={isOpen => !isOpen && setCombination(null)}
          label="Drawer axis combination"
          modality={blocksBehind ? 'modal' : 'nonModal'}
          hasScrim={hasScrim}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>
                {blocksBehind ? 'Modal' : 'Non-modal'}
              </Heading>
              <Text type="body">
                {hasScrim ? 'Scrim painted.' : 'No scrim painted.'}{' '}
                {blocksBehind
                  ? 'The area behind is blocked.'
                  : 'The area behind remains interactive.'}
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>
    );
  },
};

/**
 * Sibling drawers stack last-opened-on-top, and a buried drawer recedes: it
 * withdraws toward its own edge and shrinks a little per level, so the stack
 * reads as layered pages with each leading edge still visible. The user can
 * see what they came from and how deep they are.
 *
 * Depth comes from the drawer stack itself, so this works with the documented
 * sibling pattern — no nesting. Retune the geometry on the theme
 * (`--drawer-stack-peek`, `--drawer-stack-scale-step`,
 * `--drawer-stack-min-scale`, `--drawer-stack-radius`), or set
 * `hasStackRecede={false}` to keep a panel at rest.
 */
export const NestedStack: Story = {
  render: () => {
    const [depth, setDepth] = useState(0);
    const levels = [1, 2, 3];
    return (
      <>
        <VStack gap={3}>
          <Button label="Open level 1" onClick={() => setDepth(1)} />
          <Text type="supporting" color="secondary">
            Open another level from inside the drawer to see the stack fan back.
          </Text>
        </VStack>
        {levels.map(level => (
          <Drawer
            key={level}
            isOpen={depth >= level}
            onOpenChange={isOpen => !isOpen && setDepth(level - 1)}
            label={`Level ${level}`}
            width={360}>
            <Section padding={4}>
              <VStack gap={4}>
                <Heading level={3}>Level {level}</Heading>
                <Text type="body">
                  {level < levels.length
                    ? 'Open the next level: this panel stays visible behind it.'
                    : 'The deepest level. Close it to bring the one behind forward.'}
                </Text>
                {level < levels.length && (
                  <Button
                    label={`Open level ${level + 1}`}
                    onClick={() => setDepth(level + 1)}
                  />
                )}
              </VStack>
            </Section>
          </Drawer>
        ))}
      </>
    );
  },
};
