import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './../views/Home.vue'
import MetricsPage from './../views/Metrics.vue'
import MetricPage from './../views/Metric.vue'
import MetricsEditPage from './../views/MetricsEdit.vue'
import RecordsEditPage from './../views/RecordsEdit.vue'
import TimelinePage from './../views/Timeline.vue'
import NotFoundPage from './../views/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      title: 'Záznam',
      component: HomePage,
      meta: {
        base: '/',
        icon: 'ion-add'
      }
    },
    {
      path: '/metrics',
      name: 'metrics',
      title: 'Jednotky',
      component: MetricsPage,
      meta: {
        base: '/metrics',
        icon: 'ion-list'
      }
    },
    {
      path: '/timeline',
      name: 'timeline',
      title: 'Časová osa',
      component: TimelinePage,
      meta: {
        base: '/timeline',
        icon: 'ion-time'
      }
    },
    {
      path: '/metrics/:id',
      name: 'metric',
      component: MetricPage
    },
    {
      path: '/metrics-edit/:id?',
      name: 'metrics-edit',
      component: MetricsEditPage
    },
    {
      path: '/records-edit/:id?',
      name: 'records-edit',
      component: RecordsEditPage
    },
    {
      path: '*',
      name: '404',
      component: NotFoundPage
    }
  ]
})
