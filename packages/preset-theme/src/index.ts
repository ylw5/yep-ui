import fs from 'fs/promises'
import path from 'path'
import type { Preset } from '@unocss/core'
import rules from './rules'
import shortcuts from './shortcuts'
import variants from './variants'
// TODO: give option for user to customize theme
export function presetThemeDefault(options = {}): Preset {
  return {
    name: '@yep-ui/preset-theme',
    theme: {
      animation: {
        keyframes: {
          // popover: '{from{opacity:0}to{opacity:100}}',
        },
      },
      data: {
        checked: 'state~="checked"',
        active: 'state~="active"',
        disabled: 'state~="disabled"',
        open: 'state~="open"',
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
    shortcuts,
    rules,
    variants,

    layers: {
      components: -1,
      default: 1,
      utilities: 2,
    },
    preflights: [
      {
        layer: 'default',
        getCSS: async () => {
          return await fs.readFile(path.resolve(__dirname, '../style.css'), {
            encoding: 'utf-8',
          })
        },
      },
    ],
  }
}
