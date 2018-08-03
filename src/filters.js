import Vue from 'vue'
import moment from 'moment'

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
