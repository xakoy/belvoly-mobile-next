import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../../web-native'
import { bootstrap } from './bootstrap'
import config from './config'

bootstrap(config.publicPath)

createApp(App)
    .use(router)
    .use(Vant)
    .mount('#app')
