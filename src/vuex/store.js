/* eslint-disable no-console */

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    metrics: [],
    records: []
  },
  mutations: {
    saveMetric(state, metric) {
      if (metric.id) {
        var index = state.metrics.findIndex(item => item.id === metric.id)
        Vue.set(state.metrics, index, metric)
      }
      else {
        metric.id = Date.now()
        state.metrics.push(metric)
      }
    },
    deleteMetric(state, metricId) {
      state.records = state.records.filter(item => item.metric !== metricId)
      state.metrics = state.metrics.filter(item => item.id !== metricId)
    },
    resetMetric(state, metricId) {
      state.records = state.records.filter(item => item.metric !== metricId)
    },
    iterate(state, metricId) {
      var record = {
        metric: metricId,
        time: Date.now(),
        location: null
      }

      var metric = state.metrics.find(item => item.id === metricId)
      if (metric.location && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          location => {
            record.location = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            state.records.push(record)
          },
          error => {
            console.error(error)
            state.records.push(record)
          }
        )
      }
      else {
        state.records.push(record)
      }
    }
  },
  plugins: [createPersistedState()]
})
