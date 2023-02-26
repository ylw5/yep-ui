import type { Preset, StaticShortcutMap } from '@unocss/core'
const shortcuts: Exclude<Preset['shortcuts'], undefined | StaticShortcutMap> = [
  [/^solid-(.*)$/, ([,c]) => `bg-${c} border-${c}`],
  // btn
  {
    'btn-primary': 'solid-primary text-white hover:solid-primary:75 active:solid-primary-900 focus:solid-primary:75 ',
    'btn-success': 'solid-success text-white hover:solid-success:75 active:solid-green-800 focus:solid-success:75',
    'btn-warning': 'solid-warning text-white hover:solid-warning:75 active:solid-yellow-800 focus:solid-warning:75',
    'btn-danger': 'solid-danger text-white hover:solid-danger:75 active:solid-red-800 focus:solid-danger:75',
    'btn': `m-0
          leading-none text-center text-sm
          text-white bg-gray-700
          py-0 px-4
          h-9
          solid-gray-500 border-1 rounded-1 outline-0 
          relative z-auto
          inline-flex flex-nowrap flex-shrink-0 items-center justify-center
          select-none
          decoration-none
          cursor-pointer
          transition
          hover:solid-gray-600
          active:solid-[#1f1f1f]
          focus:solid-gray-600
        `,
  },
  // checkbox
  { checkbox: 'cursor-pointer inline-flex justify-center items-center gap-2 mr-1 data-disabled:(cursor-not-allowed opacity-60)' },
  // TODO: checkbox-${color}
  { indicator: 'w-1em h-1em inline-flex justify-center items-center border-border border-solid border-1 text-sm box-border rounded-sm text-white data-checked:(bg-primary border-primary)' },
  [/^indicator-(.*)$/, ([,c]) => `data-checked:solid-${c}`],
]
export default shortcuts
