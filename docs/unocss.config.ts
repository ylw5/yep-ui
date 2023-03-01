import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
import { presetThemeDefault } from '@yep-ui/preset-theme'
export default defineConfig({
  presets: [
    presetUno(),
    presetThemeDefault(),
    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        'vertical-align': 'middle',
        'display': 'inline-block',
        'flex-shrink': '0',
        'height': '1em',
        'width': '1em',
        'backface-visibility': 'hidden',
        'color': 'currentColor',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  // configDeps: [
  //   '../packages/preset-theme/src/shortcuts.ts',
  //   '../packages/preset-theme/src/rules.ts',
  //   '../packages/preset-theme/src/variants.ts',
  //   '../packages/preset-theme/src/index.ts',
  // ],
})
