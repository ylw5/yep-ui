import path from 'path'
import { cosmiconfig } from 'cosmiconfig'
import * as z from 'zod'
import { loadConfig } from 'tsconfig-paths'
import { resolveImport } from './resolve-import'

export const DEFAULT_UNO_CSS = 'src/index.css'
export const DEFAULT_UNO_CONFIG = 'uno.config.ts'
export const DEFAULT_UNO_BASE_COLOR = 'slate'
export const DEFAULT_STYLE = 'default'
export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'

const explorer = cosmiconfig('components', {
  searchPlaces: ['components.json'],
})

export const rawConfigSchema = z
  .object({
    style: z.string().default(DEFAULT_STYLE),
    uno: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string().default('slate'),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
    }),
  })
  .strict()

export type RawConfig = z.infer<typeof rawConfigSchema>

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    unoConfig: z.string(),
    unoCss: z.string(),
    utils: z.string(),
    components: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config)
    return null

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  const tsConfig = loadConfig(cwd)

  if (tsConfig.resultType === 'failed')
    throw new Error(`Failed to load tsconfig.json. ${tsConfig.message ?? ''}`.trim())
  return configSchema.parse({
    ...config,
    resolvedPaths: {
      unoConfig: path.resolve(cwd, config.uno.config),
      unoCss: path.resolve(cwd, config.uno.css),
      utils: await resolveImport(config.aliases.utils, tsConfig),
      components: await resolveImport(config.aliases.components, tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string) {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult)
      return null

    return rawConfigSchema.parse(configResult.config)
  }
  catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
