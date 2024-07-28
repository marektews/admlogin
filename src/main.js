import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import store from './vuex'
app.use(store)

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

app.mount('#app')
