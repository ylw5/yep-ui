import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import { TooltipDirection } from 'yep-ui'
import Demo from '../../components/Demo.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    const { app } = ctx
    const demos = import.meta.glob('../../story/**/*.vue', {
      eager: true,
    })

    for (const path in demos) {
      const components = path.split('/').at(-2)
      const example = path?.split('/')?.at(-1)?.split('.').at(0)
      const name = components?.concat(example)

      app.component(name, demos[path].default)
    }

    // for (const path in demos) {
    //   const name = path.split('/').at(-3).concat(path.split('/').at(-1).split('.').at(0))
    //   // console.log(path, demos[path].default)
    //   // console.log(name)

    //   app.component(name, demos[path].default)
    // }

    app.component('Demo', Demo)
    app.directive('tooltip', TooltipDirection)
  },
}
