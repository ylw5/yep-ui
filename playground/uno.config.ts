import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
export default defineConfig({
  presets: [
    presetUno(),
    // presetIcons({
    //   cdn: 'https://esm.sh/',
    //   extraProperties: {
    //     'vertical-align': 'middle',
    //     'display': 'inline-block',
    //     'flex-shrink': '0',
    //     'height': '1em',
    //     'width': '1em',
    //     'backface-visibility': 'hidden',
    //   },
    // }),
  ],
  // transformers: [
  //   transformerVariantGroup(),
  // ],
  theme: {
    colors: {
      border: 'hsla(var(--border))',
      input: 'hsla(var(--input))',
      ring: 'hsla(var(--ring))',
      background: 'hsla(var(--background))',
      foreground: 'hsla(var(--foreground))',
      primary: {
        DEFAULT: 'hsla(var(--primary))',
        foreground: 'hsla(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsla(var(--secondary))',
        foreground: 'hsla(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsla(var(--destructive))',
        foreground: 'hsla(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsla(var(--muted))',
        foreground: 'hsla(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsla(var(--accent))',
        foreground: 'hsla(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsla(var(--popover))',
        foreground: 'hsla(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsla(var(--card))',
        foreground: 'hsla(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
})
