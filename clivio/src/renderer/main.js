import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import { Table, Input, Upload, Field, Button} from 'buefy'
import 'buefy/dist/buefy.css'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

Vue.use(Table)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Field)
Vue.use(Button)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')


