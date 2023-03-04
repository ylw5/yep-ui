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
        selected: 'state~="selected"',
        open: 'state~="open"',
        focus: 'state~="focus"',
      },
      colors: {
        primary: {
          DEFAULT: '#339af0',
          50: '#e7f5ff',
          100: '#d0ebff',
          200: '#a5d8ff',
          300: '#66d9e8',
          400: '#3bc9db',
          500: '#339af0',
          600: '#228be6',
          700: '#1c7ed6',
          800: '#1971c2',
          900: '#1864ab',
        },
        success: {
          DEFAULT: '#51cf66',
          50: '#ebfbee',
          100: '#d3f9d8',
          200: '#b2f2bb',
          300: '#8ce99a',
          400: '#69db7c',
          500: '#51cf66',
          600: '#40c057',
          700: '#37b24d',
          800: '#2f9e44',
          900: '#2b8a3e',
        },
        warning: {
          DEFAULT: '#faad14',
          50: '#fffbe6',
          100: '#fff1b8',
          200: '#ffe58f',
          300: '#ffd666',
          400: '#ffc53d',
          500: '#faad14',
          600: '#d48806',
          700: '#ad6800',
          800: '#874d00',
        },
        danger: {
          DEFAULT: '#f5222d',
          50: '#fff0f0',
          100: '#ffccc7',
          200: '#ffa39e',
          300: '#ff7875',
          400: '#ff4d4f',
          500: '#f5222d',
          600: '#cf1322',
          700: '#a8071a',
          800: '#820014',
          900: '#5c0011',
        },
        diabled: {
          text: 'var(--y-text-color-disabled)',
        },
        border: 'var(--y-border-color)',
        input: {
          bg: 'var(--y-input-bg)',
          text: 'var(--y-input-text)',
        },
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
