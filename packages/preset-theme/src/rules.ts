import type { Preset } from '@unocss/core'
const rules: Preset['rules'] = [
  // arrow
  // [/^(.*)-arrow$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
  //   const selector = e(rawSelector)
  //   return `
  //     ${selector},
  //     ${selector}::before {
  //       position: absolute;
  //       background: inherit;
  //     }
  //     ${selector} {
  //       visibility: hidden;
  //     }
  //     ${selector}::before {
  //       content: '';
  //       visibility: visible;
  //       width: inherit;
  //       height: inherit;
  //       transform: rotate(45deg);
  //       border: inherit;
  //       border-radius: inherit;
  //     }
  //   `
  // }, {
  //   layer: 'components',
  // }],
  // [/^popper-panel$/, ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
  //   const selector = e(rawSelector)
  //   return `
  //     ${selector},
  //     ${selector} > [data-popper-arrow],
  //     ${selector} > [data-popper-arrow]::before {
  //       visibility: hidden;
  //     }

  //     ${selector}[data-show],
  //     ${selector}[data-show] > [data-popper-arrow]::before {
  //       visibility:visible;
  //     }
  //   `
  // }, {
  //   layer: 'components',
  // }],

]

export default rules
