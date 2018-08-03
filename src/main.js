import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/cs.js'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import './filters.js'
import { sync } from 'vuex-router-sync'

import Framework7 from 'framework7'
import Sortable from 'framework7/components/sortable/sortable.js'
import Tabs from 'framework7/components/tabs/tabs.js'

import 'framework7-icons'

moment.locale('cs')
sync(store, router)
Vue.config.productionTip = false
Framework7.use([ Sortable, Tabs ])

window.vueApp = new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    window.f7 = new Framework7({
      root: '#app',
      clicks: {
        externalLinks: '*',
      }
    })
  }
}).$mount('#app')
