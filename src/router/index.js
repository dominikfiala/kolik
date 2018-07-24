import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './../views/Home.vue'
import MetricsPage from './../views/Metrics.vue'
import MetricPage from './../views/Metric.vue'
import MetricsEditPage from './../views/MetricsEdit.vue'

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
        icon: 'ion-md-add'
      }
    },
    {
      path: '/metrics',
      name: 'metrics',
      title: 'Jednotky',
      component: MetricsPage,
      meta: {
        base: '/metrics',
        icon: 'ion-ios-list'
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
    }
  ]
})
