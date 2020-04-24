import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newstudy-page',
      component: require('../pages/NewStudyPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
