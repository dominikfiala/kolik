<template>
  <div class="page page-with-subnavbar">
    <app-navbar>
      <span slot="title">{{ metric.emoji }}&ensp;{{ metric.name }}</span>
      <router-link slot="left" to="/metrics">Jednotky</router-link>
      <router-link slot="right" v-bind:to="`/metrics-edit/${metric.id}`">Upravit</router-link>
    </app-navbar>

    <div class="subnavbar">
      <div class="subnavbar-inner">
        <div class="segmented">
          <a v-on:click.prevent="showTab" href="#stats" class="button">Statistiky</a>
          <a v-on:click.prevent="showTab" href="#details" class="button button-active" >Detaily</a>
        </div>
      </div>
    </div>

    <div class="page-content">
      <div class="tabs">
        <div id="stats" class="tab">
          <div class="data-table card">
            <table>
              <tbody>
                <tr>
                  <td>Celkem záznamů</td>
                  <td class="text-align-right">{{ stats.total }}</td>
                </tr>
                <tr>
                  <td>Průměr</td>
                  <td class="text-align-right">{{ stats.avarage }} {{ metric.period|period }}</td>
                </tr>
                <tr>
                  <td>Počítaných dní</td>
                  <td class="text-align-right">{{ stats.days }}</td>
                </tr>
                <tr>
                  <td>Geolokace</td>
                  <td class="text-align-right">{{ metric.location ? 'zapnuto' : 'vypnuto' }}</td>
                </tr>
                <tr>
                  <td>Poslední záznam</td>
                  <td class="text-aling-right">{{ stats.latest|datetime }}</td>
                </tr>
                <tr>
                  <td>První záznam</td>
                  <td class="text-aling-right">{{ stats.oldest|datetime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="details" class="tab tab-active">
          <div class="data-table card">
            <table>
              <tbody>
                <tr>
                  <td>Název</td>
                  <td class="text-align-right">{{ metric.name }}</td>
                </tr>
                <tr>
                  <td>Emoji</td>
                  <td class="text-align-right">{{ metric.emoji }}</td>
                </tr>
                <tr>
                  <td>Měřené období</td>
                  <td class="text-align-right">{{ metric.period|period }}</td>
                </tr>
                <tr>
                  <td>Geolokace</td>
                  <td class="text-align-right">{{ metric.location ? 'zapnuto' : 'vypnuto' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <app-toolbar></app-toolbar>
  </div>
</template>

<script>
import moment from 'moment'

import AppToolbar from '../components/AppToolbar.vue'
import AppNavbar from '../components/AppNavbar.vue'
import EmptyPage from '../components/EmptyPage.vue'

export default {
  name: 'MetricPage',
  methods: {
    reset() {
      if (window.confirm('Opravdu vynulovat tuto jednotku?')) {
        this.$store.commit('resetMetric', this.id)
      }
    },
    deleteMetric() {
      if (window.confirm('Opravdu smazat tuto jednotku? Smazány budou i veškeré její záznamy.')) {
        this.$store.commit('deleteMetric', this.id)
        this.$router.push('/metrics')
      }
    },
    showTab(event) {
      const href = event.target.getAttribute('href')
      window.f7.$('.subnavbar .button').removeClass('button-active')
      window.f7.$('.tabs .tab').removeClass('tab-active')
      window.f7.$(`[href="${href}"]`).addClass('button-active')
      window.f7.$(href).addClass('tab-active')
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    metric() {
      return this.$store.state.metrics.find(item => item.id === this.id)
    },
    records() {
      return this.$store.state.records
    },
    stats() {
      const stats = {
        total: 0,
        oldest: null,
        latest: null,
        days: 0,
        avarage: 0,
      }

      this.$store.state.records
        .filter(item => item.metric === this.id)
        .map(record => {
          stats.total++
          if (record.time > stats.latest || !stats.latest) {
            stats.latest = record.time
          }
          if (record.time < stats.oldest || !stats.oldest) {
            stats.oldest = record.time
          }
        })

      const firstMoment = new moment(stats.oldest)
      const diff = moment.duration(firstMoment.diff())
      stats.days = diff.get('days') === 0 ? 1 : diff.get('days')

      let avarageRatio = 0
      if (this.metric.period === 'day') avarageRatio = 1
      else if (this.metric.period === 'week') avarageRatio = 7
      else if (this.metric.period === 'month') avarageRatio = 30
      else if (this.metric.period === 'quarter') avarageRatio = 91
      else if (this.metric.period === 'year') avarageRatio = 365
      stats.avarage = Math.round(stats.total / avarageRatio * 10) / 10

      return stats
    }
  },
  created() {
    // redirect in case the metric doesnt exist any more
    if (!this.metric) {
      this.$router.push('/')
    }
  },
  components: {
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>

<style media="screen">

</style>
