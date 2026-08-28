# @astryxdesign/theme-neutral

Muted, minimal aesthetic with Figtree typography and [Lucide](https://lucide.dev) icons.

## Install

```bash
npm install @astryxdesign/theme-neutral
```

## Usage

Wrap your app with `Theme`, import the built stylesheet, and pass the theme:

```tsx
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';

function App() {
  return (
    <Theme theme={neutralTheme} mode="system">
      {/* your app */}
    </Theme>
  );
}
```

### Import paths

| Path                                    | Use case                                                    |
| --------------------------------------- | ----------------------------------------------------------- |
| `@astryxdesign/theme-neutral`           | Source build (StyleX compilation via `@astryxdesign/build`) |
| `@astryxdesign/theme-neutral/built`     | Pre-built dist (Tailwind, plain CSS, or no build step)      |
| `@astryxdesign/theme-neutral/theme.css` | Pre-built CSS file (import in your stylesheet)              |

If you're using `@astryxdesign/build` for StyleX source compilation, import from the bare path. Otherwise, use `/built`.

## Approved palette

The source package exports `neutralPalettes`, and every built `neutralTheme`
includes the same data at `neutralTheme.palettes`. Each family contains exact
light- and dark-mode stops from T0 through T100 in increments of five.

Use semantic theme tokens for components. When a new semantic token or audit
tool needs a raw color, select an exact named family and tone from this palette
rather than inventing or approximating a hex value. Alpha overlays should be
derived from a named stop and documented at the token that uses them.

```tsx
import {neutralPalettes} from '@astryxdesign/theme-neutral';

const auditedInfo = neutralPalettes.blue.light[45];
```

The pre-built theme exposes the same palette without requiring source
compilation:

```tsx
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

const auditedInfo = neutralTheme.palettes?.blue.light[45];
```

### CSS import

Add the theme CSS to your stylesheet:

```css
@import '@astryxdesign/theme-neutral/theme.css';
```

This is required for component-level theme overrides (colors, radii, typography) to take effect.

### Font loading

The theme names Figtree but does not load font files. Load it in the consuming
application before rendering the theme; otherwise the configured system-font
fallback stack is used.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" />
```

## Related Packages

| Package                                                                              | Description                               |
| ------------------------------------------------------------------------------------ | ----------------------------------------- |
| [`@astryxdesign/core`](https://github.com/facebook/astryx/tree/main/packages/core)   | Core components and theme system          |
| [`@astryxdesign/build`](https://github.com/facebook/astryx/tree/main/packages/build) | Build plugins for StyleX source builds    |
| [`@astryxdesign/cli`](https://github.com/facebook/astryx/tree/main/packages/cli)     | CLI tooling including `astryx docs theme` |
