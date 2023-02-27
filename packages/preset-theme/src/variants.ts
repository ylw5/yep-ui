import type { Preset } from '@unocss/core'

const variants: Preset['variants'] = [
  // (macher) => {
  //   if (!macher.startsWith('focus:'))
  //     return macher
  //   return {
  //     matcher: macher.replace('focus:', ''),
  //     selector: s => `${s}:focus,${s}[data-state~='focus'] `,
  //   }
  // },
]
export default variants
