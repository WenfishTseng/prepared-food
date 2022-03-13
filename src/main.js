import { createApp } from 'vue'
import 'bootstrap'
import headroom from 'vue-headroom'
import axios from 'axios'
import VueAxios from 'vue-axios'
// bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.component('headroom', headroom)
app.component('Loading', Loading)
app.mount('#app')
