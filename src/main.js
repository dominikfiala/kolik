import Vue from 'vue'
import moment from 'moment'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import App from './App.vue'
import router from './router/index.js'
import store from './vuex/store.js'
import { sync } from 'vuex-router-sync'

viewportUnitsBuggyfill.init()
Vue.config.productionTip = false
sync(store, router)

Vue.filter('datetime', function (date) {
  return moment(date).format('ddd D. MMMM HH:mm')
})
Vue.filter('period', function (period) {
  if (period === 'day') return 'denně'
  else if (period === 'week') return 'týdně'
  else if (period === 'month') return 'měsíčně'
  else if (period === 'quarter') return 'čtvrtletně'
  else if (period === 'year') return 'ročně'
  return 'měřené období'
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.body.addEventListener('touchmove', function(event) {
      event.preventDefault()
    }, { passive: false })
  }
}).$mount('#app')

// unsync()
