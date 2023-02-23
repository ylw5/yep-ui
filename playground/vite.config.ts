import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
// import presetIcons from '@unocss/preset-icons/browser'
import presetThemeDefault from '@yep-ui/preset-theme'
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [
        transformerVariantGroup(),
      ],
      theme: {
        data: {
          checked: 'state~="checked"',
          active: 'state~="active"',
          disabled: 'state~="disabled"',
          open: 'state~="open"',
        },
      },
      presets: [
        presetThemeDefault(),
        presetUno(),
        presetAttributify(),
        presetIcons({
          cdn: 'https://esm.sh/',
          scale: 1.2,
          extraProperties: {
            'vertical-align': 'middle',
            'display': 'inline-block',
          },
        }),
      ],
      shortcuts: [

      ],
    }),
  ],
})
