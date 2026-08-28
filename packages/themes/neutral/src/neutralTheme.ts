// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * Neutral Theme
 *
 * A pure grayscale spine with a from-scratch OKLCH-derived categorical
 * palette. Hues are placed at evenly-spaced positions on the OKLCH wheel,
 * chosen to keep each color recognizable at every tone (no red drift for
 * orange, no blue drift for purple) and well-separated from its neighbors.
 *
 * Base neutral ramp: #fafafa, #f5f5f5, #e5e5e5, #737373, #262626, #0a0a0a.
 * Semantic surfaces select from and interpolate between those anchors.
 *
 * Categorical hues (OKLCH; chroma = max-in-gamut at the saturated stop):
 *   Red H=25    Orange H=65    Yellow H=90    Green H=145
 *   Teal H=180  Cyan H=215     Blue H=250     Purple H=320  Pink H=355
 *
 * Filled semantic states use contrast-locked vivid stops shared by Badge,
 * StatusDot, and ProgressBar. Categorical states use dark text on pastel
 * surfaces in light mode and light text on translucent tinted surfaces in dark
 * mode. Every Badge label/fill pair is held to WCAG AA by
 * `scripts/check-badge-contrast.test.mjs`.
 *
 * Only overrides tokens that differ from the defaults.
 */

import {defineTheme, defineSyntaxTheme} from '@astryxdesign/core/theme';
import {neutralIconRegistry} from './icons';

/**
 * Neutral syntax palette — pulled from the OKLCH T30 (light) / T80 (dark)
 * stops of the categorical ramps. Same colors used by --color-icon-* tokens.
 */
const neutralSyntax = defineSyntaxTheme({
  name: 'xds-neutral',
  tokens: {
    keyword: ['#6a1b7b', '#e4caea'], // purple T30/T80
    string: ['#005711', '#c0dec0'], // green T30/T80
    comment: ['#737373', '#a3a3a3'], // neutral
    number: ['#673a00', '#f1cdac'], // orange T30/T80
    function: ['#00458c', '#b8d7ff'], // blue T30/T80 H=255
    type: ['#6a1b7b', '#e4caea'], // purple T30/T80
    variable: ['#171717', '#e5e5e5'], // near-black / near-white
    operator: ['#737373', '#a3a3a3'], // neutral
    constant: ['#673a00', '#f1cdac'], // orange T30/T80
    tag: ['#8a0011', '#f7c7c2'], // red T30/T80
    attribute: ['#584400', '#f1d27c'], // yellow T30/T80
    property: ['#005348', '#ade1d6'], // teal T30/T80
    // #a3a3a3/#525252 (this pair's own disabled-text tone) failed WCAG AA
    // against the syntax background: 2.42:1 light, 2.53:1 dark. #5386.
    punctuation: ['#6e6e6e', '#a0a0a0'], // neutral, 4.89:1 / 7.57:1
    background: ['#fafafa', '#0a0a0a'],
  },
});

/**
 * Filled semantic colors are shared by Badge, StatusDot, and ProgressBar so
 * the same state cannot drift between components. Each pair is resolved for
 * both color schemes and tested at its actual point of use.
 */
const FILLED_STATE_COLORS = {
  info: 'light-dark(#0068cc, #529fff)',
  success: 'light-dark(#098123, #62b466)',
  warning: 'light-dark(#f6d168, #f1d27c)',
  error: 'light-dark(#ca3f3e, #ec746e)',
} as const;

const FILLED_STATE_TEXT = {
  standard: 'light-dark(#ffffff, #1b1b1b)',
  onBright: '#1b1b1b',
} as const;

/**
 * Progress is a fill-on-track relationship, not a control boundary. Its track
 * therefore stays separate from --color-border-emphasized: dark fills need a
 * light neutral track, while the bright warning fill needs a darker one.
 */
const PROGRESS_TRACK = 'light-dark(#d4d4d4, #3b3b3b)';
// Warning keeps the exact filled Badge yellow. Its track uses the yellow
// palette's #927300 stop (light T50 / dark T45 after the dark-ramp transform),
// which clears 3:1 against both the bright fill and every parent surface.
const PROGRESS_WARNING_TRACK = '#927300';

export const neutralTheme = defineTheme({
  name: 'neutral',

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

  tokens: {
    // =========================================================================
    // Core — pure grayscale spine (Tailwind neutral)
    // 50:#fafafa 100:#f5f5f5 200:#e5e5e5 300:#d4d4d4 400:#a3a3a3
    // 500:#737373 600:#525252 700:#404040 800:#262626 900:#171717 950:#0a0a0a
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
    '--color-background-surface': ['#ffffff', '#262626'],
    '--color-background-body': ['#f1f1f1', '#1b1b1b'],
    '--color-background-card': ['#ffffff', '#1b1b1b'],
    '--color-background-popover': ['#ffffff', '#1b1b1b'],
    '--color-background-muted': ['#f1f1f1', '#1b1b1b'],

    // Accent + neutral surface tints (sit alongside backgrounds)
    '--color-accent': ['#262626', '#e7e7e7'],
    '--color-accent-muted': ['#f1f1f1', '#262626'],
    '--color-neutral': ['#0000000F', '#FFFFFF1A'],

    // Overlays (modal scrims, hover/pressed tints)
    '--color-overlay': ['#00000080', '#000000CC'],
    '--color-overlay-hover': ['#0000000D', '#FFFFFF0D'],
    '--color-overlay-pressed': ['#0000001A', '#FFFFFF1A'],

    // Text
    '--color-text-primary': ['#1b1b1b', '#f1f1f1'],
    // Light secondary is neutral-600 (#525252), not 500 (#737373): 500 only
    // reaches 4.19:1 on the T95 body (#f1f1f1), just under WCAG AA 4.5:1.
    // 600 clears it (6.9:1 on body, 7.8:1 on card). Dark stays neutral-400.
    '--color-text-secondary': ['#525252', '#9e9e9e'],
    '--color-text-disabled': ['#a3a3a3', '#525252'],
    '--color-text-accent': ['#262626', '#e7e7e7'],
    '--color-on-dark': '#ffffff',
    '--color-on-light': '#1b1b1b',
    // Contrast: neutral accent is near-black (L) / near-white (D)
    '--color-on-accent': ['#ffffff', '#1b1b1b'],
    '--color-on-success': ['#ffffff', '#1b1b1b'],
    '--color-on-error': ['#ffffff', '#1b1b1b'],
    '--color-on-warning': '#1b1b1b',

    // Icon
    '--color-icon-accent': ['#262626', '#e7e7e7'],
    '--color-icon-primary': ['#1b1b1b', '#f1f1f1'],
    '--color-icon-secondary': ['#777777', '#9e9e9e'],
    '--color-icon-disabled': ['#a3a3a3', '#525252'],

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
    '--color-success': ['#005711', '#c0dec0'],
    // Error uses one stronger foreground step (T25/T85) so destructive button
    // text retains comfortable AA headroom through its pressed overlay.
    '--color-error': ['#76000c', '#f9d4d0'],
    '--color-warning': ['#584400', '#f1d27c'],
    '--color-success-muted': ['#bde0bd', '#94c9953D'],
    '--color-error-muted': ['#fdc5bf', '#f2a0993D'],
    '--color-warning-muted': ['#f8e1a2', '#e1b3003D'],

    // Border. Emphasized is the perceivable boundary used by inputs,
    // unchecked selection controls, and the off Switch track. Neutral 500 is
    // the first shared ramp stop that clears WCAG 1.4.11 (3:1) against both
    // the body and surface in both color schemes.
    '--color-border': ['#00000014', '#FFFFFF1A'],
    '--color-border-emphasized': ['#777777', '#777777'],

    // Effects
    '--color-skeleton': ['#e2e2e2', '#525252'],
    '--color-shadow': ['#0000001A', '#0000004D'],
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
    '--color-background-red': ['#fdc5bf', '#f2a0993D'],
    '--color-border-red': ['#fcb0a9', '#ec746e'],
    '--color-icon-red': ['#8a0011', '#f2a099'],
    '--color-text-red': ['#76000c', '#f9d4d0'],

    // Orange H=65 C=.07
    '--color-background-orange': ['#f5cca4', '#e8aa6d3D'],
    '--color-border-orange': ['#f3ba82', '#df8600'],
    '--color-icon-orange': ['#673a00', '#e8aa6d'],
    '--color-text-orange': ['#673a00', '#f1cdac'],

    // Yellow H=90 C=.13
    '--color-background-yellow': ['#f8e1a2', '#e1b3003D'],
    '--color-border-yellow': ['#f1c000', '#c09800'],
    '--color-icon-yellow': ['#584400', '#e1b300'],
    '--color-text-yellow': ['#584400', '#f1d27c'],

    // Green H=145 C=.06
    '--color-background-green': ['#bde0bd', '#94c9953D'],
    '--color-border-green': ['#a5d6a5', '#62b466'],
    '--color-icon-green': ['#005711', '#94c995'],
    '--color-text-green': ['#005711', '#c0dec0'],

    // Teal H=180 C=.065
    '--color-background-teal': ['#a6e3d6', '#68cebb3D'],
    '--color-border-teal': ['#80dac9', '#00b7a1'],
    '--color-icon-teal': ['#005348', '#68cebb'],
    '--color-text-teal': ['#005348', '#ade1d6'],

    // Cyan H=215 C=.065
    '--color-background-cyan': ['#a3e0ef', '#64c9e13D'],
    '--color-border-cyan': ['#7cd6eb', '#00b1ce'],
    '--color-icon-cyan': ['#00505f', '#64c9e1'],
    '--color-text-cyan': ['#00505f', '#acdeeb'],

    // Blue H=255 C=.085
    '--color-background-blue': ['#b8d7ff', '#87bcff3D'],
    '--color-border-blue': ['#a0caff', '#529fff'],
    '--color-icon-blue': ['#00458c', '#87bcff'],
    '--color-text-blue': ['#00458c', '#b8d7ff'],

    // Purple H=320 C=.06
    '--color-background-purple': ['#e7c8ed', '#d3a6de3D'],
    '--color-border-purple': ['#dfb5e9', '#c380d3'],
    '--color-icon-purple': ['#6a1b7b', '#d3a6de'],
    '--color-text-purple': ['#6a1b7b', '#e4caea'],

    // Pink H=355 C=.06
    '--color-background-pink': ['#f6c5d6', '#e8a0bc3D'],
    '--color-border-pink': ['#f3b0c9', '#df77a2'],
    '--color-icon-pink': ['#82014b', '#e8a0bc'],
    '--color-text-pink': ['#82014b', '#f1c7d6'],

    // Gray (categorical neutral, chroma 0)
    //   Light: Neutral T90 so it stays distinct from the T95 body.
    //   Dark : var(--color-neutral) — semi-transparent white wash
    //          (#FFFFFF1A, 10%). Matches the same treatment the gray
    //          badge uses; clearly distinct from the body T10 #1b1b1b
    //          while staying chroma-0 neutral. Solid T15 #1c1c1c was
    //          indistinguishable from --color-background-muted.
    '--color-background-gray': ['#e2e2e2', 'var(--color-neutral)'],
    '--color-border-gray': ['#c6c6c6', '#262626'],
    '--color-icon-gray': ['#525252', '#9e9e9e'],
    '--color-text-gray': ['#262626', '#e7e7e7'],

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
    '--shadow-inset-hover': 'inset 0px 0px 0px 2px #0068cc4D',
    '--shadow-inset-selected': 'inset 0px 0px 0px 2px #0068cc80',
    '--shadow-inset-success': 'inset 0px 0px 0px 2px #0981234D',
    '--shadow-inset-warning': 'inset 0px 0px 0px 2px #f6d1684D',
    '--shadow-inset-error': 'inset 0px 0px 0px 2px #ca3f3e4D',
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
        // (Neutral 200 light / semi-transparent white wash dark) sourced
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
    // near-invisible light gray (--color-background-gray #e5e5e5 / 10% white
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
    // The inner-header *-muted token carries the tinted background for every
    // status, info included. A theme override that sets a plain CSS property
    // instead lands in @layer astryx-theme, which StyleX's @layer priority4
    // outranks, so `backgroundColor` here would silently do nothing and the
    // info banner would paint no background at all.
    //
    // Status overrides reference --color-text-{hue} so text/icon colors
    // stay in sync with the palette anchors automatically.
    banner: {
      base: {
        // Secondary actions sit inside a tinted header. The global neutral
        // wash darkens light surfaces and lightens dark surfaces, which moves
        // colored Banner text toward the action fill in both modes. Invert
        // that wash locally so action surfaces add contrast instead.
        '--color-neutral': 'light-dark(#FFFFFF33, #00000033)',
        '--color-overlay-hover': 'light-dark(#FFFFFF1A, #0000001A)',
        '--color-overlay-pressed': 'light-dark(#FFFFFF33, #00000033)',
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
      // Vivid stops exactly match the filled semantic badge colors. Warning
      // needs a yellow-family track because its bright fill cannot reach 3:1
      // against the shared light neutral track.
      'variant:accent': {
        '--color-accent': FILLED_STATE_COLORS.info,
      },
      'variant:success': {
        '--color-success': FILLED_STATE_COLORS.success,
      },
      'variant:warning': {
        '--color-background-muted': PROGRESS_WARNING_TRACK,
        '--color-warning': FILLED_STATE_COLORS.warning,
      },
      'variant:error': {
        '--color-error': FILLED_STATE_COLORS.error,
      },
    },
    // The live neutral variant carries the same high-emphasis neutral color as
    // the primary Button: near-black in light mode and near-white in dark mode.
    // This targets the fill rather than rebinding --color-text-disabled on the
    // ProgressBar root, so genuinely disabled progress remains muted.
    'progress-bar-fill': {
      'variant:neutral': {
        backgroundColor: 'var(--color-accent)',
      },
    },
    'progress-bar-mark': {
      'variant:neutral+placement:fill': {
        backgroundColor: 'var(--color-on-accent)',
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
