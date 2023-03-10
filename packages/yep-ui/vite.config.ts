import { URL, fileURLToPath } from 'url'
import { resolve } from 'path'
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// export default defineConfig({
//   build: {
//     lib: {
//       entry: resolve(__dirname, 'src/index.ts'),
//       name: 'yep-ui',
//       fileName: 'yep-ui',
//     },
//     emptyOutDir: false,
//     rollupOptions: {
//       external: ['vue'],
//       output: {
//         globals: {
//           vue: 'Vue',
//         },
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
//   plugins: [vue()],
// })

// TODO:多入口打包，支持完整的Tree Shaking
// function componentsEntry() {
//   return readdirSync(path.resolve(__dirname, 'src/components')).reduce((entries, componentName) => {
//     if (componentName === 'index.ts')
//       return entries
//     const fullDir = path.resolve(__dirname, 'src/components', componentName, 'index.ts')
//     entries[componentName] = fullDir

//     return entries
//   }, {})
// }

export default defineConfig({
  build: {
    lib: {
      entry: {
        checkbox: resolve(__dirname, 'src/components/checkbox/index.ts'),
      },
      name: '[name]',
      fileName: '[name]/index',
    },
    emptyOutDir: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
})
