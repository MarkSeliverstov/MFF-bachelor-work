import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    dark: true
  }
})
app.mount('#app')
