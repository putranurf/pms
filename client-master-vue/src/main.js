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
import moment from 'moment'
import JsonExcel from 'vue-json-excel'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

 

Vue.use(Vuetify)
Vue.config.productionTip = false
// Vue.use(VueRouter)

 
Vue.use(VuetifyDialog, {
  context: {
    Vuetify
  }
})

Vue.component('downloadExcel', JsonExcel)
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD hh:mm')
  }
});


new Vue({
  // store,
  swal,
  router,
  render: h => h(App),
}).$mount('#app')
