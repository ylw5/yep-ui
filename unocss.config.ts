import {
  defineConfig,
  toEscapedSelector as e,
  presetUno,
} from 'unocss'
import { presetIcons } from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  theme: {
    colors: {
      brand: {
        primary: 'blue-500',
        success: 'green-500',
        warning: 'yellow-500',
        danger: 'red-500',
        info: 'gray-500',
      },

    },
    padding: {
      '1/2': '50%',
    },
    margin: {
      '1/2': '50%',
    },

  },
  safelist: [
    'text-btn-primary',
    'text-btn-default',
  ],
  shortcuts: [
    // btn
    {
      btn: 'm-0 leading-none text-gray-700 py-0 px-4 rounded-1 bg-transparent h-9 outline-none relative z-auto border-gray-200 border-solid border-1 inline-flex flex-nowrap flex-shrink-0 items-center justify-center select-none text-center cursor-pointer decoration-none transition',
    },
    [/^btn-(.*)$/, ([,name], { theme }) => {
      // console.log(theme.colors[name])
      const brands = ['primary', 'success', 'warning', 'danger', 'info']
      if (brands.includes(name))
        return `bg-${theme.colors.brand[name]} text-white hover:bg-${theme.colors[name]}/80`
      else if (name === 'link')
        return 'bg-transparent text-blue border-none hover:opacity-70'

      else if (name === 'text')
        return 'bg-transparent color-current border-1 border-transparent hover:bg-gray-200'
    }],
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
  },
})
