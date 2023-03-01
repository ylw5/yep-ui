import type { Preset } from '@unocss/core'

const variants: Preset['variants'] = [
  (macher) => {
    if (!macher.startsWith('group-data-checked:'))
      return macher
    return {
      matcher: macher.replace('group-data-checked:', ''),
      selector: s => `.group[data-state~=checked] ${s}, .group:checked ${s}`,
    }
  },
]
export default variants
