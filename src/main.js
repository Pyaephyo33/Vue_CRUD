import './assets/main.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'

import { createApp, pushScopeId } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(plugin, defaultConfig)
app.mount('#app')
