<template>
  <div class="view">
    <div class="page">
      <app-navbar>
        <router-link v-if="metrics.length" slot="right" to="/records-edit/0" class="link">Přidat zpětně</router-link>
      </app-navbar>

      <app-toolbar></app-toolbar>

      <empty-page v-if="metrics.length === 0">
        <p>Zatím nemáš založenou<br>žádnou počítanou jednotku.</p>
        <router-link to="/metrics-edit/0">Přidat jednotku</router-link>
      </empty-page>

      <div v-if="metrics.length" class="page-content">
        <div class="block-title">
          Zaznamenej jednotku klepnutím
        </div>
        <div class="list media-list">
          <ul>
            <li v-for="metric in metrics" v-bind:key="metric.metric.id">
              <div v-on:click="iterate(metric.metric.id)" class="item-content">
                <div class="item-media margin-vertical">{{ metric.metric.emoji }}</div>
                <div class="item-inner display-flex">
                  <div class="">
                    <div class="item-title-row">
                      <div class="item-title">{{ metric.metric.name|trim }}</div>
                    </div>
                    <div class="item-subtitle">
                      <span v-if="metric.stats.latest">
                        Naposledy {{ metric.stats.latest|fromnow }}
                      </span>
                      <span v-else>
                        Zatím nezapočítáno
                      </span>
                    </div>
                    <div class="item-text">
                      Měřeno {{ metric.metric.period|period }}
                    </div>
                  </div>
                  <div class="">
                    <span class="badge color-blue metric-total">{{ metric.stats.total }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import AppToolbar from '../components/AppToolbar.vue'
import AppNavbar from '../components/AppNavbar.vue'
import EmptyPage from '../components/EmptyPage.vue'

export default {
  name: 'HomePage',
  computed: {
    metrics() {
      const metrics = this.$store.state.metrics.metrics.reduce((accumulator, metric) => {
        accumulator[metric.id] = {
          metric: metric,
          stats: {
            total: 0,
            latest: null
          },
        }
        return accumulator
      }, {})

      this.$store.state.records.records.map(record => {
        let metric = metrics[record.metric]
        let recordMoment = new moment(record.time)
        let metricStart = new moment().startOf(metric.metric.period)
        if (recordMoment.isAfter(metricStart)) {
          let stats = metric.stats
          stats.total++
          if (!stats.latest) {
            stats.latest = record.time
          }
        }
      })

      return Object.values(metrics)
    }
  },
  methods: {
    iterate(metricId) {
      this.$store.commit('records/SAVE', {
        metric: metricId,
        time: Date.now()
      })
    }
  },
  components: {
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>

<style>
.metric-total {
  zoom: 1.25;
}
</style>
