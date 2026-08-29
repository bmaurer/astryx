// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import {BottomSheet} from '@astryxdesign/core/BottomSheet';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Icon} from '@astryxdesign/core/Icon';
import {List, ListItem} from '@astryxdesign/core/List';
import {Section} from '@astryxdesign/core/Section';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

const ACTIONS = [
  {label: 'Edit project', icon: PencilIcon},
  {label: 'Duplicate project', icon: DocumentDuplicateIcon},
  {label: 'Share project', icon: ShareIcon},
  {label: 'Archive project', icon: ArchiveBoxIcon},
] as const;

const styles = stylex.create({
  action: {
    paddingInlineStart: 0,
  },
});

export default function DropdownMenuBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const selectAction = (action: string) => {
    setLastAction(action);
    setIsOpen(false);
  };

  return (
    <>
      <VStack gap={3}>
        <Button label="Project actions" onClick={() => setIsOpen(true)} />
        {lastAction && (
          <Text type="supporting" color="secondary">
            Last action: {lastAction}
          </Text>
        )}
      </VStack>

      <BottomSheet
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        label="Project actions"
        height="hug">
        <Section padding={4}>
          <List
            density="spacious"
            header={<Heading level={3}>Project actions</Heading>}>
            {ACTIONS.map(({label, icon}) => (
              <ListItem
                key={label}
                label={label}
                startContent={<Icon icon={icon} size="sm" />}
                onClick={() => selectAction(label)}
                xstyle={styles.action}
              />
            ))}
          </List>
        </Section>
      </BottomSheet>
    </>
  );
}
