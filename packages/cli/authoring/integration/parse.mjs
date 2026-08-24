// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Integration-manifest parser — the load-boundary validator for
 * `astryx.integration.*`. Zod is sealed here; consumers call `parseIntegration`
 * or import the {@link AstryxIntegration} type.
 */

import {z} from 'zod';
import {formatZodError} from '../_shared/errors.mjs';

/** @typedef {import('./type').AstryxIntegration} AstryxIntegration */

/**
 * The keys this CLI knows. A manifest may hold others: an integration is
 * published once and installed against many CLI versions, so a key introduced
 * later arrives here routinely and is not an authoring mistake.
 */
export const KNOWN_INTEGRATION_KEYS = [
  'components',
  'templates',
  'codemods',
  'docs',
  'issuesUrl',
];

// Unknown keys are stripped rather than rejected. `.strict()` made a key from a
// newer CLI a hard parse failure, and a manifest that fails to parse
// contributes NOTHING — an integration that added one field lost its
// components, templates and codemods too, on every consumer resolving an older
// CLI, silently (#5119). A key this CLI does not know is a key it cannot act
// on; the rest of the manifest is still good, so the rest of the manifest is
// still loaded and the unknown key is reported as a warning by
// `unknownIntegrationKeys`. Known keys stay strictly typed: a `components: 42`
// IS an authoring mistake and still fails here.
const integrationSchema = z.object({
  components: z.string().optional(),
  templates: z.string().optional(),
  codemods: z.string().optional(),
  docs: z.string().optional(),
  issuesUrl: z.string().url().optional(),
});

/**
 * Compile-time drift-lock: sealed schema must infer exactly {@link AstryxIntegration}.
 *
 * @typedef {import('../_shared/contract').Expect<
 *   import('../_shared/contract').Equal<z.infer<typeof integrationSchema>, AstryxIntegration>
 * >} _IntegrationDriftLock
 */

/**
 * The manifest keys this CLI does not know, in the order they were authored.
 *
 * Separate from `parseIntegration` because the two answer different questions:
 * the parser says whether the manifest is usable, and this says how much of it
 * this CLI is able to use. Callers report the difference — as a warning, never
 * a failure. Almost always the author is on a newer CLI than the consumer.
 *
 * @param {unknown} input
 * @returns {string[]}
 */
export function unknownIntegrationKeys(input) {
  if (input == null || typeof input !== 'object' || Array.isArray(input)) {
    return [];
  }
  return Object.keys(input).filter(
    key => !KNOWN_INTEGRATION_KEYS.includes(key),
  );
}

/**
 * Validate an unknown value as an Astryx integration manifest, or throw.
 * Keys this CLI does not know are ignored (see `unknownIntegrationKeys`).
 *
 * @param {unknown} input
 * @param {string} [label]
 * @returns {AstryxIntegration}
 */
export function parseIntegration(input, label = 'astryx.integration') {
  const result = integrationSchema.safeParse(input);
  if (!result.success) {
    throw new Error(formatZodError(label, result.error));
  }
  return result.data;
}
