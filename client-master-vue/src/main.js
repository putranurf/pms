import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueRouter from 'vue-router'
import router from "./router"
// import store from "./store"
import VueQrcodeReader from "vue-qrcode-reader";

import swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios'
// import 'sweetalert2/src/sweetalert2.scss'


axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

Vue.use(Vuetify)
Vue.config.productionTip = false
// Vue.use(VueRouter)
Vue.use(VueQrcodeReader);


new Vue({
  // store,
  swal,
  router,
  render: h => h(App),
}).$mount('#app')
