import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import shell from 'shelljs'
const __dirname = fileURLToPath(import.meta.url)
const outputDir = path.resolve(__dirname, '../../dist')
const generateIndexDts = async () => {
  const fileStr = 'export * from \'./types/index\''
  await fs.writeFile(path.resolve(outputDir, 'index.d.ts'), fileStr, 'utf-8')
}
const createPackageJson = async () => {
  const outputPackage = JSON.parse(
    await fs.readFile(
      new URL('../package.json', import.meta.url),
    ),
  )
  const fileStr = JSON.stringify(outputPackage, null, 2)
  await fs.writeFile(path.resolve(outputDir, 'package.json'), fileStr, 'utf-8')
}

export async function release({ version }) {
  await createPackageJson(version)
  await generateIndexDts()
  shell.cd(outputDir)
  shell.exec('npm publish')
}
