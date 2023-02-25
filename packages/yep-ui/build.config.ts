import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    { input: 'src/index' },
    { input: 'src/components/', outDir: 'dist/components/', builder: 'mkdist' },
  ],
  declaration: true,
  clean: true,
})
