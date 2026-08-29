// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * Neutral Theme
 *
 * A pure grayscale spine with a from-scratch OKLCH-derived categorical
 * palette. Hues are placed at evenly-spaced positions on the OKLCH wheel,
 * chosen to keep each color recognizable at every tone (no red drift for
 * orange, no blue drift for purple) and well-separated from its neighbors.
 *
 * The full approved light and dark ramps are exported as `neutralPalettes`.
 * Semantic tokens and deliberate component exceptions select exact named
 * stops from that palette so theme authors and agents do not invent hexes.
 *
 * Categorical hues (OKLCH; chroma = max-in-gamut at the saturated stop):
 *   Red H=25    Orange H=65    Yellow H=90    Green H=145
 *   Teal H=180  Cyan H=215     Blue H=255     Purple H=320  Pink H=355
 *
 * Filled semantic states use contrast-locked vivid stops shared by Badge,
 * StatusDot, and ProgressBar. Categorical states use dark text on pastel
 * surfaces in light mode and light text on translucent tinted surfaces in dark
 * mode. Every Badge label/fill pair is held to WCAG AA by
 * `scripts/check-badge-contrast.test.mjs`.
 *
 * Only overrides tokens that differ from the defaults.
 */

import {
  defineTheme,
  defineSyntaxTheme,
  defineTonalPalettes,
  type TonalPaletteStep,
} from '@astryxdesign/core/theme';
import {neutralIconRegistry} from './icons';

/**
 * Approved tonal palette for the Neutral theme.
 *
 * Components should use semantic theme tokens first. Theme authors and agents
 * may use an exact named stop only when no semantic token expresses the role;
 * do not invent or approximate hex values outside these ramps.
 */
export const neutralPalettes = defineTonalPalettes({
  neutral: {
    light: {
      0: '#000000',
      5: '#111111',
      10: '#1b1b1b',
      15: '#262626',
      20: '#303030',
      25: '#3b3b3b',
      30: '#474747',
      35: '#525252',
      40: '#5e5e5e',
      45: '#6a6a6a',
      50: '#777777',
      55: '#848484',
      60: '#919191',
      65: '#9e9e9e',
      70: '#ababab',
      75: '#b9b9b9',
      80: '#c6c6c6',
      85: '#d4d4d4',
      90: '#e2e2e2',
      95: '#f1f1f1',
      100: '#ffffff',
    },
    dark: {
      0: '#111111',
      5: '#1b1b1b',
      10: '#262626',
      15: '#303030',
      20: '#3b3b3b',
      25: '#474747',
      30: '#525252',
      35: '#5e5e5e',
      40: '#6a6a6a',
      45: '#777777',
      50: '#848484',
      55: '#919191',
      60: '#9e9e9e',
      65: '#ababab',
      70: '#b9b9b9',
      75: '#c6c6c6',
      80: '#d4d4d4',
      85: '#dedede',
      90: '#e7e7e7',
      95: '#f1f1f1',
      100: '#ffffff',
    },
    description:
      'Pure grayscale foundation for surfaces, text, borders, and neutral states.',
  },
  red: {
    light: {
      0: '#000000',
      5: '#2c0000',
      10: '#3e0002',
      15: '#500004',
      20: '#620008',
      25: '#76000c',
      30: '#8a0011',
      35: '#9d0518',
      40: '#ac1f25',
      45: '#bb3032',
      50: '#ca3f3e',
      55: '#d94e4b',
      60: '#e85c57',
      65: '#f86a64',
      70: '#f8847d',
      75: '#fb9a93',
      80: '#fcb0a9',
      85: '#fdc5bf',
      90: '#fed8d4',
      95: '#feecea',
      100: '#ffffff',
      hue: 25,
      chroma: 0.065,
    },
    dark: {
      0: '#2c0000',
      5: '#3e0002',
      10: '#500004',
      15: '#620008',
      20: '#76000c',
      25: '#851018',
      30: '#932224',
      35: '#a23130',
      40: '#b03f3c',
      45: '#bf4c48',
      50: '#ce5a54',
      55: '#dd6761',
      60: '#ec746e',
      65: '#ee8b84',
      70: '#f2a099',
      75: '#f5b4ad',
      80: '#f7c7c2',
      85: '#f9d4d0',
      90: '#fbe0dd',
      95: '#fcedeb',
      100: '#ffffff',
      hue: 25,
      chroma: 0.065,
    },
    semantic: 'error',
    description: 'Error, destructive, and red categorical states.',
  },
  orange: {
    light: {
      0: '#000000',
      5: '#200b00',
      10: '#2d1500',
      15: '#3b1e00',
      20: '#492700',
      25: '#583100',
      30: '#673a00',
      35: '#774500',
      40: '#884f00',
      45: '#985900',
      50: '#aa6400',
      55: '#bb6f00',
      60: '#cd7a00',
      65: '#df8600',
      70: '#ec9428',
      75: '#f0a75c',
      80: '#f3ba82',
      85: '#f5cca4',
      90: '#f9ddc4',
      95: '#fbeee3',
      100: '#ffffff',
      hue: 65,
      chroma: 0.07,
    },
    dark: {
      0: '#200b00',
      5: '#2d1500',
      10: '#3b1e00',
      15: '#492700',
      20: '#583100',
      25: '#673a00',
      30: '#774500',
      35: '#884f00',
      40: '#985900',
      45: '#aa6400',
      50: '#bb6f00',
      55: '#cd7a00',
      60: '#df8600',
      65: '#e39948',
      70: '#e8aa6d',
      75: '#edbc8d',
      80: '#f1cdac',
      85: '#f4d8bf',
      90: '#f7e3d2',
      95: '#faefe5',
      100: '#ffffff',
      hue: 65,
      chroma: 0.07,
    },
    description: 'Orange categorical states.',
  },
  yellow: {
    light: {
      0: '#000000',
      5: '#190f00',
      10: '#251a00',
      15: '#312400',
      20: '#3d2e00',
      25: '#4b3900',
      30: '#584400',
      35: '#664f00',
      40: '#745b00',
      45: '#836700',
      50: '#927300',
      55: '#a17f00',
      60: '#b18c00',
      65: '#c09800',
      70: '#d0a500',
      75: '#e1b300',
      80: '#f1c000',
      85: '#f6d168',
      90: '#f8e1a2',
      95: '#fbf0d4',
      100: '#ffffff',
      hue: 90,
      chroma: 0.13,
    },
    dark: {
      0: '#190f00',
      5: '#251a00',
      10: '#312400',
      15: '#3d2e00',
      20: '#4b3900',
      25: '#584400',
      30: '#664f00',
      35: '#745b00',
      40: '#836700',
      45: '#927300',
      50: '#a17f00',
      55: '#b18c00',
      60: '#c09800',
      65: '#d0a500',
      70: '#e1b300',
      75: '#edc135',
      80: '#f1d27c',
      85: '#f4dc9d',
      90: '#f6e6bb',
      95: '#f9f0d8',
      100: '#ffffff',
      hue: 90,
      chroma: 0.13,
    },
    semantic: 'warning',
    description: 'Warning and yellow categorical states.',
  },
  green: {
    light: {
      0: '#000000',
      5: '#001800',
      10: '#002401',
      15: '#003004',
      20: '#003d08',
      25: '#004a0c',
      30: '#005711',
      35: '#006516',
      40: '#00731b',
      45: '#098123',
      50: '#228e32',
      55: '#349c3f',
      60: '#43aa4d',
      65: '#52b75a',
      70: '#72c176',
      75: '#8ccb8e',
      80: '#a5d6a5',
      85: '#bde0bd',
      90: '#d3ead3',
      95: '#eaf4ea',
      100: '#ffffff',
      hue: 145,
      chroma: 0.06,
    },
    dark: {
      0: '#001800',
      5: '#002401',
      10: '#003004',
      15: '#003d08',
      20: '#004a0c',
      25: '#005711',
      30: '#016518',
      35: '#197126',
      40: '#2a7e33',
      45: '#388b3f',
      50: '#46994c',
      55: '#54a659',
      60: '#62b466',
      65: '#7dbe7f',
      70: '#94c995',
      75: '#aad3aa',
      80: '#c0dec0',
      85: '#cfe5ce',
      90: '#ddecdc',
      95: '#ebf4eb',
      100: '#ffffff',
      hue: 145,
      chroma: 0.06,
    },
    semantic: 'success',
    description: 'Success and green categorical states.',
  },
  teal: {
    light: {
      0: '#000000',
      5: '#001612',
      10: '#00221c',
      15: '#002e27',
      20: '#003a31',
      25: '#00463d',
      30: '#005348',
      35: '#006154',
      40: '#006e60',
      45: '#007c6d',
      50: '#008b79',
      55: '#009986',
      60: '#00a893',
      65: '#00b7a1',
      70: '#00c6ae',
      75: '#51d1bc',
      80: '#80dac9',
      85: '#a6e3d6',
      90: '#c5ece3',
      95: '#e4f5f1',
      100: '#ffffff',
      hue: 180,
      chroma: 0.065,
    },
    dark: {
      0: '#001612',
      5: '#00221c',
      10: '#002e27',
      15: '#003a31',
      20: '#00463d',
      25: '#005348',
      30: '#006154',
      35: '#006e60',
      40: '#007c6d',
      45: '#008b79',
      50: '#009986',
      55: '#00a893',
      60: '#00b7a1',
      65: '#36c4ae',
      70: '#68cebb',
      75: '#8dd8c8',
      80: '#ade1d6',
      85: '#c1e8df',
      90: '#d3eee8',
      95: '#e6f5f1',
      100: '#ffffff',
      hue: 180,
      chroma: 0.065,
    },
    description: 'Teal categorical states.',
  },
  cyan: {
    light: {
      0: '#000000',
      5: '#00151b',
      10: '#002028',
      15: '#002c35',
      20: '#003742',
      25: '#004350',
      30: '#00505f',
      35: '#005d6d',
      40: '#006a7d',
      45: '#00788c',
      50: '#00869c',
      55: '#0094ac',
      60: '#00a2bd',
      65: '#00b1ce',
      70: '#00bfdf',
      75: '#4bcce7',
      80: '#7cd6eb',
      85: '#a3e0ef',
      90: '#c4eaf4',
      95: '#e3f4f9',
      100: '#ffffff',
      hue: 215,
      chroma: 0.065,
    },
    dark: {
      0: '#00151b',
      5: '#002028',
      10: '#002c35',
      15: '#003742',
      20: '#004350',
      25: '#00505f',
      30: '#005d6d',
      35: '#006a7d',
      40: '#00788c',
      45: '#00869c',
      50: '#0094ac',
      55: '#00a2bd',
      60: '#00b1ce',
      65: '#2ebedb',
      70: '#64c9e1',
      75: '#8ad4e6',
      80: '#acdeeb',
      85: '#bfe6f0',
      90: '#d2edf4',
      95: '#e5f4f8',
      100: '#ffffff',
      hue: 215,
      chroma: 0.065,
    },
    description: 'Cyan categorical states.',
  },
  blue: {
    light: {
      0: '#000000',
      5: '#000f30',
      10: '#001a41',
      15: '#002452',
      20: '#002f64',
      25: '#003a78',
      30: '#00458c',
      35: '#0050a1',
      40: '#005cb6',
      45: '#0068cc',
      50: '#0074e2',
      55: '#0081f9',
      60: '#2f90ff',
      65: '#529fff',
      70: '#6eaeff',
      75: '#87bcff',
      80: '#a0caff',
      85: '#b8d7ff',
      90: '#d0e5ff',
      95: '#e8f2ff',
      100: '#ffffff',
      hue: 255,
      chroma: 0.085,
    },
    dark: {
      0: '#000f30',
      5: '#001a41',
      10: '#002452',
      15: '#002f64',
      20: '#003a78',
      25: '#00458c',
      30: '#0050a1',
      35: '#005cb6',
      40: '#0068cc',
      45: '#0074e2',
      50: '#1181f5',
      55: '#2f90ff',
      60: '#529fff',
      65: '#6eaeff',
      70: '#87bcff',
      75: '#a0caff',
      80: '#b8d7ff',
      85: '#c8e0ff',
      90: '#d8e9ff',
      95: '#e8f2ff',
      100: '#ffffff',
      hue: 255,
      chroma: 0.085,
    },
    semantic: 'info',
    description: 'Information, accent, and blue categorical states.',
  },
  purple: {
    light: {
      0: '#000000',
      5: '#22002a',
      10: '#31003b',
      15: '#40004c',
      20: '#4f005e',
      25: '#5e086e',
      30: '#6a1b7b',
      35: '#772988',
      40: '#853796',
      45: '#9244a3',
      50: '#a051b1',
      55: '#ad5fbf',
      60: '#bb6ccd',
      65: '#c979dc',
      70: '#d08fdf',
      75: '#d8a2e4',
      80: '#dfb5e9',
      85: '#e7c8ed',
      90: '#efdbf3',
      95: '#f6edf8',
      100: '#ffffff',
      hue: 320,
      chroma: 0.06,
    },
    dark: {
      0: '#22002a',
      5: '#31003b',
      10: '#40004c',
      15: '#4d095a',
      20: '#591967',
      25: '#662673',
      30: '#723381',
      35: '#7f408e',
      40: '#8d4c9b',
      45: '#9a59a9',
      50: '#a866b7',
      55: '#b573c5',
      60: '#c380d3',
      65: '#cb94d7',
      70: '#d3a6de',
      75: '#dcb8e4',
      80: '#e4caea',
      85: '#ead6ee',
      90: '#f0e2f3',
      95: '#f6eef7',
      100: '#ffffff',
      hue: 320,
      chroma: 0.06,
    },
    description: 'Purple categorical states.',
  },
  pink: {
    light: {
      0: '#000000',
      5: '#290013',
      10: '#3b001e',
      15: '#4b0028',
      20: '#5d0034',
      25: '#70003f',
      30: '#82014b',
      35: '#901857',
      40: '#9f2963',
      45: '#ad376f',
      50: '#bc457c',
      55: '#cb5389',
      60: '#da6096',
      65: '#e96ea3',
      70: '#ec86af',
      75: '#f09bbc',
      80: '#f3b0c9',
      85: '#f6c5d6',
      90: '#f9d8e4',
      95: '#fbecf1',
      100: '#ffffff',
      hue: 355,
      chroma: 0.06,
    },
    dark: {
      0: '#290013',
      5: '#3b001e',
      10: '#4b0028',
      15: '#5d0034',
      20: '#6d083f',
      25: '#7b1a4a',
      30: '#892856',
      35: '#973662',
      40: '#a5436f',
      45: '#b3507b',
      50: '#c25d88',
      55: '#d06a95',
      60: '#df77a2',
      65: '#e38daf',
      70: '#e8a0bc',
      75: '#edb4c9',
      80: '#f1c7d6',
      85: '#f4d4df',
      90: '#f7e0e8',
      95: '#faedf1',
      100: '#ffffff',
      hue: 355,
      chroma: 0.06,
    },
    description: 'Pink categorical states.',
  },
});

/** Return one approved palette stop for a light or dark color scheme. */
function palette(
  family: keyof typeof neutralPalettes,
  tone: TonalPaletteStep,
  mode: 'light' | 'dark' = 'light',
): string {
  return neutralPalettes[family][mode][tone];
}

function lightDark(light: string, dark: string): string {
  return `light-dark(${light}, ${dark})`;
}

function withAlpha(
  color: string,
  alpha: '0D' | '0F' | '14' | '1A' | '33' | '3D' | '4D' | '80' | 'CC',
): string {
  return `${color}${alpha}`;
}

/**
 * Neutral syntax palette — pulled from the OKLCH T30 (light) / T80 (dark)
 * stops of the categorical ramps. Same colors used by --color-icon-* tokens.
 */
const neutralSyntax = defineSyntaxTheme({
  name: 'xds-neutral',
  tokens: {
    keyword: [palette('purple', 30), palette('purple', 80, 'dark')],
    string: [palette('green', 30), palette('green', 80, 'dark')],
    comment: [palette('neutral', 50), palette('neutral', 65, 'light')],
    number: [palette('orange', 30), palette('orange', 80, 'dark')],
    function: [palette('blue', 30), palette('blue', 80, 'dark')],
    type: [palette('purple', 30), palette('purple', 80, 'dark')],
    variable: [palette('neutral', 10), palette('neutral', 90, 'light')],
    operator: [palette('neutral', 50), palette('neutral', 65, 'light')],
    constant: [palette('orange', 30), palette('orange', 80, 'dark')],
    tag: [palette('red', 30), palette('red', 80, 'dark')],
    attribute: [palette('yellow', 30), palette('yellow', 80, 'dark')],
    property: [palette('teal', 30), palette('teal', 80, 'dark')],
    // #a3a3a3/#525252 (this pair's own disabled-text tone) failed WCAG AA
    // against the syntax background: 2.42:1 light, 2.53:1 dark. #5386.
    punctuation: ['#6e6e6e', '#a0a0a0'], // neutral, 4.89:1 / 7.57:1
    background: [palette('neutral', 95, 'light'), palette('neutral', 0)],
  },
});

/**
 * Filled semantic colors are shared by Badge and StatusDot. ProgressBar uses
 * the same colors except where its fill-on-track relationship needs a
 * contrast-specific stop (light-mode warning).
 */
const FILLED_STATE_COLORS = {
  info: lightDark(palette('blue', 45), palette('blue', 60, 'dark')),
  success: lightDark(palette('green', 45), palette('green', 60, 'dark')),
  warning: lightDark(palette('yellow', 85), palette('yellow', 80, 'dark')),
  error: lightDark(palette('red', 50), palette('red', 60, 'dark')),
} as const;

const FILLED_STATE_TEXT = {
  standard: lightDark(palette('neutral', 100), palette('neutral', 10)),
  onBright: palette('neutral', 10),
} as const;

/**
 * Progress is a fill-on-track relationship, not a control boundary. Every
 * variant uses the same neutral track so the remaining range has one stable
 * visual treatment.
 */
const PROGRESS_TRACK = lightDark(
  palette('neutral', 85),
  palette('neutral', 20, 'dark'),
);
// The bright Badge yellow is only 1.01:1 against the light neutral track.
// Progress therefore uses the palette's T50 yellow in light mode, the closest
// darker stop that clears 3:1. Dark mode keeps the brighter semantic yellow.
const PROGRESS_WARNING_FILL = lightDark(
  palette('yellow', 50),
  palette('yellow', 80, 'dark'),
);

export const neutralTheme = defineTheme({
  name: 'neutral',
  palettes: neutralPalettes,

  // Typography: Figtree across body, heading, and display sizes (display
  // size tokens inherit from heading.family). Monospace stays as the
  // platform default for code.
  // Scale: base=14, ratio=1.2. Bold weights on h3/h4 for subsection hierarchy.
  typography: {
    scale: {base: 14, ratio: 1.2},
    body: {
      family: 'Figtree',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    heading: {
      family: 'Figtree',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      weights: {3: 'bold', 4: 'bold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks:
        '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },

  // Motion: snappier than default to match shadcn/Tailwind conventions.
  // Produces: fast-min=95ms, fast=125ms, fast-max=165ms,
  //           medium-min=225ms, medium=300ms, medium-max=400ms.
  motion: {fast: 125, medium: 300, slow: 700, ratio: 0.75},

  syntax: neutralSyntax,

  // Palette strategy: `palettes` is the approved source of exact colors.
  // Semantic tokens below reference named family/tone stops. Alpha overlays
  // are derived from those same stops; the two syntax punctuation values are
  // the only contrast-specific opaque exceptions and are documented in place.
  tokens: {
    // =========================================================================
    // Core — exact named stops from neutralPalettes.neutral.
    // =========================================================================

    // =========================================================================
    // Backgrounds — Figma-style flat with a single lifted surface.
    //
    // Dark mode collapses card / popover / muted to body T10. Cards and
    // popovers lift purely via shadow + inset highlight (see --shadow-*
    // below) — they don't need a distinct tone.
    //
    // Surface is the exception: it's tonally LIGHTER than body (T15) so
    // interactive components that sit on top of body have a clear,
    // differentiated foreground. Real consumers of --color-background-surface
    // are: switches, radios, checkboxes, multi-selectors, dialogs, app
    // shells, sections — all things that need to lift above the canvas.
    //
    //   surface  T15 #262626  — interactive surfaces lifted above body
    //   body     T10 #1b1b1b  — main canvas
    //   card     T10 #1b1b1b  — same as body, lifts via --shadow-low
    //   popover  T10 #1b1b1b  — same as body, lifts via --shadow-med
    //   muted    T10 #1b1b1b  — same as body
    //
    // Light mode keeps the standard ladder (white surfaces float on tinted
    // body; shadows do most of the lifting):
    //   surface  T100 #ffffff
    //   body     T95  #f1f1f1
    //   card     T100 #ffffff
    //   popover  T100 #ffffff
    //   muted    T95  #f1f1f1
    //
    // All values use the OKLCH Neutral tonal palette (chroma=0).
    // =========================================================================
    '--color-background-surface': [
      palette('neutral', 100),
      palette('neutral', 10, 'dark'),
    ],
    '--color-background-body': [
      palette('neutral', 95),
      palette('neutral', 5, 'dark'),
    ],
    '--color-background-card': [
      palette('neutral', 100),
      palette('neutral', 5, 'dark'),
    ],
    '--color-background-popover': [
      palette('neutral', 100),
      palette('neutral', 5, 'dark'),
    ],
    '--color-background-muted': [
      palette('neutral', 95),
      palette('neutral', 5, 'dark'),
    ],

    // Accent + neutral surface tints (sit alongside backgrounds)
    '--color-accent': [palette('neutral', 15), palette('neutral', 90, 'dark')],
    '--color-accent-muted': [
      palette('neutral', 95),
      palette('neutral', 10, 'dark'),
    ],
    '--color-neutral': [
      withAlpha(palette('neutral', 0), '0F'),
      withAlpha(palette('neutral', 100), '1A'),
    ],

    // Overlays (modal scrims, hover/pressed tints)
    '--color-overlay': [
      withAlpha(palette('neutral', 0), '80'),
      withAlpha(palette('neutral', 0), 'CC'),
    ],
    '--color-overlay-hover': [
      withAlpha(palette('neutral', 0), '0D'),
      withAlpha(palette('neutral', 100), '0D'),
    ],
    '--color-overlay-pressed': [
      withAlpha(palette('neutral', 0), '1A'),
      withAlpha(palette('neutral', 100), '1A'),
    ],

    // Text
    '--color-text-primary': [palette('neutral', 10), palette('neutral', 95)],
    // Light secondary is T35 (#525252), not T50 (#777777): T50 only
    // reaches 4.19:1 on the T95 body (#f1f1f1), just under WCAG AA 4.5:1.
    // 600 clears it (6.9:1 on body, 7.8:1 on card). Dark stays neutral-400.
    '--color-text-secondary': [palette('neutral', 35), palette('neutral', 65)],
    '--color-text-disabled': [palette('neutral', 65), palette('neutral', 35)],
    '--color-text-accent': [
      palette('neutral', 15),
      palette('neutral', 90, 'dark'),
    ],
    '--color-on-dark': palette('neutral', 100),
    '--color-on-light': palette('neutral', 10),
    // Contrast: neutral accent is near-black (L) / near-white (D)
    '--color-on-accent': [palette('neutral', 100), palette('neutral', 10)],
    '--color-on-success': [palette('neutral', 100), palette('neutral', 10)],
    '--color-on-error': [palette('neutral', 100), palette('neutral', 10)],
    '--color-on-warning': palette('neutral', 10),

    // Icon
    '--color-icon-accent': [
      palette('neutral', 15),
      palette('neutral', 90, 'dark'),
    ],
    '--color-icon-primary': [palette('neutral', 10), palette('neutral', 95)],
    '--color-icon-secondary': [palette('neutral', 50), palette('neutral', 65)],
    '--color-icon-disabled': [palette('neutral', 65), palette('neutral', 35)],

    // Status / Sentiment — dark mode follows the issue #2150 rubric:
    //
    //   Light mode: pastel T90 banner bg + dark T25-T40 text/icon. Locked
    //               light values for cards/banners/inputs/destructive btn.
    //   Dark mode : tinted-dark T20 bg + light pastel T80-T85 text. INVERTED
    //               from light. Avoids the §5 "pastel-in-both-modes"
    //               anti-pattern (locked pastels glow against a dark body).
    //
    //   --color-X         = "saturated text/icon stop":
    //                         light = dark colored (sits on light pastel)
    //                         dark  = light pastel (sits on dark tinted bg)
    //                       Used by destructive button text, input border/icon
    //                       (in light), banner-status-* text overrides.
    //   --color-X-muted   = "muted bg stop":
    //                         light = T90 light pastel
    //                         dark  = hue-tinted alpha overlay (T70 stop @ 24%)
    //                       Used by banner bg, status-input message bg,
    //                       destructive button bg. Dark mode uses an alpha
    //                       overlay rather than a solid T20 tinted bg so
    //                       the surface composes onto whatever sits behind
    //                       it (body, card, popover) rather than reading
    //                       as a hard colored panel.
    //
    //   24% alpha = '3D' suffix. Hue values match --color-icon-{X} dark
    //   slots (palette T70). Composited onto body #1b1b1b, the effective
    //   bg luminance hits ~1.65-1.70:1 vs body — visible colored surface
    //   without the heaviness of a solid T20 panel.
    '--color-success': [palette('green', 30), palette('green', 80, 'dark')],
    // Error uses one stronger foreground step (T25/T85) so destructive button
    // text retains comfortable AA headroom through its pressed overlay.
    '--color-error': [palette('red', 25), palette('red', 85, 'dark')],
    '--color-warning': [palette('yellow', 30), palette('yellow', 80, 'dark')],
    '--color-success-muted': [
      palette('green', 85),
      withAlpha(palette('green', 70, 'dark'), '3D'),
    ],
    '--color-error-muted': [
      palette('red', 85),
      withAlpha(palette('red', 70, 'dark'), '3D'),
    ],
    '--color-warning-muted': [
      palette('yellow', 90),
      withAlpha(palette('yellow', 70, 'dark'), '3D'),
    ],

    // Border. Emphasized is the perceivable boundary used by inputs,
    // unchecked selection controls, and the off Switch track. Neutral 500 is
    // the first shared ramp stop that clears WCAG 1.4.11 (3:1) against both
    // the body and surface in both color schemes.
    '--color-border': [
      withAlpha(palette('neutral', 0), '14'),
      withAlpha(palette('neutral', 100), '1A'),
    ],
    '--color-border-emphasized': [
      palette('neutral', 50),
      palette('neutral', 45, 'dark'),
    ],

    // Effects
    '--color-skeleton': [
      palette('neutral', 90),
      palette('neutral', 30, 'dark'),
    ],
    '--color-shadow': [
      withAlpha(palette('neutral', 0), '1A'),
      withAlpha(palette('neutral', 0), '4D'),
    ],
    '--color-tint-hover': ['black', 'white'],

    // =========================================================================
    // Categorical — light mode uses pastel surfaces + dark colored text;
    //               dark mode INVERTS to a hue-tinted alpha overlay surface +
    //               light pastel text (per #2150 rubric §3 — pick the tone
    //               that satisfies required contrast against every surface
    //               the token touches).
    //
    // Per-token tone choice (CIELab L*):
    //   bg     light=T87-T90 pastel       dark=T70 hue @ 24% alpha overlay
    //                                       (composites onto body to ~1.65:1
    //                                        vs body — colored surface that
    //                                        feels lighter than a solid T20
    //                                        panel; same hue as --color-icon-X
    //                                        dark slot, just at lower opacity)
    //   border light=T80 pastel           dark=T60 mid-bright (>=5.8:1 vs body)
    //   icon   light=T30 dark colored     dark=T70 light pastel
    //   text   light=T30 dark colored     dark=T80 light pastel (>=7:1 on bg)
    //          red alone uses T25/T85 for destructive-button state headroom
    //
    // The balanced OKLCH ramps keep one hue per family while tuning pastel
    // chroma for perceived parity: red=.065, orange=.07, yellow=.13,
    // green/purple/pink=.06, teal/cyan=.065, blue=.085. Dark stops apply
    // chroma×0.85 and a +5 tone lift that tapers from T80 to T95.
    // =========================================================================

    // Each row's dark slots use the same balanced OKLCH ramp rendered by the
    // neutral-palette sandbox. Border=T60,
    // icon=T70, text=T80. Background uses the T70 hue at 24% alpha so the
    // overlay surface composites onto body to ~1.65:1 luminance.

    // Red H=25 C=.065
    '--color-background-red': [
      palette('red', 85),
      withAlpha(palette('red', 70, 'dark'), '3D'),
    ],
    '--color-border-red': [palette('red', 80), palette('red', 60, 'dark')],
    '--color-icon-red': [palette('red', 30), palette('red', 70, 'dark')],
    '--color-text-red': [palette('red', 25), palette('red', 85, 'dark')],

    // Orange H=65 C=.07
    '--color-background-orange': [
      palette('orange', 85),
      withAlpha(palette('orange', 70, 'dark'), '3D'),
    ],
    '--color-border-orange': [
      palette('orange', 80),
      palette('orange', 60, 'dark'),
    ],
    '--color-icon-orange': [
      palette('orange', 30),
      palette('orange', 70, 'dark'),
    ],
    '--color-text-orange': [
      palette('orange', 30),
      palette('orange', 80, 'dark'),
    ],

    // Yellow H=90 C=.13
    '--color-background-yellow': [
      palette('yellow', 90),
      withAlpha(palette('yellow', 70, 'dark'), '3D'),
    ],
    '--color-border-yellow': [
      palette('yellow', 80),
      palette('yellow', 60, 'dark'),
    ],
    '--color-icon-yellow': [
      palette('yellow', 30),
      palette('yellow', 70, 'dark'),
    ],
    '--color-text-yellow': [
      palette('yellow', 30),
      palette('yellow', 80, 'dark'),
    ],

    // Green H=145 C=.06
    '--color-background-green': [
      palette('green', 85),
      withAlpha(palette('green', 70, 'dark'), '3D'),
    ],
    '--color-border-green': [
      palette('green', 80),
      palette('green', 60, 'dark'),
    ],
    '--color-icon-green': [palette('green', 30), palette('green', 70, 'dark')],
    '--color-text-green': [palette('green', 30), palette('green', 80, 'dark')],

    // Teal H=180 C=.065
    '--color-background-teal': [
      palette('teal', 85),
      withAlpha(palette('teal', 70, 'dark'), '3D'),
    ],
    '--color-border-teal': [palette('teal', 80), palette('teal', 60, 'dark')],
    '--color-icon-teal': [palette('teal', 30), palette('teal', 70, 'dark')],
    '--color-text-teal': [palette('teal', 30), palette('teal', 80, 'dark')],

    // Cyan H=215 C=.065
    '--color-background-cyan': [
      palette('cyan', 85),
      withAlpha(palette('cyan', 70, 'dark'), '3D'),
    ],
    '--color-border-cyan': [palette('cyan', 80), palette('cyan', 60, 'dark')],
    '--color-icon-cyan': [palette('cyan', 30), palette('cyan', 70, 'dark')],
    '--color-text-cyan': [palette('cyan', 30), palette('cyan', 80, 'dark')],

    // Blue H=255 C=.085
    '--color-background-blue': [
      palette('blue', 85),
      withAlpha(palette('blue', 70, 'dark'), '3D'),
    ],
    '--color-border-blue': [palette('blue', 80), palette('blue', 60, 'dark')],
    '--color-icon-blue': [palette('blue', 30), palette('blue', 70, 'dark')],
    '--color-text-blue': [palette('blue', 30), palette('blue', 80, 'dark')],

    // Purple H=320 C=.06
    '--color-background-purple': [
      palette('purple', 85),
      withAlpha(palette('purple', 70, 'dark'), '3D'),
    ],
    '--color-border-purple': [
      palette('purple', 80),
      palette('purple', 60, 'dark'),
    ],
    '--color-icon-purple': [
      palette('purple', 30),
      palette('purple', 70, 'dark'),
    ],
    '--color-text-purple': [
      palette('purple', 30),
      palette('purple', 80, 'dark'),
    ],

    // Pink H=355 C=.06
    '--color-background-pink': [
      palette('pink', 85),
      withAlpha(palette('pink', 70, 'dark'), '3D'),
    ],
    '--color-border-pink': [palette('pink', 80), palette('pink', 60, 'dark')],
    '--color-icon-pink': [palette('pink', 30), palette('pink', 70, 'dark')],
    '--color-text-pink': [palette('pink', 30), palette('pink', 80, 'dark')],

    // Gray (categorical neutral, chroma 0)
    //   Light: Neutral T90 so it stays distinct from the T95 body.
    //   Dark : var(--color-neutral) — semi-transparent white wash
    //          (#FFFFFF1A, 10%). Matches the same treatment the gray
    //          badge uses; clearly distinct from the body T10 #1b1b1b
    //          while staying chroma-0 neutral. Solid T15 #1c1c1c was
    //          indistinguishable from --color-background-muted.
    '--color-background-gray': [palette('neutral', 90), 'var(--color-neutral)'],
    '--color-border-gray': [
      palette('neutral', 80),
      palette('neutral', 10, 'dark'),
    ],
    '--color-icon-gray': [palette('neutral', 35), palette('neutral', 65)],
    '--color-text-gray': [
      palette('neutral', 15),
      palette('neutral', 90, 'dark'),
    ],

    // =========================================================================
    // Radius — a deliberately non-linear adjustment. The higher-order radius
    // config cannot produce inner=6px and element=10px while preserving the
    // default 12px container and 28px page steps, so only the two values that
    // differ from the defaults are overridden explicitly.
    // =========================================================================
    '--radius-inner': '0.375rem',
    '--radius-element': '0.625rem',

    // =========================================================================
    // Shadows
    //
    // Light mode: matches origin/main exactly (5%/10% low+med, 10%/15% high).
    // Subtle drops; light surfaces don't need rim highlights.
    //
    // Dark mode: deepened drops + an all-around 1px white inset that wraps
    // every edge ("Figma-style bezel"). The inset mimics ambient light
    // catching the surface's rim on every side, giving cards/popovers/modals
    // a substantial "lit from above" feel that drop shadows alone can't
    // achieve against a dark canvas.
    //   low  :  drops 25%/40% + 8%  white all-around inset
    //   med  :  drops 35%/50% + 12% white all-around inset
    //   high :  drops 50%/70% + 15% white all-around inset
    //
    // The inset layer uses light-dark(transparent, ...) so light mode is
    // unaffected — main's exact light values are preserved.
    // =========================================================================
    '--shadow-low':
      '0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 25%)), ' +
      '0 4px 8px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 40%)), ' +
      'inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 8%))',
    '--shadow-med':
      '0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 35%)), ' +
      '0 4px 12px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), ' +
      'inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 12%))',
    '--shadow-high':
      '0 4px 6px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), ' +
      '0 12px 24px light-dark(oklch(0 0 0 / 15%), oklch(0 0 0 / 70%)), ' +
      'inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 15%))',
    '--shadow-inset-hover': `inset 0px 0px 0px 2px ${withAlpha(palette('blue', 45), '4D')}`,
    '--shadow-inset-selected': `inset 0px 0px 0px 2px ${withAlpha(palette('blue', 45), '80')}`,
    '--shadow-inset-success': `inset 0px 0px 0px 2px ${withAlpha(palette('green', 45), '4D')}`,
    '--shadow-inset-warning': `inset 0px 0px 0px 2px ${withAlpha(palette('yellow', 85), '4D')}`,
    '--shadow-inset-error': `inset 0px 0px 0px 2px ${withAlpha(palette('red', 50), '4D')}`,
  },

  components: {
    // =========================================================================
    // Button — primary/secondary/ghost inherit the semantic global tokens.
    // Destructive uses the status surface/text pair rather than inventing a
    // component-local red.
    // =========================================================================
    button: {
      'variant:destructive': {
        backgroundColor: 'var(--color-error-muted)',
        color: 'var(--color-error)',
      },
    },

    // =========================================================================
    // Badge —
    //   Semantic (info/success/warning/error): filled saturated T50 + contrasting
    //     text (white, or dark on yellow). The filled-button rule from #2150
    //     §3 — text contrast locks the bg tone, so this stays at T50 in
    //     BOTH modes, unlike pastel surfaces which invert by mode.
    //   Categorical (blue/green/red/orange/etc.): pastel-tinted hue surface +
    //     colored text — light mode = soft T87-T90 + dark T30 text; dark mode
    //     = T20 tinted + T80 light pastel text (sources: --color-background-X
    //     and --color-text-X tokens).
    //   Neutral: light gray bg + dark text (or inverted in dark mode).
    // =========================================================================
    badge: {
      // Semantic — filled saturated bg + contrasting text.
      //   Light: vivid T45-T55 from the OKLCH palette + white text
      //          (~4.5-5:1 — Material/Linear/Vercel pop).
      //   Dark : T60 stop from the dark-mode tonal palette (chroma×0.85,
      //          +5 tone-lift taper from issue #2150 §4) + DARK text.
      //          T60+white fails AA-large (~2.7:1); T60+dark hits 6.6-7:1
      //          and tames the §4 vibration. Same dark-text-on-bright-bg
      //          treatment that warning yellow uses in both modes.
      'variant:info': {
        // Blue T45 light / T60 dark.
        backgroundColor: FILLED_STATE_COLORS.info,
        color: FILLED_STATE_TEXT.standard,
      },
      'variant:neutral': {
        // Mirrors the gray categorical badge — same neutral chip treatment
        // (Neutral T90 light / semi-transparent white wash dark) sourced
        // from the gray hue tokens, so a single change at the token layer
        // updates both variants.
        backgroundColor: 'var(--color-background-gray)',
        color: 'var(--color-text-gray)',
      },
      'variant:success': {
        // Green T45 light / T60 dark.
        backgroundColor: FILLED_STATE_COLORS.success,
        color: FILLED_STATE_TEXT.standard,
      },
      'variant:warning': {
        // Yellow T85 light / T80 dark, both with dark text.
        backgroundColor: FILLED_STATE_COLORS.warning,
        color: FILLED_STATE_TEXT.onBright,
      },
      'variant:error': {
        // Red T50 light / T60 dark. The light stop is the brightest red that
        // still clears AA with the badge's white label.
        backgroundColor: FILLED_STATE_COLORS.error,
        color: FILLED_STATE_TEXT.standard,
      },

      // Categorical — bg + text reference the per-hue tokens, so behavior
      // tracks the categorical palette automatically:
      //   Light: pastel T87-T90 bg + dark T30 colored text (low-key chip)
      //   Dark : tinted T20 bg + light T80 colored text (per #2150 §5,
      //          inverted from light to avoid the "pastel-in-both-modes"
      //          anti-pattern that makes locked light pastels glow on a
      //          dark body)
      'variant:red': {
        backgroundColor: 'var(--color-background-red)',
        color: 'var(--color-text-red)',
      },
      'variant:orange': {
        backgroundColor: 'var(--color-background-orange)',
        color: 'var(--color-text-orange)',
      },
      'variant:yellow': {
        backgroundColor: 'var(--color-background-yellow)',
        color: 'var(--color-text-yellow)',
      },
      'variant:green': {
        backgroundColor: 'var(--color-background-green)',
        color: 'var(--color-text-green)',
      },
      'variant:teal': {
        backgroundColor: 'var(--color-background-teal)',
        color: 'var(--color-text-teal)',
      },
      'variant:cyan': {
        backgroundColor: 'var(--color-background-cyan)',
        color: 'var(--color-text-cyan)',
      },
      'variant:blue': {
        backgroundColor: 'var(--color-background-blue)',
        color: 'var(--color-text-blue)',
      },
      'variant:purple': {
        backgroundColor: 'var(--color-background-purple)',
        color: 'var(--color-text-purple)',
      },
      'variant:pink': {
        backgroundColor: 'var(--color-background-pink)',
        color: 'var(--color-text-pink)',
      },
      'variant:gray': {
        backgroundColor: 'var(--color-background-gray)',
        color: 'var(--color-text-gray)',
      },
    },

    // Token uses the same categorical color language as Badge. Core already
    // maps red–pink and gray to the shared --color-background-X / --color-text-X
    // pairs, so those variants stay aligned automatically. Only the default
    // Token needs a redirect: match Badge neutral to the gray palette pair
    // instead of using the generic translucent --color-neutral wash.
    token: {
      'color:default': {
        backgroundColor: 'var(--color-background-gray)',
        color: 'var(--color-text-gray)',
      },
    },

    // =========================================================================
    // StatusDot — fill uses the SAME vivid stops as the filled semantic Badge
    // (and ProgressBar), so a dot and its badge read as one status language.
    //
    // The default component maps each variant to a raw semantic token
    // (--color-success / --color-error / --color-warning / --color-icon-
    // secondary), which in light mode are the dark T30/T40 stops meant to
    // sit as TEXT on a pastel surface — as a solid dot they read muddy
    // (dark green / maroon / brown). Redirect them to the badge fills.
    //
    //   success → badge success bg  (green T45 / dark-ramp T60)
    //   warning → badge warning bg  (yellow T85, same hex both modes)
    //   error   → badge error bg    (red T58 / dark-ramp T60)
    //   accent  → badge info bg     (blue T50 / dark-ramp T60) — the
    //             StatusDot "accent" is the info/attention color, so it
    //             pairs with the info badge rather than --color-accent
    //             (near-black #262626, the darkest offender).
    //
    // `neutral` is intentionally NOT overridden: the neutral badge bg is a
    // near-invisible light gray (--color-background-gray T90 / 10% white
    // wash), fine as a large pill but unreadable as an 8px dot. It keeps the
    // component default's visible mid-gray (--color-icon-secondary), which is
    // not among the "too dark" cases.
    // =========================================================================
    'status-dot': {
      'variant:success': {backgroundColor: FILLED_STATE_COLORS.success},
      'variant:warning': {backgroundColor: FILLED_STATE_COLORS.warning},
      'variant:error': {backgroundColor: FILLED_STATE_COLORS.error},
      'variant:accent': {backgroundColor: FILLED_STATE_COLORS.info},
    },

    // AvatarStatusDot shares the same filled state language as StatusDot.
    'avatar-status-dot': {
      'variant:success': {backgroundColor: FILLED_STATE_COLORS.success},
      'variant:error': {backgroundColor: FILLED_STATE_COLORS.error},
    },

    // =========================================================================
    // Banner — sits on a hue-tinted surface with colored text/icon:
    //   Light: pastel T90 bg (pulled from --color-{X}-muted / --color-background-blue)
    //          + dark T30 colored text (--color-text-{hue}).
    //   Dark : tinted T20 bg (same tokens, dark slot) + light T80 colored text.
    //          Per #2150 §5 — large hue-tinted surfaces in dark mode invert
    //          to a deep tinted bg + light text rather than locking the
    //          light-mode pastel.
    //
    // The inner header and its nested text, icon, and action consumers resolve
    // their colors through semantic tokens. Rebind those public tokens here so
    // the whole Banner subtree stays synchronized. A direct `backgroundColor`
    // component override would win through @layer astryx-theme, but it would
    // update only the targeted element rather than the related consumers.
    //
    // Status overrides reference --color-text-{hue} so text/icon colors
    // stay in sync with the palette anchors automatically.
    banner: {
      base: {
        // Secondary actions sit inside a tinted header. The global neutral
        // wash darkens light surfaces and lightens dark surfaces, which moves
        // colored Banner text toward the action fill in both modes. Invert
        // that wash locally so action surfaces add contrast instead.
        '--color-neutral': lightDark(
          withAlpha(palette('neutral', 100), '33'),
          withAlpha(palette('neutral', 0), '33'),
        ),
        '--color-overlay-hover': lightDark(
          withAlpha(palette('neutral', 100), '1A'),
          withAlpha(palette('neutral', 0), '1A'),
        ),
        '--color-overlay-pressed': lightDark(
          withAlpha(palette('neutral', 100), '33'),
          withAlpha(palette('neutral', 0), '33'),
        ),
      },
      'status:info': {
        '--color-accent-muted': 'var(--color-background-blue)',
        '--color-text-primary': 'var(--color-text-blue)',
        '--color-text-secondary': 'var(--color-text-blue)',
        '--color-accent': 'var(--color-text-blue)',
      },
      // success/warning/error banner bgs come from --color-{X}-muted, which
      // already carries the correct light/dark tinted values. We only need
      // to redirect the text/icon to the palette colored stop.
      'status:success': {
        '--color-text-primary': 'var(--color-text-green)',
        '--color-text-secondary': 'var(--color-text-green)',
        '--color-success': 'var(--color-text-green)',
      },
      'status:warning': {
        '--color-text-primary': 'var(--color-text-yellow)',
        '--color-text-secondary': 'var(--color-text-yellow)',
        '--color-warning': 'var(--color-text-yellow)',
      },
      'status:error': {
        '--color-text-primary': 'var(--color-text-red)',
        '--color-text-secondary': 'var(--color-text-red)',
        '--color-error': 'var(--color-text-red)',
      },
    },

    // =========================================================================
    // TextInput / FieldStatus — no per-status overrides needed. FieldStatus
    // deliberately uses the same muted background + colored foreground pairs
    // as Banner for success, warning, and error. The global tokens also carry
    // the correct values for the input border/icon in both modes (light=T40
    // dark colored, dark=T80 light pastel). Verified the message pairs clear
    // AA text 4.5:1 and the input affordances clear AA non-text 3:1.
    // =========================================================================

    // =========================================================================
    // Switch — the off-state track is itself the control boundary, so it uses
    // the globally contrast-safe emphasized border token. ProgressBar is a
    // different relationship (fill on track) and is configured separately.
    // =========================================================================
    switch: {
      base: {
        '--color-background-gray': 'var(--color-border-emphasized)',
      },
    },

    'progress-bar': {
      base: {
        '--color-background-muted': PROGRESS_TRACK,
      },
      // Vivid stops match the filled semantic badge colors except light-mode
      // warning, which moves darker so every variant can share one gray track.
      'variant:accent': {
        '--color-accent': FILLED_STATE_COLORS.info,
      },
      'variant:success': {
        '--color-success': FILLED_STATE_COLORS.success,
      },
      'variant:warning': {
        '--color-warning': PROGRESS_WARNING_FILL,
      },
      'variant:error': {
        '--color-error': FILLED_STATE_COLORS.error,
      },
    },
    // Keep the live neutral fill and endpoint aligned with the primary Button
    // without rebinding disabled progress on the ProgressBar root.
    'progress-bar-fill': {
      'variant:neutral': {
        '--color-text-disabled': 'var(--color-accent)',
      },
    },
    'progress-bar-stop-indicator': {
      'variant:neutral': {
        '--color-text-disabled': 'var(--color-accent)',
      },
    },
    'progress-bar-mark': {
      'variant:neutral+placement:fill': {
        '--color-text-primary': 'var(--color-on-accent)',
      },
    },

    // =========================================================================
    // Card — tighter padding via public card padding token
    // =========================================================================
    card: {
      base: {
        padding: 'var(--spacing-3)',
      },
    },

    // SelectableCard's ring is a meaningful selected-state indicator. Use the
    // lightest same-hue palette stop that clears WCAG 1.4.11 against each Card
    // surface, rather than the much stronger text/icon stop. Neutral variants
    // use a balanced gray just above the same threshold.
    'selectable-card': {
      base: {
        '--selectable-card-ring-color': lightDark(
          palette('neutral', 55),
          palette('neutral', 40, 'dark'),
        ),
      },
      'variant:red': {
        '--selectable-card-ring-color': lightDark(
          palette('red', 50),
          'var(--color-border-red)',
        ),
      },
      'variant:orange': {
        '--selectable-card-ring-color': lightDark(
          palette('orange', 50),
          'var(--color-border-orange)',
        ),
      },
      'variant:yellow': {
        '--selectable-card-ring-color': lightDark(
          palette('yellow', 50),
          'var(--color-border-yellow)',
        ),
      },
      'variant:green': {
        '--selectable-card-ring-color': lightDark(
          palette('green', 45),
          'var(--color-border-green)',
        ),
      },
      'variant:teal': {
        '--selectable-card-ring-color': lightDark(
          palette('teal', 45),
          'var(--color-border-teal)',
        ),
      },
      'variant:cyan': {
        '--selectable-card-ring-color': lightDark(
          palette('cyan', 45),
          'var(--color-border-cyan)',
        ),
      },
      'variant:blue': {
        '--selectable-card-ring-color': lightDark(
          palette('blue', 50),
          'var(--color-border-blue)',
        ),
      },
      'variant:purple': {
        '--selectable-card-ring-color': lightDark(
          palette('purple', 50),
          'var(--color-border-purple)',
        ),
      },
      'variant:pink': {
        '--selectable-card-ring-color': lightDark(
          palette('pink', 50),
          'var(--color-border-pink)',
        ),
      },
      'variant:gray': {
        '--selectable-card-ring-color': lightDark(
          palette('neutral', 50),
          palette('neutral', 50, 'dark'),
        ),
      },
    },

    // =========================================================================
    // Section — tighter padding via public section padding token
    // =========================================================================
    section: {
      base: {
        padding: 'var(--spacing-3)',
      },
    },

    // Heading and text component overrides are auto-generated by typography.scale.
    // h3/h4 bold weights come from typography.heading.weights above.
  },

  icons: neutralIconRegistry,
});
