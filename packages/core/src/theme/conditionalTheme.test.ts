// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * Tests for the conditional theme layer — named conditions (`mobile`) whose
 * values apply only where the condition matches.
 *
 * The contract these pin, in order of how load-bearing it is:
 *   - unset or null emits NOTHING, so existing themes are byte-identical;
 *   - `mobile` means narrow AND touch — never a width-only query;
 *   - the breakpoint has a documented default (756) and is configurable;
 *   - each axis is independent — only what the author set generates CSS;
 *   - inside a matching condition the conditional value wins, and outside it
 *     the base theme is untouched.
 */

import {describe, it, expect} from 'vitest';
import {
  defineTheme,
  generateThemeCSS,
  generateConditionalCSS,
} from './defineTheme';
import {DEFAULT_MOBILE_BREAKPOINT, mobileMediaQuery} from './conditionalTheme';

const MOBILE_QUERY = '@media (max-width: 756px) and (pointer: coarse)';

function allCSS(theme: Parameters<typeof generateThemeCSS>[0]): string {
  const {prose, component} = generateThemeCSS(theme);
  return [prose, component].filter(Boolean).join('\n\n');
}

describe('conditional theme — unset means nothing is emitted', () => {
  it('produces no conditional data when no condition is declared', () => {
    const theme = defineTheme({name: 'no-conditions', tokens: {}});
    expect(theme.__conditional).toBeUndefined();
    expect('__conditional' in theme).toBe(false);
  });

  it('produces no conditional data for an explicit null', () => {
    const theme = defineTheme({name: 'null-mobile', mobile: null});
    expect(theme.__conditional).toBeUndefined();
  });

  it('emits no media block, empty or otherwise, when mobile is unset', () => {
    const css = allCSS(
      defineTheme({
        name: 'plain',
        typography: {scale: {base: 14, ratio: 1.2}},
        tokens: {'--color-accent': '#0064E0'},
      }),
    );
    expect(css).not.toContain('@media');
    expect(css).not.toContain('pointer: coarse');
  });

  it('leaves a theme byte-identical to the same theme without the key', () => {
    const input = {
      name: 'identical',
      typography: {scale: {base: 14, ratio: 1.2}},
      tokens: {'--color-accent': '#0064E0'},
      components: {button: {base: {fontWeight: '600'}}},
    } as const;

    const withoutKey = allCSS(defineTheme({...input}));
    const withNull = allCSS(defineTheme({...input, mobile: null}));
    const withUndefined = allCSS(defineTheme({...input, mobile: undefined}));

    expect(withNull).toBe(withoutKey);
    expect(withUndefined).toBe(withoutKey);
  });

  it('emits nothing for a declared but empty condition', () => {
    const theme = defineTheme({name: 'empty-mobile', mobile: {}});
    // The layer exists (the author asked for it) but contributes no rules.
    expect(theme.__conditional).toHaveLength(1);
    expect(generateConditionalCSS(theme)).toEqual({prose: '', component: ''});
    expect(allCSS(theme)).not.toContain('@media');
  });
});

describe('conditional theme — the mobile condition', () => {
  it('compiles to narrow AND touch, never width alone', () => {
    const theme = defineTheme({
      name: 'mobile-query',
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const css = allCSS(theme);
    expect(css).toContain(MOBILE_QUERY);
    // The touch half is load-bearing: a desktop user dragging their window
    // narrow must not match.
    expect(css).toContain('(pointer: coarse)');
    expect(css).not.toMatch(/@media \(max-width: \d+px\)\s*\{/);
  });

  it('defaults the breakpoint to 756px', () => {
    expect(DEFAULT_MOBILE_BREAKPOINT).toBe(756);
    expect(mobileMediaQuery()).toBe('(max-width: 756px) and (pointer: coarse)');

    const theme = defineTheme({
      name: 'default-bp',
      mobile: {tokens: {'--spacing-4': '12px'}},
    });
    expect(theme.__conditional?.[0].query).toBe(
      '(max-width: 756px) and (pointer: coarse)',
    );
  });

  it('lets breakpoints.mobile override the width, keeping the pointer half', () => {
    const theme = defineTheme({
      name: 'custom-bp',
      breakpoints: {mobile: 640},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const css = allCSS(theme);
    expect(css).toContain('@media (max-width: 640px) and (pointer: coarse)');
    expect(css).not.toContain('756px');
  });

  it('scopes conditional rules to the theme, like the base rules', () => {
    const {component} = generateConditionalCSS(
      defineTheme({
        name: 'scoped',
        mobile: {tokens: {'--spacing-4': '12px'}},
      }),
    );
    expect(component).toContain('@media (max-width: 756px)');
    expect(component).toContain('@scope ([data-astryx-theme="scoped"])');
    expect(component).toContain('to ([data-astryx-theme])');
    expect(component).toContain('--spacing-4: 12px;');
  });
});

describe('conditional theme — axes are independent', () => {
  it('emits only token declarations when only tokens are set', () => {
    const {component} = generateConditionalCSS(
      defineTheme({
        name: 'tokens-only',
        typography: {scale: {base: 14, ratio: 1.2}},
        mobile: {tokens: {'--spacing-4': '12px'}},
      }),
    );

    expect(component).toContain('--spacing-4: 12px;');
    // No typography anywhere in the conditional block: not the generated
    // component rules, not the tokens, even though the base theme has a scale.
    expect(component).not.toContain('.astryx-text');
    expect(component).not.toContain('.astryx-heading');
    expect(component).not.toContain('--text-body-size');
  });

  it('emits typography tokens and component rules when typography is set', () => {
    const theme = defineTheme({
      name: 'typo-mobile',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {base: 16, ratio: 1.2}}},
    });
    const {component, prose} = generateConditionalCSS(theme);

    // The conditional scale's own tokens, not the base theme's.
    expect(theme.tokens['--font-size-base']).toBe('0.875rem');
    expect(component).toContain('--font-size-base: 1rem;');
    expect(component).toContain('.astryx-text.body');

    // Prose elements track the conditional scale too: line-heights are baked
    // into those rules as literals, so they have to be re-emitted.
    expect(prose).toContain(MOBILE_QUERY);
    expect(prose).toContain(':where(p)');
    expect(prose).toContain('line-height: 1.5;');
    expect(generateThemeCSS(theme).prose).toContain('line-height: 1.4286;');
  });

  it('emits no prose block when the condition changes no text tokens', () => {
    const {prose} = generateConditionalCSS(
      defineTheme({
        name: 'no-prose-mobile',
        mobile: {tokens: {'--spacing-4': '12px'}},
      }),
    );
    expect(prose).toBe('');
  });

  it('emits only component rules when only components are set', () => {
    const {component} = generateConditionalCSS(
      defineTheme({
        name: 'components-only',
        mobile: {components: {button: {base: {paddingBlock: '12px'}}}},
      }),
    );

    expect(component).toContain('.astryx-button');
    expect(component).toContain('padding-block: 12px;');
    expect(component).not.toContain(':scope {');
  });

  it('supports the radius, color and motion axes', () => {
    const {component} = generateConditionalCSS(
      defineTheme({
        name: 'other-axes',
        mobile: {
          radius: {base: 4, multiplier: 2},
          motion: {fast: 100, medium: 250, ratio: 0.75},
          color: {accent: '#0064E0'},
        },
      }),
    );

    expect(component).toContain('--radius-element');
    expect(component).toContain('--duration-fast');
    expect(component).toContain('--color-accent');
  });

  it('does not police what an axis may override', () => {
    // Astryx guides, it does not prevent: a builder who asks for a mobile
    // radius or padding change gets it.
    const {component} = generateConditionalCSS(
      defineTheme({
        name: 'unpoliced',
        mobile: {
          tokens: {'--radius-container': '0px', '--spacing-4': '2px'},
          components: {card: {base: {padding: '4px'}}},
        },
      }),
    );
    expect(component).toContain('--radius-container: 0px;');
    expect(component).toContain('--spacing-4: 2px;');
    expect(component).toContain('.astryx-card');
  });
});

describe('conditional theme — precedence', () => {
  it('lets the conditional value win inside the query and leaves the base alone outside it', () => {
    const theme = defineTheme({
      name: 'precedence',
      tokens: {'--spacing-4': '16px'},
      mobile: {tokens: {'--spacing-4': '12px'}},
    });

    const {component} = generateThemeCSS(theme);

    // The base declaration still ships unchanged — desktop is untouched.
    const baseIndex = component.indexOf('--spacing-4: 16px;');
    const conditionalIndex = component.indexOf('--spacing-4: 12px;');
    expect(baseIndex).toBeGreaterThanOrEqual(0);
    expect(conditionalIndex).toBeGreaterThanOrEqual(0);

    // A media query adds no specificity, so the conditional block must come
    // LATER in source order for its value to win where it matches. This is
    // the documented precedence rule.
    expect(conditionalIndex).toBeGreaterThan(baseIndex);
    expect(component.indexOf(MOBILE_QUERY)).toBeGreaterThan(baseIndex);

    // The base theme's own token map is untouched by the conditional layer.
    expect(theme.tokens['--spacing-4']).toBe('16px');
  });

  it('lets the same component rule be overridden inside the condition', () => {
    const {component} = generateThemeCSS(
      defineTheme({
        name: 'component-precedence',
        components: {button: {base: {fontSize: '14px'}}},
        mobile: {components: {button: {base: {fontSize: '16px'}}}},
      }),
    );

    expect(component.indexOf('font-size: 16px;')).toBeGreaterThan(
      component.indexOf('font-size: 14px;'),
    );
  });

  it('lets explicit conditional tokens beat the condition\u2019s own scale', () => {
    const theme = defineTheme({
      name: 'within-condition',
      mobile: {
        typography: {scale: {base: 16, ratio: 1.2}},
        tokens: {'--text-body-size': '18px'},
      },
    });

    expect(theme.__conditional?.[0].tokens['--text-body-size']).toBe('18px');
  });

  it('keeps desktop output unchanged when a mobile layer is added', () => {
    const base = {
      name: 'desktop-stable',
      typography: {scale: {base: 14, ratio: 1.2}},
      tokens: {'--spacing-4': '16px'},
      components: {button: {base: {fontWeight: '600'}}},
    } as const;

    const withoutMobile = generateThemeCSS(defineTheme({...base}));
    const withMobile = generateThemeCSS(
      defineTheme({
        ...base,
        mobile: {tokens: {'--spacing-4': '12px'}},
      }),
    );

    // Everything the desktop cascade sees is the prefix before the @media
    // block — identical, character for character.
    const conditionalStart = withMobile.component.indexOf(MOBILE_QUERY);
    expect(conditionalStart).toBeGreaterThan(0);
    expect(withMobile.component.slice(0, conditionalStart).trimEnd()).toBe(
      withoutMobile.component.trimEnd(),
    );
    expect(withMobile.prose).toBe(withoutMobile.prose);
  });
});

describe('conditional theme — the type scale', () => {
  /** Read a semantic role's px size out of a resolved token map. */
  function roleSize(tokens: Record<string, string>, role: string): number {
    const ref = tokens[`--text-${role}-size`];
    const raw = /var\((--font-size-[^)]+)\)/.exec(ref);
    return Math.round(parseFloat(raw ? tokens[raw[1]] : ref) * 16);
  }
  function ladder(
    theme: ReturnType<typeof defineTheme>,
    tokens: Record<string, string>,
  ): Record<string, number> {
    const merged = {...theme.tokens, ...tokens};
    return Object.fromEntries(
      ['display-1', 'heading-1', 'heading-2', 'heading-3', 'body'].map(r => [
        r,
        roleSize(merged, r),
      ]),
    );
  }
  const desktop = {scale: {base: 14, ratio: 1.2}} as const;

  it('inherits base and ratio from the theme when the condition omits them', () => {
    const theme = defineTheme({
      name: 'inherit-scale',
      typography: desktop,
      mobile: {typography: {scale: {}}},
    });
    // Nothing stated, nothing moves — same ladder as the desktop scale.
    expect(ladder(theme, theme.__conditional![0].tokens)).toEqual(
      ladder(theme, theme.tokens),
    );
  });

  it('lifts the whole ladder when a base is floored with no pin', () => {
    const theme = defineTheme({
      name: 'lift',
      typography: desktop,
      mobile: {typography: {scale: {base: 16}}},
    });
    // The desktop ratio is kept, so every role grows by the same factor —
    // including Display 1, on the device with the least room for it.
    expect(ladder(theme, theme.__conditional![0].tokens)).toEqual({
      'display-1': 48,
      'heading-1': 28,
      'heading-2': 23,
      'heading-3': 19,
      body: 16,
    });
  });

  it('an omitted ratio lifts exactly as an explicit desktop ratio does', () => {
    const inherited = defineTheme({
      name: 'lift-inherited',
      typography: desktop,
      mobile: {typography: {scale: {base: 16}}},
    });
    const spelled = defineTheme({
      name: 'lift-spelled',
      typography: desktop,
      mobile: {typography: {scale: {base: 16, ratio: 1.2}}},
    });
    expect(inherited.__conditional![0].tokens).toEqual(
      spelled.__conditional![0].tokens,
    );
  });

  it('holds the pinned role at its desktop size and re-derives the rest', () => {
    const theme = defineTheme({
      name: 'pin-display-1',
      typography: desktop,
      mobile: {typography: {scale: {base: 16, pin: 'display-1'}}},
    });
    const mobile = ladder(theme, theme.__conditional![0].tokens);

    // Display 1 lands exactly on its desktop size — the point of the pin.
    expect(mobile['display-1']).toBe(ladder(theme, theme.tokens)['display-1']);
    expect(mobile).toEqual({
      'display-1': 42,
      'heading-1': 26,
      'heading-2': 22,
      'heading-3': 19,
      body: 16,
    });
  });

  it('pins any anchor, not just the top of the ramp', () => {
    const theme = defineTheme({
      name: 'pin-heading-2',
      typography: desktop,
      mobile: {typography: {scale: {base: 16, pin: 'heading-2'}}},
    });
    const desktopLadder = ladder(theme, theme.tokens);
    const mobile = ladder(theme, theme.__conditional![0].tokens);

    expect(mobile['heading-2']).toBe(desktopLadder['heading-2']);
    // Pinning lower tames the display tier harder than pinning the top does.
    expect(mobile['display-1']).toBeLessThan(desktopLadder['display-1']);
  });

  it('pin wins over an explicitly stated ratio', () => {
    const pinned = defineTheme({
      name: 'pin-beats-ratio',
      typography: desktop,
      mobile: {typography: {scale: {base: 16, ratio: 1.9, pin: 'display-1'}}},
    });
    const pinnedOnly = defineTheme({
      name: 'pin-alone',
      typography: desktop,
      mobile: {typography: {scale: {base: 16, pin: 'display-1'}}},
    });
    expect(pinned.__conditional![0].tokens).toEqual(
      pinnedOnly.__conditional![0].tokens,
    );
  });

  it("'auto' picks the anchor from the theme's ratio", () => {
    // A gentle ramp can afford to pin the top: same result as display-1.
    const gentle = defineTheme({
      name: 'auto-gentle',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {base: 16, pin: 'auto'}}},
    });
    const gentleExplicit = defineTheme({
      name: 'auto-gentle-explicit',
      typography: {scale: {base: 14, ratio: 1.2}},
      mobile: {typography: {scale: {base: 16, pin: 'display-1'}}},
    });
    expect(gentle.__conditional![0].tokens).toEqual(
      gentleExplicit.__conditional![0].tokens,
    );

    // A dramatic ramp pins low instead, so the display tier does not tower
    // over 16px body text on a phone.
    const dramatic = defineTheme({
      name: 'auto-dramatic',
      typography: {scale: {base: 14, ratio: 1.5}},
      mobile: {typography: {scale: {base: 16, pin: 'auto'}}},
    });
    const dramaticExplicit = defineTheme({
      name: 'auto-dramatic-explicit',
      typography: {scale: {base: 14, ratio: 1.5}},
      mobile: {typography: {scale: {base: 16, pin: 'heading-3'}}},
    });
    expect(dramatic.__conditional![0].tokens).toEqual(
      dramaticExplicit.__conditional![0].tokens,
    );
  });

  it('pins against the built-in scale when the theme declares none', () => {
    const theme = defineTheme({
      name: 'pin-default-scale',
      mobile: {typography: {scale: {base: 16, pin: 'display-1'}}},
    });
    // The built-in scale is 14/1.2, so Display 1 holds at its 42px default.
    expect(
      roleSize(
        {...theme.tokens, ...theme.__conditional![0].tokens},
        'display-1',
      ),
    ).toBe(42);
  });

  it('is a no-op for a theme whose base already clears the floor', () => {
    const theme = defineTheme({
      name: 'already-16',
      typography: {scale: {base: 16, ratio: 1.25}},
      mobile: {typography: {scale: {base: 16, pin: 'display-1'}}},
    });
    // Nothing to re-derive: the conditional ladder equals the desktop one,
    // rounding included.
    const conditional = theme.__conditional![0].tokens;
    for (const [key, value] of Object.entries(conditional)) {
      if (key.startsWith('--font-size-')) {
        expect(value).toBe(theme.tokens[key]);
      }
    }
  });

  it('carries weight overrides through a pinned scale', () => {
    const theme = defineTheme({
      name: 'pin-weights',
      typography: desktop,
      mobile: {
        typography: {
          scale: {base: 16, pin: 'display-1'},
          heading: {weight: 'bold'},
        },
      },
    });
    expect(theme.__conditional![0].tokens['--text-heading-1-weight']).toBe(
      'var(--font-weight-bold)',
    );
  });
});
