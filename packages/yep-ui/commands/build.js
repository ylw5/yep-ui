import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const __dirname = fileURLToPath(import.meta.url)
const entryDir = path.resolve(__dirname, '../../src/components')

const outputDir = path.resolve(__dirname, '../../dist')
const baseConfig = defineConfig({
  plugins: [vue(), vueJsx()],
  publicDir: false,
})

const rollupOptions = {
  external: ['vue'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
}

const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(entryDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd'],
        },
        outDir: path.resolve(outputDir, name),
      },
    }),
  )
}

const buildAll = async () => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'yepui',
        fileName: 'yep-ui',
        formats: ['es', 'umd'],
      },
      outDir: path.outDir,

    },
  }))
}

const createPackageJson = (name) => {
  const fileStr = `{
    "name": "@yep-ui/${name}",
    "version": "0.0.0",
    "main": "index.umd.js",
    "module": "index.js",
    "types": "../types/components/${name}/index.d.ts"
  }`

  fs.writeFile(path.resolve(outputDir, name, 'package.json'), fileStr, (err) => {
    if (err)
      console.log(err)
  })
}

export async function buildComponents() {
  await buildAll()

  const files = fs.readdirSync(entryDir)

  for (const file of files) {
    if (fs.statSync(path.resolve(entryDir, file)).isDirectory()) {
      await buildSingle(file)
      createPackageJson(file)
    }
  }
}
