import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import Demo from '../../components/Demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // console.log(1)
    DefaultTheme.enhanceApp(ctx)
    const { app } = ctx
    const demos = import.meta.glob('../../../packages/components/**/story/*.vue', {
      eager: true,
    })
    for (const path in demos) {
      const name = path.split('/').at(-3).concat(path.split('/').at(-1).split('.').at(0))
      // console.log(path, demos[path].default)
      // console.log(name)

      app.component(name, demos[path].default)
    }

    app.component('Demo', Demo)
  },
}
