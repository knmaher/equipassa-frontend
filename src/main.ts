import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUiStore } from './stores/ui'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
useUiStore()
app.use(router)
app.use(i18n)

app.mount('#app')
