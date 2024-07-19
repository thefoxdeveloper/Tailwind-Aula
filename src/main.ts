import './assets/main.css'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { type PluginOptions } from 'vue-toastification'

const app = createApp(App)
const options: PluginOptions = {}
app.use(router)

app.mount('#app')
app.use(Toast, options)
