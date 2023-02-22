import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
// import presetIcons from '@unocss/preset-icons/browser'
import { presetThemeDefault } from '@yep-ui/preset-theme'
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      transformers: [
        transformerVariantGroup(),
      ],
      theme: {
        data: {
          checked: 'state~="checked"',
          active: 'state~="active"',
          disabled: 'state~="disabled"',
        },
      },
      presets: [
        presetThemeDefault(),
        presetUno(),
        presetAttributify(),
        presetIcons({
          cdn: 'https://esm.sh/',
          scale: 1.2,
          extraProperties: {
            'vertical-align': 'middle',
            'display': 'inline-block',
          },
        }),
      ],
      shortcuts: [
        { checkbox: 'w-5 h-5 m-0 cursor-pointer appearance-none rounded-sm b-1 b-solid border-border' },
        { indicator: 'w-5 h-5 inline-flex justify-center items-center border-border border-solid border-1 rounded-sm text-white data-checked:(bg-primary border-primary)' },
        // FIXME: wait bug fix (shortcuts order wrong)
        [/^indicator-(.*)/, ([,c]) => `data-checked:bg-${c} data-checked:border-${c}`],
      ],
    }),
  ],
})
