// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {BottomSheet} from '@astryxdesign/core/BottomSheet';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {List, ListItem} from '@astryxdesign/core/List';
import {Section} from '@astryxdesign/core/Section';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

const ACTIONS = [
  'Edit project',
  'Duplicate project',
  'Share project',
  'Archive project',
] as const;

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
            hasDividers
            header={<Heading level={3}>Project actions</Heading>}>
            {ACTIONS.map(action => (
              <ListItem
                key={action}
                label={action}
                onClick={() => selectAction(action)}
              />
            ))}
          </List>
        </Section>
      </BottomSheet>
    </>
  );
}
