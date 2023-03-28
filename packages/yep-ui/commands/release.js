import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
// const { default: outPackage } = await import('../package.json', {
//   assert: { type: 'json' },
// })
const __dirname = fileURLToPath(import.meta.url)
const outputDir = path.resolve(__dirname, '../../dist')

// const getVersion = (version) => {
//   if (version) {
//     return version
//   }
//   else {
//     const versionNums = outPackage.version.split('.')
//     return versionNums.map((num, index) => index === versionNums.length - 1 ? num + 1 : num).join('.')
//   }
// }

const createPackageJson = async () => {
  const fileStr = JSON.stringify(outPackage, null, 2)
  fs.writeFileSync(path.resolve(outputDir, 'package.json'), fileStr, 'utf-8')
}

export function release({ version }) {
  // const versionNum = getVersion(version)
  // outPackage.version = versionNum
  createPackageJson(version)
}
