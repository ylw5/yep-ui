import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import { YepResolver } from 'yep-ui'
// console.log(YepResolver)
export default defineConfig({
  resolve: {
    alias: {
      'yep-ui': path.resolve(__dirname, '../packages/yep-ui/src/index.ts'),
    },
  },
  server: {
    port: 3002,
    origin: 'http://127.0.0.1:3002',
  },
  plugins: [
    Inspect(),
    Unocss(),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        {
          'yep-ui': ['Dialog', 'Checkbox', 'Input', 'Switch', 'RadioGroup', 'Collapse', 'Select'],
        },
      ],
      cache: true,
    }),
    Components({
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
      extensions: ['vue'],
    }),
  ],
  ssr: { noExternal: ['yep-ui'] },
})
