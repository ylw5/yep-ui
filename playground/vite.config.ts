import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno, transformerVariantGroup } from 'unocss'
import { presetIcons } from 'unocss/preset-icons'
import presetThemeDefault from '@yep-ui/preset-theme'
// FIXME: can't import packages/yep-ui in vite.config.ts
// import { YepResolver } from 'yep-ui'

export default defineConfig({
  base: '/playground/',
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
    }),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        {
          'yep-ui': ['Dialog', 'Checkbox'],
        },
      ],
      cache: true,
    }),
    Components({
      dts: false,
      resolvers: [
        function resolveComponent(name: string) {
          const [component, sub] = name.split('.')
          if (component && sub) {
            return {
              name: `${component}${sub}`,
              from: 'yep-ui',
            }
          }
        },
        // FIXME: can't import packages/yep-ui in vite.config.ts
        // YepResolver(),

      ],
    }),
    Inspect(),
  ],
})
