// Copyright (c) Meta Platforms, Inc. and affiliates.

import {components} from '../generated/componentRegistry';
import {groupedComponents} from '../generated/groupedComponentRegistry';
import type {
  ComponentItem,
  GroupedEntry,
  GroupedGroup,
} from '../generated/groupedComponentRegistry';

export interface ComponentSidebarEntry extends GroupedEntry {
  packageName: string;
  canaryOnly: boolean;
}

export interface ComponentSidebarGroup extends Omit<GroupedGroup, 'entries'> {
  packageName: string;
  canaryOnly: boolean;
  entries: ComponentSidebarEntry[];
}

export type ComponentSidebarItem =
  ComponentSidebarEntry | ComponentSidebarGroup;

export interface ComponentSidebarData {
  componentItems: ComponentSidebarItem[];
  utilities: ComponentSidebarEntry[];
}

const unstableComponentKeys = new Set(
  Object.entries(components).flatMap(([packageName, entries]) =>
    entries
      .filter(entry => entry.canaryOnly)
      .map(entry => `${packageName}:${entry.name}`),
  ),
);

function enrichEntry(
  entry: GroupedEntry,
  packageName: string,
): ComponentSidebarEntry {
  return {
    ...entry,
    packageName,
    canaryOnly: unstableComponentKeys.has(`${packageName}:${entry.name}`),
  };
}

function enrichItem(
  item: ComponentItem,
  packageName: string,
): ComponentSidebarItem {
  if (item.type === 'entry') {
    return enrichEntry(item, packageName);
  }
  return {
    ...item,
    packageName,
    canaryOnly: item.entries.every(entry =>
      unstableComponentKeys.has(`${packageName}:${entry.name}`),
    ),
    entries: item.entries.map(entry =>
      enrichEntry({...entry, type: 'entry', description: ''}, packageName),
    ),
  };
}

/**
 * Single source of truth for the component sidebar. Every package represented
 * in the generated registry participates. Same-named families merge across
 * packages, while entries retain ownership so navigation surfaces can mark
 * canary-only components as unstable.
 */
export function getComponentSidebarData(): ComponentSidebarData {
  const componentItems: ComponentSidebarItem[] = [];
  const componentGroups = new Map<string, ComponentSidebarGroup>();
  const utilities: ComponentSidebarEntry[] = [];

  const groupedPackages = Object.entries(groupedComponents).sort(
    ([a], [b]) =>
      Number(b === '@astryxdesign/core') - Number(a === '@astryxdesign/core'),
  );
  for (const [packageName, grouped] of groupedPackages) {
    for (const rawItem of grouped.items) {
      const item = enrichItem(rawItem, packageName);
      if (item.type === 'entry') {
        componentItems.push(item);
        continue;
      }
      const existing = componentGroups.get(item.label);
      if (!existing) {
        componentGroups.set(item.label, item);
        continue;
      }
      existing.entries.push(...item.entries);
      existing.entries.sort((a, b) => a.name.localeCompare(b.name));
      existing.canaryOnly = existing.entries.every(entry => entry.canaryOnly);
      if (existing.packageName !== item.packageName) {
        existing.packageName = 'multiple';
      }
    }
    utilities.push(
      ...grouped.utilities.map(entry =>
        enrichEntry({...entry, type: 'entry', description: ''}, packageName),
      ),
    );
  }

  componentItems.push(...componentGroups.values());
  componentItems.sort((a, b) => {
    const aKey = a.type === 'entry' ? a.name : a.label;
    const bKey = b.type === 'entry' ? b.name : b.label;
    return aKey.localeCompare(bKey);
  });
  utilities.sort((a, b) => a.name.localeCompare(b.name));

  return {componentItems, utilities};
}

export function flattenComponentSidebarEntries(
  {componentItems, utilities}: ComponentSidebarData = getComponentSidebarData(),
): ComponentSidebarEntry[] {
  const entries: ComponentSidebarEntry[] = [];

  for (const item of componentItems) {
    if (item.type === 'entry') {
      entries.push(item);
    } else {
      entries.push(...item.entries);
    }
  }

  entries.push(...utilities);
  return entries;
}
