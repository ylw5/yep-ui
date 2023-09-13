import * as z from 'zod'
export const registryBaseColorSchema = z.object({
  inlineColors: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  cssVars: z.object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  }),
  inlineColorsTemplate: z.string(),
  cssVarsTemplate: z.string(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  type: z.enum(['components:ui']),
})

export const registryIndexSchema = z.array(registryItemSchema)

export const registryItemWithContentSchema = registryItemSchema.extend({
  files: z.array(
    z.object({
      name: z.string(),
      content: z.string(),
    }),
  ),
})

export const registryWithContentSchema = z.array(registryItemWithContentSchema)
