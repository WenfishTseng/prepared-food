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
// 匯入 vee-validate 主套件
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
// 匯入 vee-validate 相關規則
import { required, email, min, max } from '@vee-validate/rules'
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// swiper
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// Styles must use direct files imports
import 'swiper/swiper.scss'
// wow
import 'animate.css'
// import WOW from 'wowjs'
// aos
import 'aos/dist/aos.css'

import { date } from './methods/filters'
import App from './App.vue'
import router from './router'

// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW })
})
// 設定預設語系
setLocale('zh_TW')
// const app = createApp(App).use(router)
const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.config.globalProperties.$filters = { date }
app.component('headroom', headroom)
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Swiper', Swiper)
app.component('SwiperSlide', SwiperSlide)
app.mount('#app')
// new WOW({ live: false }).init()
