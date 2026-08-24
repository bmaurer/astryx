// Copyright (c) Meta Platforms, Inc. and affiliates.

import type {Meta, StoryObj} from '@storybook/react';
import * as stylex from '@stylexjs/stylex';
import {Badge} from '@astryxdesign/core/Badge';
import {BottomSheet} from '@astryxdesign/core/BottomSheet';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {List, ListItem} from '@astryxdesign/core/List';
import {Section} from '@astryxdesign/core/Section';
import {useEffect, useState} from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuDivider,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubMenu,
} from '@astryxdesign/core/DropdownMenu';
import {spacingVars} from '@astryxdesign/core/theme/tokens.stylex';
import {
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ArchiveBoxIcon,
  FolderPlusIcon,
  DocumentPlusIcon,
  UserIcon,
  EllipsisHorizontalIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Core/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    button: {
      description: 'Props for customizing the trigger button',
    },
    items: {
      description: 'Menu items (items, dividers, or sections)',
    },
    isMenuOpen: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    menuWidth: {
      control: 'text',
      description:
        'Minimum menu width (number for px or CSS string), capped to the available viewport space',
    },
    placement: {
      control: 'select',
      options: ['above', 'below', 'start', 'end'],
      description: 'Menu placement relative to trigger',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Menu alignment along the placement axis',
    },
    'data-testid': {
      control: 'text',
      description: 'Test ID for testing frameworks',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const readinessStyles = stylex.create({
  viewportStoryCanvas: {
    boxSizing: 'border-box',
    inlineSize: '100%',
    minBlockSize: '100dvh',
    paddingBlockStart: spacingVars['--spacing-4'],
    paddingBlockEnd: spacingVars['--spacing-4'],
    paddingInlineStart: spacingVars['--spacing-4'],
    paddingInlineEnd: spacingVars['--spacing-4'],
    overflow: 'clip',
  },
  edgeAnchorRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionList: {
    inlineSize: '100%',
  },
});

const PROJECT_ACTIONS = [
  'Edit project',
  'Duplicate project',
  'Share project',
  'Archive project',
] as const;

type ProjectAction = (typeof PROJECT_ACTIONS)[number];
type ActionPresentation = 'dropdown-menu' | 'action-sheet';

function useCompactTouchSurface(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const query = window.matchMedia(
      '(max-width: 639px) and (pointer: coarse) and (hover: none)',
    );
    const sync = () => setMatches(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return matches;
}

function ProjectActionPresentation({
  forcePresentation,
}: {
  forcePresentation?: ActionPresentation;
}) {
  const isCompactTouchSurface = useCompactTouchSurface();
  const presentation =
    forcePresentation ??
    (isCompactTouchSurface ? 'action-sheet' : 'dropdown-menu');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const selectAction = (action: ProjectAction) => {
    console.log(`${action} selected`);
    setIsSheetOpen(false);
  };

  if (presentation === 'action-sheet') {
    return (
      <>
        <Button label="Project actions" onClick={() => setIsSheetOpen(true)}>
          Project actions
        </Button>
        <BottomSheet
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          label="Project actions"
          height="hug">
          <Section padding={4}>
            <List
              hasDividers
              header={<Heading level={3}>Project actions</Heading>}
              xstyle={readinessStyles.actionList}>
              {PROJECT_ACTIONS.map(action => (
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

  return (
    <DropdownMenu
      button={{label: 'Project actions'}}
      items={PROJECT_ACTIONS.map(action => ({
        label: action,
        onClick: () => selectAction(action),
      }))}
    />
  );
}

function CompactDrillInActionSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'actions' | 'projects'>('actions');

  const close = () => {
    setIsOpen(false);
    setView('actions');
  };

  return (
    <>
      <Button label="Project actions" onClick={() => setIsOpen(true)}>
        Project actions
      </Button>
      <BottomSheet
        isOpen={isOpen}
        onOpenChange={nextIsOpen => {
          setIsOpen(nextIsOpen);
          if (!nextIsOpen) {
            setView('actions');
          }
        }}
        label={view === 'actions' ? 'Project actions' : 'Move to project'}
        height="hug">
        <Section padding={4}>
          {view === 'actions' ? (
            <List
              hasDividers
              header={<Heading level={3}>Project actions</Heading>}
              xstyle={readinessStyles.actionList}>
              <ListItem label="Rename project" onClick={close} />
              <ListItem
                label="Move to project"
                onClick={() => setView('projects')}
              />
              <ListItem label="Archive project" onClick={close} />
            </List>
          ) : (
            <List
              hasDividers
              header={
                <div>
                  <Button
                    label="Back to project actions"
                    variant="ghost"
                    onClick={() => setView('actions')}>
                    Back
                  </Button>
                  <Heading level={3}>Move to project</Heading>
                </div>
              }
              xstyle={readinessStyles.actionList}>
              {PROJECT_DESTINATIONS.slice(0, 4).map(([label, team]) => (
                <ListItem
                  key={label}
                  label={label}
                  description={team}
                  onClick={close}
                />
              ))}
            </List>
          )}
        </Section>
      </BottomSheet>
    </>
  );
}

const PROJECT_DESTINATIONS = [
  ['Apollo launch', 'Marketing'],
  ['Customer insights', 'Research'],
  ['Design systems', 'Platform'],
  ['Growth experiments', 'Product'],
  ['Incident review', 'Operations'],
  ['Mobile quality', 'Engineering'],
  ['Quarterly planning', 'Strategy'],
  ['Recruiting plan', 'People'],
  ['Security follow-up', 'Trust'],
  ['Website refresh', 'Brand'],
] as const;

// Basic usage
export const Default: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Actions'}}
      items={[
        {label: 'Edit', onClick: () => console.log('Edit clicked')},
        {label: 'Duplicate', onClick: () => console.log('Duplicate clicked')},
        {label: 'Delete', onClick: () => console.log('Delete clicked')},
      ]}
    />
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Actions', variant: 'primary'}}
      items={[
        {label: 'Edit', icon: PencilIcon, onClick: () => console.log('Edit')},
        {
          label: 'Duplicate',
          icon: DocumentDuplicateIcon,
          onClick: () => console.log('Duplicate'),
        },
        {
          label: 'Download',
          icon: ArrowDownTrayIcon,
          onClick: () => console.log('Download'),
        },
        {
          label: 'Delete',
          icon: TrashIcon,
          onClick: () => console.log('Delete'),
        },
      ]}
    />
  ),
};

// With sections
export const WithSections: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'File', variant: 'ghost'}}
      items={[
        {
          type: 'section',
          title: 'Create',
          items: [
            {
              label: 'New File',
              icon: DocumentPlusIcon,
              onClick: () => console.log('New File'),
            },
            {
              label: 'New Folder',
              icon: FolderPlusIcon,
              onClick: () => console.log('New Folder'),
            },
          ],
        },
        {
          type: 'section',
          title: 'Share',
          items: [
            {
              label: 'Share',
              icon: ShareIcon,
              onClick: () => console.log('Share'),
            },
            {
              label: 'Archive',
              icon: ArchiveBoxIcon,
              onClick: () => console.log('Archive'),
            },
          ],
        },
      ]}
    />
  ),
};

// With dividers
export const WithDividers: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Actions'}}
      items={[
        {label: 'Edit', onClick: () => console.log('Edit')},
        {label: 'Duplicate', onClick: () => console.log('Duplicate')},
        {type: 'divider'},
        {label: 'Delete', onClick: () => console.log('Delete')},
      ]}
    />
  ),
};

// With disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Actions'}}
      items={[
        {label: 'Edit', onClick: () => console.log('Edit')},
        {label: 'Duplicate', onClick: () => console.log('Duplicate')},
        {label: 'Delete (disabled)', isDisabled: true},
      ]}
    />
  ),
};

export const DestructiveItem: Story = {
  name: 'Destructive item',
  render: () => (
    <DropdownMenu
      button={{label: 'Actions'}}
      items={[
        {label: 'Edit', onClick: () => console.log('Edit')},
        {
          label: 'Duplicate',
          icon: 'copy',
          onClick: () => console.log('Duplicate'),
        },
        {type: 'divider'},
        {
          label: 'Delete',
          icon: 'close',
          variant: 'destructive',
          onClick: () => console.log('Delete'),
        },
      ]}
    />
  ),
};

// Controlled mode
export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
        }}>
        <div>Menu is {isOpen ? 'open' : 'closed'}</div>
        <DropdownMenu
          button={{label: 'Controlled Menu'}}
          isMenuOpen={isOpen}
          onOpenChange={setIsOpen}
          items={[
            {label: 'Item 1', onClick: () => console.log('Item 1')},
            {label: 'Item 2', onClick: () => console.log('Item 2')},
            {label: 'Item 3', onClick: () => console.log('Item 3')},
          ]}
        />
      </div>
    );
  },
};

// Custom menu width
export const CustomWidth: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Wide Menu'}}
      menuWidth={300}
      items={[
        {
          label: 'This is a longer option that needs more space',
          onClick: () => console.log('Option 1'),
        },
        {
          label: 'Another long option with extra text',
          onClick: () => console.log('Option 2'),
        },
        {label: 'Short one', onClick: () => console.log('Option 3')},
      ]}
    />
  ),
};

// Button variants
export const ButtonVariants: Story = {
  render: () => (
    <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
      <DropdownMenu
        button={{label: 'Secondary', variant: 'secondary'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
      <DropdownMenu
        button={{label: 'Primary', variant: 'primary'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
      <DropdownMenu
        button={{label: 'Ghost', variant: 'ghost'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
      <DropdownMenu
        button={{label: 'Destructive', variant: 'destructive'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
    </div>
  ),
};

// Button sizes
export const ButtonSizes: Story = {
  render: () => (
    <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
      <DropdownMenu
        button={{label: 'Small', size: 'sm'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
      <DropdownMenu
        button={{label: 'Medium', size: 'md'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
      <DropdownMenu
        button={{label: 'Large', size: 'lg'}}
        items={[{label: 'Option 1'}, {label: 'Option 2'}]}
      />
    </div>
  ),
};

// With onClick callback
export const WithOnClick: Story = {
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
        }}>
        <div>Button clicked {clickCount} times</div>
        <DropdownMenu
          button={{label: 'Click Me'}}
          onClick={() => setClickCount(c => c + 1)}
          items={[
            {label: 'Menu Item', onClick: () => console.log('Item clicked')},
          ]}
        />
      </div>
    );
  },
};

export const StaysOpenOnSelect: Story = {
  render: () => {
    const [copied, setCopied] = useState(false);
    return (
      <DropdownMenu
        button={{label: 'Session'}}
        items={[
          {
            label: copied ? 'Copied' : 'Copy session ID',
            icon: <DocumentDuplicateIcon style={{width: 16, height: 16}} />,
            hasCloseOnSelect: false,
            onClick: () => setCopied(true),
          },
          {label: 'Rename'},
          {label: 'Delete', variant: 'destructive'},
        ]}
        onOpenChange={isOpen => {
          if (!isOpen) {
            setCopied(false);
          }
        }}
      />
    );
  },
};

// Custom item rendering with compound mode
export const CustomItemRender: Story = {
  render: () => (
    <DropdownMenu button={{label: 'Select User'}} menuWidth={280}>
      <DropdownMenuItem
        icon={UserIcon}
        label="Alice Johnson"
        description="alice.johnson@example.com"
        onClick={() => console.log('Alice')}
      />
      <DropdownMenuItem
        icon={UserIcon}
        label="Bob Smith"
        description="bob.smith@example.com"
        onClick={() => console.log('Bob')}
      />
      <DropdownMenuItem
        icon={UserIcon}
        label="Carol Williams"
        description="carol.williams@example.com"
        onClick={() => console.log('Carol')}
      />
    </DropdownMenu>
  ),
};

// Icon-only trigger — renders as a square icon button (e.g., "⋯" menu)
export const IconOnly: Story = {
  render: () => (
    <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
      <DropdownMenu
        button={{
          label: 'More options',
          icon: <EllipsisHorizontalIcon />,
          variant: 'ghost',
          isIconOnly: true,
        }}
        items={[
          {label: 'Edit', icon: PencilIcon, onClick: () => console.log('Edit')},
          {
            label: 'Delete',
            icon: TrashIcon,
            onClick: () => console.log('Delete'),
          },
        ]}
      />
      <DropdownMenu
        button={{
          label: 'Settings',
          icon: <Cog6ToothIcon />,
          variant: 'secondary',
          isIconOnly: true,
        }}
        items={[
          {label: 'Preferences', onClick: () => console.log('Preferences')},
          {label: 'Account', onClick: () => console.log('Account')},
        ]}
      />
    </div>
  ),
};

// Icon + label together — pass children on button to get visible text with icon
export const IconWithLabel: Story = {
  render: () => (
    <DropdownMenu
      button={{
        label: 'Settings',
        icon: <Cog6ToothIcon />,
        variant: 'ghost',
        children: 'Settings',
      }}
      items={[
        {label: 'Preferences', onClick: () => console.log('Preferences')},
        {label: 'Account', onClick: () => console.log('Account')},
      ]}
    />
  ),
};

// No chevron — label-only trigger without dropdown indicator
export const NoChevron: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Sort by: Name', variant: 'ghost'}}
      hasChevron={false}
      items={[
        {label: 'Name', onClick: () => console.log('Name')},
        {label: 'Date', onClick: () => console.log('Date')},
        {label: 'Size', onClick: () => console.log('Size')},
      ]}
    />
  ),
};

// Compound-component mode — JSX children with interactive items
export const CompoundBasic: Story = {
  render: () => (
    <DropdownMenu button={{label: 'Actions'}}>
      <DropdownMenuItem
        icon={PencilIcon}
        label="Edit"
        onClick={() => console.log('Edit')}
      />
      <DropdownMenuItem
        icon={DocumentDuplicateIcon}
        label="Duplicate"
        onClick={() => console.log('Duplicate')}
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        icon={TrashIcon}
        label="Delete"
        onClick={() => console.log('Delete')}
      />
    </DropdownMenu>
  ),
};

// Compound mode with disabled items
export const CompoundWithDisabled: Story = {
  render: () => (
    <DropdownMenu button={{label: 'File Actions'}}>
      <DropdownMenuItem
        icon={PencilIcon}
        label="Edit"
        onClick={() => console.log('Edit')}
      />
      <DropdownMenuItem
        icon={DocumentDuplicateIcon}
        label="Duplicate"
        onClick={() => console.log('Duplicate')}
      />
      <DropdownMenuDivider />
      <DropdownMenuItem
        icon={TrashIcon}
        label="Delete (no permission)"
        isDisabled
      />
    </DropdownMenu>
  ),
};

// Compound mode with conditional items
export const CompoundConditional: Story = {
  render: () => {
    const [canDelete, setCanDelete] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
        }}>
        <label style={{display: 'flex', gap: 8, alignItems: 'center'}}>
          <input
            type="checkbox"
            checked={canDelete}
            onChange={e => setCanDelete(e.target.checked)}
          />
          Show delete option
        </label>
        <DropdownMenu button={{label: 'Actions'}}>
          <DropdownMenuItem
            icon={PencilIcon}
            label="Edit"
            onClick={() => console.log('Edit')}
          />
          <DropdownMenuItem
            icon={ShareIcon}
            label="Share"
            onClick={() => console.log('Share')}
          />
          {canDelete && (
            <>
              <DropdownMenuDivider />
              <DropdownMenuItem
                icon={TrashIcon}
                label="Delete"
                onClick={() => console.log('Delete')}
              />
            </>
          )}
        </DropdownMenu>
      </div>
    );
  },
};

// Compound mode with descriptions
export const CompoundWithDescriptions: Story = {
  render: () => (
    <DropdownMenu button={{label: 'Select User'}} menuWidth={280}>
      <DropdownMenuItem
        icon={UserIcon}
        label="Alice Johnson"
        description="alice.johnson@example.com"
        onClick={() => console.log('Alice')}
      />
      <DropdownMenuItem
        icon={UserIcon}
        label="Bob Smith"
        description="bob.smith@example.com"
        onClick={() => console.log('Bob')}
      />
      <DropdownMenuItem
        icon={UserIcon}
        label="Carol Williams"
        description="carol.williams@example.com"
        onClick={() => console.log('Carol')}
      />
    </DropdownMenu>
  ),
};

export const PlacementAbove: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Bottom toolbar menu'}}
      placement="above"
      items={[
        {label: 'Edit', onClick: () => console.log('Edit')},
        {label: 'Duplicate', onClick: () => console.log('Duplicate')},
        {label: 'Delete', onClick: () => console.log('Delete')},
      ]}
    />
  ),
};

export const AlignmentEnd: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Row actions'}}
      alignment="end"
      menuWidth={220}
      items={[
        {label: 'Edit', onClick: () => console.log('Edit')},
        {label: 'Duplicate', onClick: () => console.log('Duplicate')},
        {label: 'Delete', onClick: () => console.log('Delete')},
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use alignment="end" when a menu should extend back over the trigger, such as a row action menu near the inline-end edge.',
      },
    },
  },
};

export const RTL: Story = {
  render: () => (
    <div style={{direction: 'rtl', display: 'flex', gap: '16px'}}>
      <DropdownMenu
        button={{label: 'CSS direction: rtl'}}
        items={[
          {label: 'Edit', onClick: () => console.log('Edit')},
          {label: 'Duplicate', onClick: () => console.log('Duplicate')},
          {label: 'Delete', onClick: () => console.log('Delete')},
        ]}
      />
      <div dir="ltr">
        <div dir="rtl">
          <DropdownMenu
            button={{label: 'dir="rtl" attribute'}}
            items={[
              {label: 'Edit', onClick: () => console.log('Edit')},
              {label: 'Duplicate', onClick: () => console.log('Duplicate')},
              {label: 'Delete', onClick: () => console.log('Delete')},
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'In RTL contexts (CSS direction property or dir attribute) the menu right-edge-aligns to the trigger and grows toward the left — the logical mirror of the LTR default (#3389). Both direction mechanisms are shown; the popover inherits direction from the trigger subtree and the self-* position-area keywords mirror it in pure CSS.',
      },
    },
  },
};

// =============================================================================
// Lab — selectable items (#3829)
// =============================================================================

export const LabCheckboxItems: Story = {
  render: function LabCheckboxItemsStory() {
    const [showArchived, setShowArchived] = useState(false);
    const [showDrafts, setShowDrafts] = useState(true);
    return (
      <DropdownMenu button={{label: 'View'}}>
        <DropdownMenuCheckboxItem
          label="Show archived"
          value={showArchived}
          onChange={setShowArchived}
        />
        <DropdownMenuCheckboxItem
          label="Show drafts"
          description="Include unpublished items"
          value={showDrafts}
          onChange={setShowDrafts}
        />
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'DropdownMenuCheckboxItem — independent toggles (role="menuitemcheckbox"). The menu stays open on toggle by default so several can be flipped at once.',
      },
    },
  },
};

export const LabRadioGroup: Story = {
  render: function LabRadioGroupStory() {
    const [sort, setSort] = useState('newest');
    return (
      <DropdownMenu button={{label: 'Sort'}}>
        <DropdownMenuRadioGroup value={sort} onChange={setSort} label="Sort by">
          <DropdownMenuRadioItem value="newest" label="Newest" />
          <DropdownMenuRadioItem value="oldest" label="Oldest" />
          <DropdownMenuRadioItem
            value="az"
            label="Alphabetical"
            description="A → Z"
          />
        </DropdownMenuRadioGroup>
      </DropdownMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'DropdownMenuRadioGroup + DropdownMenuRadioItem — single-select group (role="menuitemradio"). Selecting closes the menu by default.',
      },
    },
  },
};

export const LabSelectableSizes: Story = {
  render: function LabSelectableSizesStory() {
    const [sm, setSm] = useState('a');
    const [lg, setLg] = useState('a');
    return (
      <div style={{display: 'flex', gap: 24}}>
        <DropdownMenu button={{label: 'Small menu', size: 'sm'}}>
          <DropdownMenuRadioGroup value={sm} onChange={setSm} label="Small">
            <DropdownMenuRadioItem value="a" label="Option A" />
            <DropdownMenuRadioItem value="b" label="Option B" />
          </DropdownMenuRadioGroup>
        </DropdownMenu>
        <DropdownMenu button={{label: 'Large menu', size: 'lg'}}>
          <DropdownMenuRadioGroup value={lg} onChange={setLg} label="Large">
            <DropdownMenuRadioItem value="a" label="Option A" />
            <DropdownMenuRadioItem value="b" label="Option B" />
          </DropdownMenuRadioGroup>
        </DropdownMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The checkbox/radio control size is derived from the menu item size — a `sm` menu renders the small (18px) control, `md`/`lg` render the standard (22px) control. On coarse-pointer (touch) devices the control swaps to the inline-end of the row.',
      },
    },
  },
};

export const Submenu: Story = {
  render: () => (
    <DropdownMenu button={{label: 'Actions'}}>
      <DropdownMenuItem icon={PencilIcon} label="Rename" onClick={() => {}} />
      <DropdownMenuSubMenu icon={FolderPlusIcon} label="Move to">
        <DropdownMenuItem label="Folder A" onClick={() => {}} />
        <DropdownMenuItem label="Folder B" onClick={() => {}} />
        <DropdownMenuItem label="Folder C" onClick={() => {}} />
      </DropdownMenuSubMenu>
      <DropdownMenuItem icon={TrashIcon} label="Delete" onClick={() => {}} />
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'DropdownMenuSubMenu is a single menu row that reveals a nested flyout of its own children. Hover or Right arrow (Left in RTL) / Enter / Space opens it and moves focus to its first item; Left arrow / Escape closes it and returns focus to the trigger. The flyout opens inline-end by default and auto-flips at the viewport edge.',
      },
    },
  },
};

export const NestedSubmenu: Story = {
  render: () => (
    <DropdownMenu button={{label: 'Share'}}>
      <DropdownMenuItem icon={ShareIcon} label="Copy link" onClick={() => {}} />
      <DropdownMenuSubMenu label="Share to">
        <DropdownMenuItem label="Email" onClick={() => {}} />
        <DropdownMenuSubMenu label="Team">
          <DropdownMenuItem label="Design" onClick={() => {}} />
          <DropdownMenuItem label="Engineering" onClick={() => {}} />
        </DropdownMenuSubMenu>
      </DropdownMenuSubMenu>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Submenus nest to arbitrary depth — each level owns its own roving focus and positioning layer.',
      },
    },
  },
};

export const SubmenuAsyncSpinner: Story = {
  render: () => (
    <DropdownMenu button={{label: 'Actions'}}>
      <DropdownMenuItem label="Rename" onClick={() => {}} />
      <DropdownMenuSubMenu label="Move to" hasSpinner>
        <DropdownMenuItem label="Loading…" isDisabled onClick={() => {}} />
      </DropdownMenuSubMenu>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A submenu row can show a spinner in place of the caret via `hasSpinner`, e.g. while a lazy submenu\u2019s children load.',
      },
    },
  },
};

export const SubmenuDataDriven: Story = {
  render: () => (
    <DropdownMenu
      button={{label: 'Actions'}}
      items={[
        {label: 'Rename', onClick: () => {}},
        {
          label: 'Move to',
          icon: FolderPlusIcon,
          items: [
            {label: 'Folder A', onClick: () => {}},
            {label: 'Folder B', onClick: () => {}},
          ],
        },
        {type: 'divider'},
        {label: 'Delete', onClick: () => {}},
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Data-driven parity: give a menu item a nested `items` array and it becomes a submenu automatically — no separate item type.',
      },
    },
  },
};

// The same menu — dividers and a trailing shortcut hint — expressed in each
// mode. Neither could express both before: data mode had no `endContent`,
// compound mode had no divider component.
export const ModeParity: Story = {
  parameters: {layout: 'padded'},
  render: () => (
    <div style={{display: 'flex', gap: 160, justifyContent: 'center'}}>
      <DropdownMenu
        button={{label: 'Data mode'}}
        menuWidth={220}
        items={[
          {
            label: 'Search',
            icon: MagnifyingGlassIcon,
            endContent: <Badge label="⌘K" />,
          },
          {
            label: 'Duplicate',
            icon: DocumentDuplicateIcon,
            endContent: <Badge label="⌘D" />,
          },
          {type: 'divider'},
          {label: 'Delete', icon: TrashIcon, variant: 'destructive'},
        ]}
      />
      <DropdownMenu button={{label: 'Compound mode'}} menuWidth={220}>
        <DropdownMenuItem
          icon={MagnifyingGlassIcon}
          label="Search"
          endContent={<Badge label="⌘K" />}
        />
        <DropdownMenuItem
          icon={DocumentDuplicateIcon}
          label="Duplicate"
          endContent={<Badge label="⌘D" />}
        />
        <DropdownMenuDivider />
        <DropdownMenuItem
          icon={TrashIcon}
          label="Delete"
          variant="destructive"
        />
      </DropdownMenu>
    </div>
  ),
};

// =============================================================================
// Responsive and Interaction Readiness Evidence
// =============================================================================

export const ActionSheetPresentation: Story = {
  name: 'Presentation / action sheet',
  parameters: {
    layout: 'fullscreen',
    viewport: {defaultViewport: 'mobile1'},
    docs: {
      story: {inline: false, height: '560px'},
      description: {
        story:
          'An explicit action-sheet presentation for a short, flat set of actions. It uses BottomSheet behavior—dialog focus, scrim, Escape, and swipe dismissal—rather than changing DropdownMenu itself.',
      },
    },
  },
  render: () => (
    <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <ProjectActionPresentation forcePresentation="action-sheet" />
    </div>
  ),
  play: async ({canvasElement}) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  },
};

export const AdaptiveActionPresentation: Story = {
  name: 'Presentation / adaptive action menu',
  parameters: {
    layout: 'fullscreen',
    viewport: {defaultViewport: 'mobile1'},
    docs: {
      story: {inline: false, height: '560px'},
      description: {
        story:
          'A product-owned example using the same actions in both presentations. This example policy chooses the action sheet only when the real environment is compact, coarse-pointer, and hover-free; it is not a DropdownMenu default or a universal breakpoint rule. Storybook viewport size alone does not pretend to change pointer or hover capability.',
      },
    },
  },
  render: () => (
    <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <ProjectActionPresentation />
    </div>
  ),
  play: async ({canvasElement}) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  },
};

export const CompactDrillInPresentation: Story = {
  name: 'Presentation / compact drill-in hierarchy',
  parameters: {
    layout: 'fullscreen',
    viewport: {defaultViewport: 'mobile1'},
    docs: {
      story: {inline: false, height: '560px'},
      description: {
        story:
          'An explicit product-owned alternative when a cascading submenu cannot fit beside its parent on a compact touch surface. BottomSheet owns the modal contract, and Move to project drills into a second list with a Back action. Core DropdownMenu does not switch to this automatically.',
      },
    },
  },
  render: () => (
    <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <CompactDrillInActionSheet />
    </div>
  ),
  play: async ({canvasElement}) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  },
};

export const ViewportFit: Story = {
  name: 'Readiness / viewport fit',
  parameters: {
    layout: 'fullscreen',
    viewport: {defaultViewport: 'mobile1'},
    docs: {
      description: {
        story:
          'Uses the actual Storybook viewport. The menu requests a 640px minimum width near the inline edge and must keep 16px safe-area-aware gutters instead of widening the page.',
      },
    },
  },
  render: () => (
    <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <div {...stylex.props(readinessStyles.edgeAnchorRow)}>
        <DropdownMenu
          button={{label: 'Project actions'}}
          alignment="end"
          menuWidth={640}
          items={[
            {label: 'Rename project', onClick: () => {}},
            {label: 'Duplicate project', onClick: () => {}},
            {
              label: 'Share with external collaborators and reviewers',
              onClick: () => {},
            },
            {type: 'divider'},
            {label: 'Archive project', onClick: () => {}},
          ]}
        />
      </div>
    </div>
  ),
  play: async ({canvasElement}) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  },
};

export const TallContentOverflow: Story = {
  name: 'Readiness / tall content overflow',
  parameters: {
    layout: 'fullscreen',
    viewport: {defaultViewport: 'mobile1'},
    docs: {
      description: {
        story:
          'Uses the actual Storybook viewport and a realistic project list. The anchored menu stays at or below 300px and scrolls internally, so its actions remain reachable without scrolling the page.',
      },
    },
  },
  render: () => (
    <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <DropdownMenu button={{label: 'Move to project'}} menuWidth={280}>
        {PROJECT_DESTINATIONS.map(([label, team]) => (
          <DropdownMenuItem
            key={label}
            label={label}
            description={team}
            onClick={() => {}}
          />
        ))}
      </DropdownMenu>
    </div>
  ),
  play: async ({canvasElement}) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  },
};

export const SubmenuViewportFit: Story = {
  name: 'Stress / submenu viewport containment',
  parameters: {
    layout: 'fullscreen',
    viewport: {defaultViewport: 'mobile1'},
    docs: {
      description: {
        story:
          'Containment stress test, not a recommended compact-touch presentation. The submenu intentionally requests 640px; when the parent and child cannot fit side by side, the layer stays inside viewport gutters but overlaps the parent. Products needing hierarchy on compact touch surfaces should choose an explicit drill-in interaction rather than assuming a cascade can fit.',
      },
    },
  },
  render: () => (
    <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <div {...stylex.props(readinessStyles.edgeAnchorRow)}>
        <DropdownMenu
          button={{label: 'Project actions'}}
          alignment="end"
          menuWidth={200}>
          <DropdownMenuItem label="Rename project" onClick={() => {}} />
          <DropdownMenuSubMenu label="Move to project" menuWidth={640}>
            <DropdownMenuItem
              label="Customer insights and research"
              onClick={() => {}}
            />
            <DropdownMenuItem
              label="Design systems platform"
              onClick={() => {}}
            />
            <DropdownMenuItem
              label="Mobile quality engineering"
              onClick={() => {}}
            />
          </DropdownMenuSubMenu>
          <DropdownMenuItem label="Archive project" onClick={() => {}} />
        </DropdownMenu>
      </div>
    </div>
  ),
  play: async ({canvasElement}) => {
    const trigger = canvasElement.querySelector('button');
    if (!(trigger instanceof HTMLElement)) {
      return;
    }
    trigger.click();
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    const submenuTrigger = canvasElement.querySelector(
      '[role="menuitem"][aria-haspopup="menu"]',
    );
    if (submenuTrigger instanceof HTMLElement) {
      submenuTrigger.click();
    }
  },
};
