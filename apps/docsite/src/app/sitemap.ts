// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file sitemap.ts
 *
 * Dynamic sitemap for the docsite. Next.js serves this at /sitemap.xml and
 * regenerates it on every build, so the URL set tracks the same generated
 * registries that drive the routes themselves — add a component, doc topic,
 * template, or blog post and it appears in the sitemap with no manual edit.
 *
 * Mirrors the `generateStaticParams` of each dynamic route so the sitemap and
 * the actual rendered pages never drift. `getSitemapPages()` exposes the same
 * entries with their canonical page titles for 404 recovery.
 *
 * @output MetadataRoute.Sitemap consumed by Next.js to emit /sitemap.xml
 */

import type {MetadataRoute} from 'next';
import {cacheLife} from 'next/cache';
import {SITE_URL} from '../lib/siteConfig';
import {CHANGELOG_PAGE_TITLE} from '../lib/pageTitles';
import {flattenComponentSidebarEntries} from '../components/componentSidebarData';
import {docTopics} from '../generated/docsRegistry';
import {packages} from '../generated/packageRegistry';
import {templates} from '../generated/templateRegistry';
import {blogPosts} from '../generated/blogRegistry';

export type SitemapPage = MetadataRoute.Sitemap[number] & {title: string};

function isThemePackage(name: string): boolean {
  return name.includes('theme-');
}

function url(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function sitemapPage(
  path: string,
  title: string,
  changeFrequency: 'weekly' | 'monthly',
  priority: number,
  lastModified?: Date,
): SitemapPage {
  return {
    url: url(path),
    title,
    changeFrequency,
    priority,
    ...(lastModified ? {lastModified} : {}),
  };
}

async function getLastModified(): Promise<Date> {
  'use cache';
  cacheLife('days');
  return new Date();
}

export async function getSitemapPages(): Promise<SitemapPage[]> {
  const now = await getLastModified();

  const staticEntries = [
    sitemapPage('/', 'Home', 'weekly', 1),
    sitemapPage('/components', 'Components', 'weekly', 0.9),
    sitemapPage('/docs', 'Docs', 'weekly', 0.9),
    sitemapPage('/templates', 'Templates', 'weekly', 0.8),
    sitemapPage('/themes', 'Themes', 'weekly', 0.8),
    sitemapPage('/blog', 'Blog', 'weekly', 0.8),
    sitemapPage('/changelog', CHANGELOG_PAGE_TITLE, 'weekly', 0.6),
    sitemapPage('/community', 'Community', 'monthly', 0.5),
    sitemapPage('/playground', 'Playground', 'monthly', 0.6),
    sitemapPage('/llms.txt', 'LLMs.txt', 'weekly', 0.5),
  ];

  const componentEntries = flattenComponentSidebarEntries().map(component =>
    sitemapPage(
      `/components/${component.name}`,
      component.displayName,
      'weekly',
      0.7,
    ),
  );

  const docTopicEntries = [
    ...docTopics.map(topic => ({slug: topic.topic, title: topic.title})),
    ...packages
      .filter(pkg => !isThemePackage(pkg.name))
      .map(pkg => ({
        slug: pkg.name.replace('@astryxdesign/', ''),
        title: pkg.displayName,
      })),
  ].map(({slug, title}) => sitemapPage(`/docs/${slug}`, title, 'weekly', 0.7));

  const templateEntries = templates.map(template =>
    sitemapPage(`/templates/${template.slug}`, template.name, 'monthly', 0.6),
  );

  const blogEntries = blogPosts.map(post =>
    sitemapPage(
      `/blog/${post.slug}`,
      post.title,
      'monthly',
      0.6,
      post.date ? new Date(post.date) : now,
    ),
  );

  return [
    ...staticEntries,
    ...componentEntries,
    ...docTopicEntries,
    ...templateEntries,
    ...blogEntries,
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSitemapPages();
  return pages.map(({title: _title, ...entry}) => entry);
}
