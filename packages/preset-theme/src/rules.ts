import { toEscapedSelector as e } from '@unocss/core'
import type { Preset } from '@unocss/core'

const rules: Preset['rules'] = [
  // arrow
  [/^panel-arrow$/, ([, ,], { rawSelector }) => {
    const selector = e(rawSelector)
    return `
      ${selector},
      ${selector}::before {
        position: absolute;
        background: inherit;
      }
      ${selector} {
        visibility: hidden;
        width: .5rem;
        height: .5rem;
        border: 1px solid var(--y-border-color);
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
  [/^popper-panel$/, ([,,], { rawSelector }) => {
    const selector = e(rawSelector)
    return `
      ${selector} {
        padding: 0.75rem;
        z-index: 100;
        font-size: 0.875rem;
        line-height: 1.25rem;
        min-width: 150px;
        border: 1px solid var(--y-border-color);
        background: var(--y-bg-overlay);
        shadow: var(--y-box-shadow-light);
        border-radius: 4px;
        text-align: justify;
        word-break: break-all;
        box-sizing: border-box;
      }

      ${selector},
      ${selector} > [data-popper-arrow],
      ${selector} > [data-popper-arrow]::before {
        visibility: hidden;
      }

      ${selector}[data-show],
      ${selector}[data-show] > [data-popper-arrow]::before {
        visibility:visible;
      }

      ${selector}[data-popper-placement^=bottom] > [data-popper-arrow]::before {
        border-bottom-color: transparent!important;
        border-right-color: transparent!important;
      }

      ${selector}[data-popper-placement^=top] > [data-popper-arrow]::before {
        border-top-color: transparent!important;
        border-left-color: transparent!important;
      }
    `
  }, {
    layer: 'components',
  }],

]

export default rules
