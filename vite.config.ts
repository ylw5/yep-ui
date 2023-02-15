import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
export default defineConfig({
  plugins: [
    Unocss(),
    vue(),
  ],

  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'YepUI',
      fileName: 'yep-ui',
      formats: ['es'],

    },
  },
})
