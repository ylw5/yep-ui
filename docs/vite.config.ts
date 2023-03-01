// import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import { YepResolver } from 'yep-ui'
// console.log(YepResolver)

export default defineConfig({
  resolve: {
    // alias: {path
    //   'yep-ui': `${path.resolve(__dirname, '../packages/yep-ui/src/index')} `,
    // },
  },
  plugins: [
    Inspect(),
    Unocss(),
    AutoImport({
      dts: true,
      vueTemplate: true,
      imports: [
        'vue',
        {
          'yep-ui': ['Dialog', 'Checkbox', 'Input', 'Switch', 'RadioGroup'],
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
    }),
  ],
})
