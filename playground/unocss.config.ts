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
        'vertical-align': 'middle',
        'display': 'inline-block',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
