import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'
import { presetThemeDefault } from '@yep-ui/preset-theme'
export default defineConfig({
  plugins: [
    Inspect(),
    Unocss({
      presets: [
        presetThemeDefault(),
        presetUno(),
        presetIcons({
          cdn: 'https://esm.sh/',
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
