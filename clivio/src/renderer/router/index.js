import Vue from 'vue'
import Router from 'vue-router'
import StudyEditorPage from '../pages/StudyEditorPage'
import StudyPage from '../pages/StudyPage'
import EvaluationPage from '../pages/EvaluationPage'
import DashboardPage from '../pages/DashboardPage'
import SelectedPatientsHistoryPage from '../pages/SelectedPatientsHistoryPage'

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
      path: '/study-editor',
      name: 'study-editor-page',
      component: StudyEditorPage,
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
      path: '/study',
      name: 'study-page',
      component: StudyPage,
      props: true,
      query: true
      
    },
    {
      path: '/patientHistory',
      name: 'selected-patient-history-page',
      component: SelectedPatientsHistoryPage,
      props: true,
      query: true
      
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
