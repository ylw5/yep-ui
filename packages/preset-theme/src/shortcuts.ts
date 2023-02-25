import type { Preset, StaticShortcutMap } from '@unocss/core'
const shortcuts: Exclude<Preset['shortcuts'], undefined | StaticShortcutMap> = [
  [/^solid-(.*)$/, ([,c]) => `bg-${c} border-${c}`],
  // btn
  {
    // 'btn-primary': 'solid-primary text-white hover:solid-primary:75 active:solid-primary-500 focus:text-red focus:solid-primary:75',
    'btn-primary': 'solid-primary text-white hover:solid-primary:75 focus:text-red focus:solid-primary:75',
    // FIXME: 这里的active时的深色没有使用info
    'btn-info': 'solid-info text-white hover:solid-info:75 active:solid-gray-500 focus:text-white focus:solid-info:75',
    'btn-success': 'solid-success text-white hover:solid-success:75 active:solid-green-500 focus:text-white focus:solid-success:75',
    'btn-warning': 'solid-warning text-white hover:solid-warning:75 active:solid-yellow-500 focus:text-white focus:solid-warning:75',
    'btn-danger': 'solid-danger text-white hover:solid-danger:75 active:solid-red-500 focus:text-white focus:solid-danger:75',
    'btn': `m-0
          leading-none text-gray-700 text-center text-sm
          py-0 px-4
          rounded-1 outline-0 border-gray-300 border-solid border-1
          bg-transparent h-10  relative z-auto
          inline-flex flex-nowrap flex-shrink-0 items-center justify-center
          select-none
          decoration-none
          cursor-pointer
          transition
          active:color-primary active:border-primary
          focus:color-primary focus:border-primary focus:shadow-none
        `,
  },
  // checkbox
  { checkbox: 'cursor-pointer inline-flex justify-center items-center gap-2 mr-1' },
  { indicator: 'w-[1em] h-[1em] inline-flex justify-center items-center border-border border-solid border-1 text-sm box-border rounded-sm text-white data-checked:(bg-primary border-primary)' },
  [/^indicator-(.*)$/, ([,c]) => `data-checked:solid-${c}`],
]
export default shortcuts
