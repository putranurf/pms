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

import swal from 'sweetalert2/dist/sweetalert2.js'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';

Vue.use(Vuetify)
Vue.config.productionTip = false
// Vue.use(VueRouter)

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


new Vue({
  // store,
  swal,
  router,
  render: h => h(App),
}).$mount('#app')
