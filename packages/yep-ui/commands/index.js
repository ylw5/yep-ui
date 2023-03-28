import { Command } from 'commander'
import { buildComponents } from './build.js'
import { release } from './release.js'

const program = new Command()
program
  .command('build')
  .description('打包组件')
  .action(buildComponents)

program
  .command('release')
  .option('-v, --version <version>', '版本号')
  .description('发布npm包')
  .action(release)

program.parse(process.argv)
