import { Command } from 'commander'
import { add } from './commands/add'
import { init } from './commands/init'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const program = new Command()
    .name('yep-ui-cli')
    .description('add components to your project')

  program.addCommand(init).addCommand(add)
  program.parse()
}

main()
