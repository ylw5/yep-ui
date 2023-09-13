import path from 'path'
import fetch from 'node-fetch'
import type { z } from 'zod'
import type { Config } from '../get-config'
import { handleError } from '../handle-error'
import type { registryItemWithContentSchema } from './schema'
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryWithContentSchema,
} from './schema'

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? ''

export async function getRegistryBaseColor(baseColor: string) {
  try {
    const [result] = await fetchRegistry([`colors/${baseColor}.json`])

    return registryBaseColorSchema.parse(result)
  }
  catch (error) {
    throw new Error('Failed to fetch base color from registry.')
  }
}

async function fetchRegistry(paths: string[]) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${baseUrl}/registry/${path}`)
        return await response.json()
      }),
    )

    return results
  }
  catch (error) {
    handleError(error)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`)
  }
}

export async function getRegistryIndex() {
  try {
    const [result] = await fetchRegistry(['index.json'])
    return registryIndexSchema.parse(result)
  }
  catch (error) {
    throw new Error('Failed to fetch components registry.')
  }
}

export async function resolveTree(
  index: z.infer<typeof registryIndexSchema>,
  names: string[],
) {
  const tree: z.infer<typeof registryIndexSchema> = []

  for (const name of names) {
    const entry = index.find(entry => entry.name === name)

    if (!entry)
      continue

    tree.push(entry)

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies)
      tree.push(...dependencies)
    }
  }

  return tree
}

export async function fetchTree(
  style: string,
  tree: z.infer<typeof registryIndexSchema>,
) {
  try {
    const paths = tree.map(item => `styles/${style}/${item.name}.json`)
    const result = await fetchRegistry(paths)

    return registryWithContentSchema.parse(result)
  }
  catch (error) {
    throw new Error('Failed to fetch tree from registry.')
  }
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<z.infer<typeof registryItemWithContentSchema>, 'type'>,
) {
  const [parent, type] = item.type.split(':')
  if (!(parent in config.resolvedPaths))
    return null

  return path.join(
    config.resolvedPaths[parent],
    type,
  )
}
