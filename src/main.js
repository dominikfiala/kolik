import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/cs.js'
// import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import App from './App.vue'
import router from './router/index.js'
import store from './vuex/store.js'
import { sync } from 'vuex-router-sync'

import Framework7 from 'framework7'
import 'framework7/css/framework7.ios.css'
import 'framework7-icons'

// viewportUnitsBuggyfill.init()
moment.locale('cs')
sync(store, router)

Vue.config.productionTip = false
Vue.filter('datetime', function (date) {
  return moment(date).format('ddd D. MMMM HH:mm')
})
Vue.filter('time', function (date) {
  return moment(date).format('HH:mm')
})
Vue.filter('date', function (date) {
  return moment(date).format('D. MMM')
})
Vue.filter('fromnow', function (date) {
  return moment(date).fromNow()
})
Vue.filter('trim', function (string, length = 24) {
  return string.length > length
    ? string.substring(0, length - 1) + '…'
    : string;
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
    window.f7 = new Framework7({
      // App root element
      root: '#app',
      clicks: {
        externalLinks: '*',
      },
      theme: 'ios'
    })
    // document.body.addEventListener('touchmove', function(event) {
    //   event.preventDefault()
    // }, { passive: false })
  }
}).$mount('#app')

// unsync()
