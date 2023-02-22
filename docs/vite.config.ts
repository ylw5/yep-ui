import path from 'path'
import { defineConfig } from 'vite'
import { presetThemeDefault } from '@yep-ui/preset-theme'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'
// console.log(`${path.resolve(__dirname, '../packages/yep-ui')}`)
export default defineConfig({
  resolve: {
    alias: {
      'yep-ui': `${path.resolve(__dirname, '../packages/yep-ui')}}`,
      '@yep-ui/components': `${path.resolve(__dirname, '../packages/components')}}`,
    },
  },
  plugins: [
    Inspect(),
    Unocss({
      presets: [
        presetThemeDefault(),
        presetUno(),
        presetIcons({

          // cdn: 'https://esm.sh/',
          scale: 1.2,
          unit: 'em',
          extraProperties: {
            'display': 'inline-block',
            'vertival-align': 'middle',
          },
        }),
      ],
    }),
    Components({
      dirs: ['./story'],
      allowOverrides: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
})
