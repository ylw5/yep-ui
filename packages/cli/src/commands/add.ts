import path from 'path'
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { Command } from 'commander'
import * as z from 'zod'
import chalk from 'chalk'
import prompts from 'prompts'
import ora from 'ora'
import { getConfig } from '../utils/get-config'
import { logger } from '../utils/logger'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryIndex,
  resolveTree,
} from '../utils/registry'
import { handleError } from '../utils/handle-error'
const addOptionSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
  path: z.string().optional(),
})
export const add = new Command()
  .name('add')
  .description('Add a new package to the project.')
  .argument('[components...]', 'Components to add.')
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-p --path <path>', 'Path to add the component to.')
  .action(async (components, opt) => {
    try {
      const options = addOptionSchema.parse({
        components,
        ...opt,
      })

      const cwd = path.resolve(options.cwd)
      if (!existsSync(cwd)) {
        console.error(`The path ${cwd} does not exist.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${chalk.green(
            'init',
          )} to create a components.json file.`,
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex()

      let selectedComponents = options.components
      if (!selectedComponents.length) {
        const { components } = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Which component would you like to add.',
          hint: '- Space to select. Return to submit',
          instructions: false,
          choices: registryIndex.map(entry => ({
            title: entry.name,
            value: entry.name,
          })),
        })

        selectedComponents = components
      }

      if (!selectedComponents.length) {
        logger.warn('No components selected.')
        process.exit(1)
      }

      const tree = await resolveTree(registryIndex, selectedComponents)
      const payload = await fetchTree(config.style, tree)

      if (!payload.length) {
        logger.warn('No components found.')
        process.exit(0)
      }

      const spinner = ora('Installing components...').start()
      for (const item of payload) {
        spinner.text = `Installing ${item.name}...`
        const targetDir = await getItemTargetPath(
          config,
          item,
        )

        if (!targetDir)
          continue

        if (!existsSync(targetDir))
          await mkdir(targetDir, { recursive: true })

        for (const file of item.files) {
          const filePath = path.resolve(targetDir, file.name)
          await writeFile(filePath, file.content)
        }
      }
      spinner.succeed('Done.')
    }
    catch (error) {
      handleError(error)
    }
  })
