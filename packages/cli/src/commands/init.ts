import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { Command } from 'commander'
import * as z from 'zod'
import chalk from 'chalk'
import prompts from 'prompts'
import ora from 'ora'
import type { Config } from '../utils/get-config'
import { DEFAULT_COMPONENTS, DEFAULT_UNO_CONFIG, DEFAULT_UNO_CSS, DEFAULT_UTILS, getConfig, rawConfigSchema, resolveConfigPaths } from '../utils/get-config'
import { logger } from '../utils/logger'
import * as templates from '../utils/templates'
import { handleError } from '../utils/handle-error'
import { getRegistryBaseColor } from '../utils/registry/index'

const initOptionSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const init = new Command()
  .name('init')
  .description('Initialize a new project and install dependencies.')
  .option('-y, --yes', 'Skip prompts and use default values.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const options = initOptionSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        console.error(`The path ${cwd} does not exist.`)
        process.exit(1)
      }

      const existingConfig = await getConfig(cwd)
      const config = await promptForConfig(cwd, existingConfig)
      // console.log(config)
      await runInit(cwd, config)

      logger.info('')
      logger.info(
      `${chalk.green('Success!')} Project initialization completed.`,
      )
      logger.info('')
    }
    catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
) {
  const highlight = (text: string) => chalk.cyan(text)
  // const styles = ['default']
  // const baseColors = ['stake']

  const options = await prompts([
    {
      type: 'text',
      name: 'unoCss',
      message: `Where is your ${highlight('global CSS')} file?`,
      initial: defaultConfig?.uno.css ?? DEFAULT_UNO_CSS,
    },
    {
      type: 'text',
      name: 'unoConfig',
      message: `Where is your ${highlight('uno.config.js')} located?`,
      initial: defaultConfig?.uno.config ?? DEFAULT_UNO_CONFIG,
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure the import alias for ${highlight('components')}:`,
      initial: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS,
    },
    {
      type: 'text',
      name: 'utils',
      message: `Configure the import alias for ${highlight('utils')}:`,
      initial: defaultConfig?.aliases.utils ?? DEFAULT_UTILS,
    },
  ])

  const config = rawConfigSchema.parse({
    uno: {
      css: options.unoCss,
      config: options.unoConfig,
    },
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  })

  const { proceed } = await prompts({
    type: 'confirm',
    name: 'proceed',
    message: `Write configuration to ${highlight(
      'components.json',
    )}. Proceed?`,
    initial: true,
  })

  if (!proceed)
    process.exit(0)

  logger.info('')
  const spinner = ora('Writing configuration to components.json').start()
  const targetPath = path.resolve(cwd, 'components.json')
  await writeFile(targetPath, JSON.stringify(config, null, 2), 'utf-8')
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora('Initializing project...').start()

  for (const [_, resolvedPath] of Object.entries(config.resolvedPaths)) {
    const dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath
    if (!existsSync(dirname))
      await mkdir(dirname, { recursive: true })
  }

  // Write uno config
  await writeFile(
    config.resolvedPaths.unoConfig,
    templates.UNO_CONFIG_WITH_VARIABLES,
    'utf-8',
  )

  // Write css file
  const baseColor = await getRegistryBaseColor(config.uno.baseColor)
  if (baseColor) {
    await writeFile(
      config.resolvedPaths.unoCss,
      baseColor.cssVarsTemplate,
      'utf-8',
    )
  }

  spinner.succeed()
}
