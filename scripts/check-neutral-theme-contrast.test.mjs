// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Neutral theme component-pair contrast guard.
 * @input The maintained neutral theme's control-boundary, Switch, and
 *   ProgressBar theme overrides.
 * @output Fails when a meaningful non-text pair falls below WCAG 2.2 AA 3:1
 *   in either color scheme, or when the theme returns to deprecated targets.
 * @position Repo-level theme guard, sibling of the other scripts/check-*.
 */

import {describe, expect, it} from 'vitest';
import {neutralTheme} from '../packages/themes/neutral/src/neutralTheme.ts';
import {contrastRatio} from '../packages/core/src/theme/contrast.ts';

const MODES = [
  {name: 'light', index: 0},
  {name: 'dark', index: 1},
];
const AA_NON_TEXT = 3;
const AA_TEXT = 4.5;

/** Split `a, b` at the top level, ignoring commas nested in parentheses. */
function splitArgs(input) {
  const parts = [];
  let current = '';
  let depth = 0;
  for (const char of input) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  parts.push(current.trim());
  return parts;
}

/** Resolve `light-dark()` and component-local/global `var()` references. */
function resolve(value, modeIndex, local = {}, seen = new Set()) {
  if (typeof value !== 'string') {
    throw new Error(`expected a color string, got ${String(value)}`);
  }
  const expression = value.trim();
  if (expression.startsWith('light-dark(')) {
    const choices = splitArgs(expression.slice('light-dark('.length, -1));
    return resolve(choices[modeIndex], modeIndex, local, seen);
  }
  if (expression.startsWith('var(')) {
    const [name, fallback] = splitArgs(expression.slice('var('.length, -1));
    if (seen.has(name)) throw new Error(`token cycle at ${name}`);
    const next = local[name] ?? neutralTheme.tokens?.[name] ?? fallback;
    if (next == null) throw new Error(`could not resolve ${name}`);
    return resolve(next, modeIndex, local, new Set([...seen, name]));
  }
  return expression;
}

function expectPairToPass(foreground, background, modeIndex, local = {}) {
  const fg = resolve(foreground, modeIndex, local);
  const bg = resolve(background, modeIndex, local);
  expect(
    contrastRatio(fg, bg),
    `${fg} on ${bg} should meet ${AA_NON_TEXT}:1`,
  ).toBeGreaterThanOrEqual(AA_NON_TEXT);
}

function parseHex(color) {
  const hex = color.replace('#', '');
  return {
    rgb: [0, 2, 4].map(index =>
      Number.parseInt(hex.slice(index, index + 2), 16),
    ),
    alpha: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1,
  };
}

function composite(foreground, background) {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  return `#${fg.rgb
    .map((channel, index) =>
      Math.round(channel * fg.alpha + bg.rgb[index] * (1 - fg.alpha))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

describe('neutral theme component-pair contrast', () => {
  it('uses canonical component target names', () => {
    expect(neutralTheme.components['status-dot']).toBeDefined();
    expect(neutralTheme.components['progress-bar']).toBeDefined();
    expect(neutralTheme.components.statusdot).toBeUndefined();
    expect(neutralTheme.components.progressbar).toBeUndefined();
  });

  it.each(MODES)(
    'keeps emphasized control boundaries perceivable in $name mode',
    ({index}) => {
      for (const background of [
        'var(--color-background-body)',
        'var(--color-background-surface)',
      ]) {
        expectPairToPass('var(--color-border-emphasized)', background, index);
      }
    },
  );

  it.each(MODES)(
    'keeps the off Switch track and thumb perceivable in $name mode',
    ({index}) => {
      const local = neutralTheme.components.switch.base;
      expectPairToPass(
        'var(--color-background-gray)',
        'var(--color-background-body)',
        index,
        local,
      );
      expectPairToPass(
        'var(--color-background-surface)',
        'var(--color-background-gray)',
        index,
        local,
      );
    },
  );

  it.each(MODES)(
    'keeps every ProgressBar fill distinct from its track in $name mode',
    ({index}) => {
      const progress = neutralTheme.components['progress-bar'];
      const fillTokens = {
        accent: '--color-accent',
        success: '--color-success',
        warning: '--color-warning',
        error: '--color-error',
      };

      for (const [variant, fillToken] of Object.entries(fillTokens)) {
        const local = {
          ...progress.base,
          ...progress[`variant:${variant}`],
        };
        expectPairToPass(
          `var(${fillToken})`,
          'var(--color-background-muted)',
          index,
          local,
        );
      }
    },
  );

  it.each(MODES)(
    'keeps every Button variant readable through rest, hover, and pressed states in $name mode',
    ({index}) => {
      const backgrounds = [
        resolve('var(--color-background-body)', index),
        resolve('var(--color-background-surface)', index),
      ];
      const hover = resolve('var(--color-overlay-hover)', index);
      const pressed = resolve('var(--color-overlay-pressed)', index);
      const destructive = neutralTheme.components.button['variant:destructive'];
      const variants = [
        {
          name: 'primary',
          foreground: resolve('var(--color-on-accent)', index),
          background: () => resolve('var(--color-accent)', index),
        },
        {
          name: 'secondary',
          foreground: resolve('var(--color-text-primary)', index),
          background: parent =>
            composite(resolve('var(--color-neutral)', index), parent),
        },
        {
          name: 'ghost',
          foreground: resolve('var(--color-text-primary)', index),
          background: parent => parent,
        },
        {
          name: 'destructive',
          foreground: resolve(destructive.color, index),
          background: parent =>
            composite(resolve(destructive.backgroundColor, index), parent),
        },
      ];

      for (const variant of variants) {
        for (const parent of backgrounds) {
          const rest = variant.background(parent);
          for (const [state, background] of [
            ['rest', rest],
            ['hover', composite(hover, rest)],
            ['pressed', composite(pressed, rest)],
          ]) {
            expect(
              contrastRatio(variant.foreground, background),
              `${variant.name} ${state}: ${variant.foreground} on ${background}`,
            ).toBeGreaterThanOrEqual(AA_TEXT);
          }
        }
      }
    },
  );

  it.each(MODES)(
    'keeps every Button loading spinner distinct from its background in $name mode',
    ({index}) => {
      const backgrounds = [
        resolve('var(--color-background-body)', index),
        resolve('var(--color-background-surface)', index),
      ];
      const destructive = neutralTheme.components.button['variant:destructive'];
      const variants = [
        {
          name: 'primary',
          foreground: resolve('var(--color-on-accent)', index),
          background: () => resolve('var(--color-accent)', index),
        },
        {
          name: 'secondary',
          foreground: resolve('var(--color-text-primary)', index),
          background: parent =>
            composite(resolve('var(--color-neutral)', index), parent),
        },
        {
          name: 'ghost',
          foreground: resolve('var(--color-text-primary)', index),
          background: parent => parent,
        },
        {
          name: 'destructive',
          foreground: resolve(destructive.color, index),
          background: parent =>
            composite(resolve(destructive.backgroundColor, index), parent),
        },
      ];

      for (const variant of variants) {
        for (const parent of backgrounds) {
          const background = variant.background(parent);
          expect(
            contrastRatio(variant.foreground, background),
            `${variant.name} spinner arc should contrast with ${background}`,
          ).toBeGreaterThanOrEqual(AA_NON_TEXT);
        }
      }
    },
  );

  it.each(MODES)(
    'keeps Button focus indicators distinct from adjacent surfaces in $name mode',
    ({index}) => {
      const backgrounds = [
        'var(--color-background-body)',
        'var(--color-background-surface)',
      ];
      for (const background of backgrounds) {
        expectPairToPass('var(--color-accent)', background, index);
        expectPairToPass('var(--color-error)', background, index);
      }
    },
  );
});
