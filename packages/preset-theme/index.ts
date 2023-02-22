import fs from 'fs/promises'
import path from 'path'
import { toEscapedSelector as e } from 'unocss'
import type { Preset } from 'unocss'
// TODO: give option for user to customize theme
export function presetThemeDefault(): Preset {
  return {
    name: '@yep-ui/preset-theme',
    theme: {
      animation: {
        keyframes: {
          // popover: '{from{opacity:0}to{opacity:100}}',
        },
      },
      colors: {
        primary: 'var(--y-primary)',
        success: 'var(--y-success)',
        warning: 'var(--y-warning)',
        danger: 'var(--y-danger)',
        info: 'var(--y-info)',
        default: 'var(--y-default)',

        border: 'var(--y-border-color)',

      },

      // extend: {
      //   animation: {
      //     test: 'popover 1s ease-in-out',
      //   },
      //   keyframes: {
      //     popover: {
      //       '0%': { transform: 'translate(0, -100%)' },
      //       '100%': { transform: 'none' },
      //     },
      //   },
      // },
    },
    shortcuts: [
      [/^solid-(.*)$/, ([,c]) => `bg-${c} border-${c}`],
      // btn
      {
        'test': 'focus:text-blue',
        'test-last': 'focus:text-red',
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
    ],
    rules: [

      // arrow
      [/^(.*)-arrow$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
        const selector = e(rawSelector)
        return `
          ${selector},
          ${selector}::before {
            position: absolute;
            background: inherit;
          }
          ${selector} {
            visibility: hidden;
          }
          ${selector}::before {
            content: '';
            visibility: visible;
            width: inherit;
            height: inherit;
            transform: rotate(45deg);
            border: inherit;
            border-radius: inherit;
          }    
        `
      }, {
        layer: 'components',
      }],
      [/^popper-panel$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
        const selector = e(rawSelector)
        return `
          ${selector},
          ${selector} > [data-popper-arrow],
          ${selector} > [data-popper-arrow]::before {
            visibility: hidden;
          }
  
          ${selector}[data-show],
          ${selector}[data-show] > [data-popper-arrow]::before {
            visibility:visible;
          }
        `
      }, {
        layer: 'components',
      }],

    ],
    variants: [
      // yep-active
      (matcher) => {
        if (!matcher.startsWith('yep-active:'))
          return matcher
        return {
          matcher: matcher.replace('yep-active:', ''),
          selector: s => `${s}[data-yepui-state~="active"]`,
        }
      },
      // yep-selected
      (matcher) => {
        if (!matcher.startsWith('yep-selected:'))
          return matcher
        return {
          matcher: matcher.replace('yep-selected:', ''),
          selector: s => `${s}[data-yepui-state~="selected"]`,
        }
      },
      // yep-checked
      (matcher) => {
        if (!matcher.startsWith('yep-checked:'))
          return matcher
        return {
          matcher: matcher.replace('yep-checked:', ''),
          selector: s => `${s}[data-yepui-state~="checked"]`,
        }
      },
      // yep-disabled
      (matcher) => {
        if (!matcher.startsWith('yep-disabled:'))
          return matcher
        return {
          matcher: matcher.replace('yep-disabled:', ''),
          selector: s => `${s}[data-yepui-state~="disabled"]`,
        }
      },
    ],

    layers: {
      components: -1,
      default: 1,
      utilities: 2,
    },
    preflights: [
      {
        layer: 'default',
        getCSS: async () => {
          return await fs.readFile(path.resolve(__dirname, './style.css'), {
            encoding: 'utf-8',
          })
        },
      },
    ],
  }
}
