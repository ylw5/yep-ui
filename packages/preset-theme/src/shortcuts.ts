import type { Preset, StaticShortcutMap } from 'unocss'
const shortcuts: Exclude<Preset['shortcuts'], undefined | StaticShortcutMap> = [
  [/^solid-(.*)$/, ([,c]) => `bg-${c} border-${c}`],
  // btn
  {
    'btn-primary': `solid-primary text-white hover:solid-primary:75 active:solid-primary-900 focus:solid-primary:75 
        [&.btn-ghost]:(bg-transparent text-primary active:(border-primary-900 text-primary-900))
        [&.btn-text]:(bg-inherit text-primary active:text-primary-900)`,
    'btn-success': `solid-success text-white hover:solid-success:75 active:solid-green-800 focus:solid-success:75 
        [&.btn-ghost]:(bg-transparent text-success active:(border-green-800 text-green-800))
        [&.btn-text]:(bg-inherit text-success active:text-green-800)`,
    'btn-warning': `solid-warning text-white hover:solid-warning:75 active:solid-yellow-800 focus:solid-warning:75
        [&.btn-ghost]:(bg-transparent text-warning active:(border-yellow-800 text-yellow-800))
        [&.btn-text]:(bg-inherit text-warning active:text-yellow-800)`,
    'btn-danger': `solid-danger text-white hover:solid-danger:75 active:solid-red-800 focus:solid-danger:75 
        [&.btn-ghost]:(bg-transparent text-danger active:(border-red-800 text-red-800))
        [&.btn-text]:(bg-inherit text-danger active:text-red-800)`,
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
    'btn-text': 'm-0 p-initial h-initial w-initial border-0 outline-0 rounded-initial bg-transparent z-auto text-center decoration-none text-initial hover:(bg-transparent text-primary) focus:(bg-transparent) active:(bg-transparent text-primary-900)',
    'btn-ghost': 'bg-transparent text-current hover:(bg-inherit text-primary border-primary) b b-solid b-border focus:(bg-transparent text-primary border-primary) active:(bg-transparent border-primary)',
  },
  // input
  { input: 'transition w-full flex-grow-1 min-h-8 px-3 outline-0 px-3 bg-none bg-input-bg box-border b b-solid b-border rounded-sm text-input-text hover:(ring-1 ring-primary) focus:(ring-1 ring-primary)' },
  {
    inputgroup: `
      px-3 inline-flex flex-grow-1 w-full items-center justify-center bg-input-bg bg-none text-input-text b b-solid b-border rounded-sm transform-gpu hover:(ring-1 ring-primary) data-focus:(ring-1 ring-primary) transition
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

  // switch

  // avatar
  { avatar: 'relative inline-flex [&>div]:(block aspect-square overflow-hidden) [&_img]:(h-full w-full object-cover align-mid)' },
  { 'avatar-group': 'flex overflow-hidden [&_.avatar]:(rounded-full overflow-hidden b-2 b-solid b-gray-600)' },
  // radio
  { radio: 'shrink-0 h-6 w-6 cursor-pointer appearance-none rounded-full b-solid b-1 b-border group-data-checked:(shadow-[0_0_0_4px_var(--un-shadow-color)_inset] bg-primary) checked:(shadow-[0_0_0_4px_var(--un-shadow-color)_inset] bg-primary) shadow-white' },
  // select
  { 'select-options': 'absolute max-h-60 w-full overflow-auto rounded-md bg-overlay-bg py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-0 sm:text-sm p-1 z-999' },
  { 'select-option': 'p-1 data-active:bg-fill-light data-selected:text-primary cursor-pointer data-disabled:(cursor-not-allowed text-diabled-text) rounded-md' },
  { tag: 'inline-flex items-center justify-center gap-1 p-.9 px-2 bg-gray-200 dark:bg-gray-800 b b-solid b-border' },
]
export default shortcuts
