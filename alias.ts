import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export const alias: Record<string, string> = {
  '@yep-ui/components': r('./packages/components'),
  '@yep-ui/hooks': r('./packages/hooks'),
  '@yep-ui/utils': r('./packages/utils'),
  '@yep-ui/tokens': r('./packages/tokens'),
  '@yep-ui/preset-theme': r('./packages/preset-theme'),
  'yep-ui': r('./packages/yep-ui'),

}
