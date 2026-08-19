// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file conditionalTheme.ts
 * @input Conditional theme overrides from defineTheme (`mobile`, `breakpoints`)
 * @output Resolved conditional layers (media query + tokens + components)
 * @position Theme system utility; consumed by defineTheme and generateThemeRules
 *
 * A conditional theme layer is a **named condition** whose values apply only
 * where that condition matches. The condition is named, not written as a raw
 * media query, so a theme author never has to invent a breakpoint or remember
 * that "mobile" means more than a narrow window.
 *
 * The first (and currently only) condition is `mobile`, which means
 * **narrow AND touch** — a desktop user dragging their window narrow does not
 * match it. It compiles to:
 *
 *     @media (max-width: <breakpoint>px) and (pointer: coarse)
 *
 * where `<breakpoint>` is `breakpoints.mobile` if the theme sets one and
 * {@link DEFAULT_MOBILE_BREAKPOINT} (756) otherwise.
 *
 * "Conditional" (not "media") is deliberate: in Astryx, *media* at the theme
 * layer already means content sitting on an image or video surface — see
 * `onMediaTokens.ts`, `MediaTheme`, `onDark`/`onLight`.
 *
 * Unset means nothing is emitted: a condition that is absent or `null`
 * produces no resolved layer at all, so no CSS is generated for it and a theme
 * that does not opt in is byte-identical to before this layer existed.
 */

import type {
  ComponentStyleMap,
  TokenName,
  TokenValue,
  DefineThemeInput,
} from './defineTheme';
import type {TypographyConfig} from './types';
import type {TypeScaleConfig} from './expandTypeScale';
import {expandTypeScale, generateTypeScaleComponents} from './expandTypeScale';
import {expandMotionScale, type MotionScaleConfig} from './expandMotionScale';
import {expandRadiusScale, type RadiusScaleConfig} from './expandRadiusScale';
import {expandColorScale, type ColorScaleConfig} from './expandColorScale';
import {buildFontFamilyTokens, buildTypeScaleConfig} from './themeAxes';
import {deepMergeComponents} from './mergeComponents';

// =============================================================================
// Types
// =============================================================================

/**
 * The width below which the `mobile` condition can match, in px.
 *
 * Themes override it with `breakpoints: {mobile: <px>}`. Width alone never
 * makes `mobile` match — the pointer must be coarse as well.
 */
export const DEFAULT_MOBILE_BREAKPOINT = 756;

/**
 * Names of the conditions a theme can define values for.
 *
 * Spelled inline at each use rather than exported as a named union: the
 * repo's doc guard (`docPropLiterals`) requires a documented type to reveal
 * its legal values, and `DefinedTheme` is documented as `<Theme>`'s `theme`
 * prop. A named alias would hide `'mobile'` from anyone reading the docs
 * without an IDE.
 */

/**
 * Breakpoint configuration for named conditions.
 *
 * @example
 * ```
 * breakpoints: {mobile: 640}
 * ```
 */
export interface ThemeBreakpoints {
  /**
   * Width below which the `mobile` condition can match, in px.
   * Defaults to 756. The condition also requires a coarse pointer, so a
   * narrow desktop window never matches it.
   */
  mobile?: number;
}

/**
 * Overrides that apply only where a condition matches — a partial theme with
 * the same shape as the top-level input.
 *
 * Every axis is independent: only the axes actually set here generate CSS.
 * Setting `tokens` alone emits token declarations and nothing else.
 */
export interface ConditionalThemeOverrides {
  /** Typography overrides — scale, families, weights. */
  typography?: TypographyConfig;
  /** Color scale overrides. */
  color?: ColorScaleConfig;
  /** Radius scale overrides. */
  radius?: RadiusScaleConfig;
  /** Motion scale overrides. */
  motion?: MotionScaleConfig;
  /** Explicit token overrides — highest precedence within the condition. */
  tokens?: Partial<Record<TokenName, TokenValue>>;
  /** Component style overrides. */
  components?: ComponentStyleMap;
}

/**
 * A resolved conditional layer stored on DefinedTheme.
 * @internal
 */
export interface ResolvedConditionalTheme {
  /** The condition this layer belongs to. */
  condition: 'mobile';
  /** The media query the condition compiles to, without the `@media` keyword. */
  query: string;
  /** Resolved token CSS values — only the tokens this layer sets. */
  tokens: Record<string, string>;
  /** Component style overrides for this layer, if any. */
  components?: ComponentStyleMap;
}

// =============================================================================
// Resolution
// =============================================================================

/**
 * Build the media query for the `mobile` condition.
 *
 * Both halves are load-bearing: the width bound keeps it off large touch
 * screens, and `pointer: coarse` keeps it off a narrowed desktop window.
 */
export function mobileMediaQuery(
  breakpoint: number = DEFAULT_MOBILE_BREAKPOINT,
): string {
  return `(max-width: ${breakpoint}px) and (pointer: coarse)`;
}

/**
 * Resolve a token value to a CSS string.
 * - String values pass through as-is
 * - [light, dark] tuples become light-dark(light, dark)
 */
function resolveTokenValue(value: TokenValue): string {
  if (Array.isArray(value)) {
    return `light-dark(${value[0]}, ${value[1]})`;
  }
  return value;
}

/**
 * Resolve one condition's partial theme into tokens + component overrides.
 *
 * Mirrors the base theme's axis precedence exactly: generated values first
 * (color, type scale, radius, motion, font families), explicit `tokens` last.
 */
function resolveOverrides(input: ConditionalThemeOverrides): {
  tokens: Record<string, string>;
  components?: ComponentStyleMap;
} {
  const tokens: Record<string, string> = {};

  const typo: TypographyConfig | undefined = input.typography;
  const typeScaleConfig: TypeScaleConfig | undefined = typo
    ? buildTypeScaleConfig(typo)
    : undefined;

  if (input.color) {
    Object.assign(tokens, expandColorScale(input.color));
  }
  if (typeScaleConfig) {
    Object.assign(tokens, expandTypeScale(typeScaleConfig));
  }
  if (input.radius) {
    Object.assign(tokens, expandRadiusScale(input.radius));
  }
  if (input.motion) {
    Object.assign(tokens, expandMotionScale(input.motion));
  }
  if (typo) {
    Object.assign(tokens, buildFontFamilyTokens(typo));
  }
  // Explicit tokens win over anything generated inside this condition.
  if (input.tokens) {
    for (const [key, value] of Object.entries(input.tokens)) {
      if (value !== undefined) {
        tokens[key] = resolveTokenValue(value);
      }
    }
  }

  let components = input.components;
  if (typeScaleConfig) {
    components = deepMergeComponents(
      generateTypeScaleComponents(typeScaleConfig),
      input.components,
    );
  }

  return {tokens, components};
}

/**
 * Resolve every conditional layer a theme input declares.
 *
 * Returns `undefined` when the input declares none — the opt-in guarantee:
 * a theme that never mentions a condition carries no conditional data and
 * generates no conditional CSS.
 */
export function resolveConditionalThemes(
  input: Pick<DefineThemeInput, 'mobile' | 'breakpoints'>,
): ResolvedConditionalTheme[] | undefined {
  const layers: ResolvedConditionalTheme[] = [];

  // Read the key only when it is set — absent or null means "no mobile layer".
  const mobile = input.mobile;
  if (mobile != null) {
    const {tokens, components} = resolveOverrides(mobile);
    layers.push({
      condition: 'mobile',
      query: mobileMediaQuery(input.breakpoints?.mobile),
      tokens,
      components,
    });
  }

  return layers.length > 0 ? layers : undefined;
}
