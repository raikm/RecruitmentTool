import Vue from 'vue'
import Router from 'vue-router'
import NewStudyPage from '../pages/NewStudyPage'
import EvaluationPage from '../pages/EvaluationPage'
import DashboardPage from '../pages/DashboardPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard-page',
      component: DashboardPage,
      props: true,
      query: true
    },
    {
      path: '/newstudy',
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
