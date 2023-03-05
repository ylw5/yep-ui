import { createApp } from 'vue'
import { TooltipDirection } from '../packages/yep-ui/src/components/tooltip/index'
import App from './App.vue'
import 'uno.css'

const app = createApp(App)
app.directive('tooltip', TooltipDirection)
app.mount('#app')
