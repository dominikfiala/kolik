/* eslint-disable no-console */

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    metrics: {
      namespaced: true,
      state: {
        metrics: []
      },
      mutations: {
        SWAP(state, sort) {
          var temp = state.metrics[sort.from];
          state.metrics[sort.from] = state.metrics[sort.to];
          state.metrics[sort.to] = temp;
        },
        SAVE(state, metric) {
          if (metric.id) {
            var index = state.metrics.findIndex(item => item.id === metric.id)
            Vue.set(state.metrics, index, metric)
          }
          else {
            metric.id = Date.now()
            state.metrics.push(metric)
          }
        },
        DELETE(state, metricId) {
          state.metrics = state.metrics.filter(item => item.id !== metricId)
        }
      }
    },
    records: {
      namespaced: true,
      state: {
        records: []
      },
      mutations: {
        DELETE(state, recordId) {
          state.records = state.records.filter(item => item.time !== recordId)
        },
        RESET(state, metricId) {
          state.records = state.records.filter(item => item.metric !== metricId)
        },
        SAVE(state, record) {
          if (record.id && record.it !== record.time) {
            state.records = state.records.filter(item => item.time !== record.id)
          }
          delete record.id
          state.records.push(record)

          state.records.sort((a, b) => b.time - a.time)
        },
      }
    }
  },
  plugins: [createPersistedState()]
})
