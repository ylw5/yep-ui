import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
import { presetThemeDefault } from '@yep-ui/preset-theme'
export default defineConfig({
  presets: [
    presetUno(),
    presetThemeDefault(),
    presetIcons({
      cdn: 'https://esm.sh/',
      scale: 1.2,
      extraProperties: {
        'vertical-align': 'text-top',
        'display': 'inline-block',
        'backface-visibility': 'hidden',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
  configDeps: [
    '../packages/preset-theme/src/shortcuts.ts',
    '../packages/preset-theme/src/rules.ts',
    '../packages/preset-theme/src/variants.ts',
    '../packages/preset-theme/src/index.ts',
  ],
})
