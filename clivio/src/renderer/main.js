import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import VueRouter from 'vue-router'

import store from './store'

// import { Table, Input, Upload, Field, Button, Collapse, Select} from 'buefy'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
window.axios = require('axios')



// Vue.use(Table)
// Vue.use(Input)
// Vue.use(Upload)
// Vue.use(Field)
// Vue.use(Button)
// Vue.use(Collapse)
// Vue.use(Select)

Vue.use(Buefy)

Vue.use(VueRouter)


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')


