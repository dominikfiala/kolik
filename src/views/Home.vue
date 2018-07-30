<template>
  <div class="view">
    <!-- Initial Page, "data-name" contains page name -->
    <div class="page">
      <app-navbar>
        <span slot="title">Nový záznam</span>
      </app-navbar>

      <empty-page v-if="metrics.length === 0">
        <p>Zatím nemáš založenou<br>žádnou počítanou jednotku.</p>
        <router-link to="/metrics-edit/0" class="">Přidat jednotku</router-link>
      </empty-page>

      <div v-if="metrics.length" class="page-content">
        <div class="list media-list">
          <ul>
            <li v-for="metric in metrics" v-bind:key="metric.metric.id">
              <div v-on:click="iterate(metric.metric.id)" class="item-content">
                <div class="item-media margin-vertical">{{ metric.metric.emoji }}</div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">{{ metric.metric.name }}</div>
                    <div class="item-after">
                      <span class="badge color-blue">{{ metric.stats.total }}</span>
                    </div>
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
              </div>
            </li>
          </ul>
        </div>
      </div>

      <app-toolbar></app-toolbar>
    </div>
  </div>
</template>

<script>
import AppToolbar from '../components/AppToolbar.vue'
import AppNavbar from '../components/AppNavbar.vue'
import EmptyPage from '../components/EmptyPage.vue'

export default {
  name: 'HomePage',
  computed: {
    metrics() {
      const metrics = this.$store.state.metrics.reduce((accumulator, metric) => {
        accumulator[metric.id] = {
          metric: metric,
          stats: {
            total: 0,
            latest: null
          },
        }
        return accumulator
      }, {})

      this.$store.state.records.map(record => {
        let stats = metrics[record.metric].stats
        stats.total++
        if (record.time > stats.latest || !stats.latest) {
          stats.latest = record.time
        }
      })

      return Object.values(metrics)
    }
  },
  methods: {
    iterate(metricId) {
      this.$store.commit('iterate', metricId)
    }
  },
  components: {
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>
