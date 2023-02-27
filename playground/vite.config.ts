import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
// import { YepResolver } from 'yep-ui'
// FIXME: can't import packages/yep-ui in vite.config.ts
// console.log(YepResolver)

export default defineConfig({
  // base: '/playground/',
  resolve: {
    alias: {
      'yep-ui': '../packages/yep-ui/src/index.ts',
    },
  },
  plugins: [
    vue(),
    Unocss(),
    Inspect(),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        {
          'yep-ui': ['Dialog', 'Checkbox', 'Popper', 'Input'],
        },
      ],
      cache: true,
    }),
    Components({
      dts: true,
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
      ],
    }),
  ],
})
