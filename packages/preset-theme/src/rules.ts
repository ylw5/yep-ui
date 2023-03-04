import { toEscapedSelector as e } from '@unocss/core'
import type { Preset } from '@unocss/core'

const rules: Preset['rules'] = [
  // mask
  ['mask', {
    '-webkit-mask-size': 'contain',
    'mask-size': 'contain',
    '-webkit-mask-repeat': 'no-repeat',
    'mask-repeat': 'no-repeat',
    'mask-position': 'center',
  }],
  [
    /^mask-(.*)$/, ([,shape]) => {
      const shapeMap = {
        hexagon: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTgyJyBoZWlnaHQ9JzIwMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNLjMgNjUuNDg2YzAtOS4xOTYgNi42ODctMjAuMDYzIDE0LjIxMS0yNS4wNzhsNjEuODYtMzUuOTQ2YzguMzYtNS4wMTYgMjAuODk5LTUuMDE2IDI5LjI1OCAwbDYxLjg2IDM1Ljk0NmM4LjM2IDUuMDE1IDE0LjIxMSAxNS44ODIgMTQuMjExIDI1LjA3OHY3MS4wNTVjMCA5LjE5Ni02LjY4NyAyMC4wNjMtMTQuMjExIDI1LjA3OWwtNjEuODYgMzUuOTQ1Yy04LjM2IDQuMTgtMjAuODk5IDQuMTgtMjkuMjU4IDBMMTQuNTEgMTYxLjYyQzYuMTUxIDE1Ny40NC4zIDE0NS43MzcuMyAxMzYuNTRWNjUuNDg2WicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==)',
        squircle: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==)',
        triangle: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTc0JyBoZWlnaHQ9JzE0OScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTg3IDE0OC40NzYtODYuNjAzLjE4NUw0My44NiA3NC40MjMgODcgMGw0My4xNCA3NC40MjMgNDMuNDYzIDc0LjIzOHonIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjwvc3ZnPg==)',
      }
      return {
        '-webkit-mask-image': shapeMap[shape],
        'mask-image': shapeMap[shape],
      }
    },
    {
      autocomplete: ['hexagon', 'squircle', 'triangle'],
    },
  ],
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
