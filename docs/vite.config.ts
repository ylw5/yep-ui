import path from 'path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
export default defineConfig({
  resolve: {
    alias: {
      'yep-ui': `${path.resolve(__dirname, '../packages/components/index.ts')}}`,
    },
  },
  plugins: [
    Components({
      dirs: [' D:/projects/yep-ui/packages/yep-ui'],
      allowOverrides: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Inspect(),
    Unocss(),
  ],
})
