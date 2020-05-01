import Vue from 'vue'
import Router from 'vue-router'
import NewStudyPage from '../pages/NewStudyPage'
import EvaluationPage from '../pages/EvaluationPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newstudy-page',
      component: NewStudyPage,
      props: true,
      query: true
    },
    {
      path: '/evaluation',
      name: 'evaluation-page',
      component: EvaluationPage,
      props: true,
      query: true
      
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
