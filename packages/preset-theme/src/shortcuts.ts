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
          solid-gray-500 border-1 border-none rounded-1 outline-0 
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
    'btn-text': 'm-0 p-initial h-initial w-initial border-0 rounded-initial bg-transparent z-auto text-center decoration-none text-initial hover:(text-primary bg-transparent) focus:(bg-transparent text-primary) active:(text-primary-800 bg-transparent) focus-visible:outline-none',
  },
  // input
  { input: 'transition w-full flex-grow-1 h-8 px-3 outline-0 px-3 bg-none bg-input-bg box-border b b-solid b-border rounded-sm text-input-text hover:(ring-1 ring-primary) focus:(ring-1 ring-primary)' },
  {
    inputgroup: `
      px-3 inline-flex flex-grow-1 w-full items-center justify-center bg-input-bg bg-none b b-solid b-border rounded-sm transform-gpu hover:(ring-1 ring-primary) data-focus:(ring-1 ring-primary) transition
      [&>input]:(border-0 w-full flex-grow-1 h-8 p-0 bg-none outline-0 bg-input-bg box-border rounded-sm text-input-text)
    `,
  },
  [/^input-(.*)$/, ([,c]) => `border-${c} focus:(ring-${c})`],
  { 'input-xs': 'h-4 px-1 text-xs' },
  { 'input-sm': 'h-6 px-2 text-sm' },
  { 'input-md': 'h-8 px-3 text-base' },
  { 'input-lg': 'h-10 px-4 text-lg' },
  { 'input-ghost': 'bg-transparent border-0' },
  // checkbox
  { checkbox: 'cursor-pointer inline-flex justify-center items-center gap-2 mr-1 data-disabled:(cursor-not-allowed opacity-60)' },
  // TODO: checkbox-${color}
  { indicator: 'w-1em h-1em inline-flex justify-center items-center border-border border-solid border-1 text-sm box-border rounded-sm text-white data-checked:(bg-primary border-primary)' },
  [/^indicator-(.*)$/, ([,c]) => `data-checked:solid-${c}`],
]
export default shortcuts
