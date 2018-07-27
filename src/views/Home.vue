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
      return this.$store.state.metrics
    },
    records() {
      return this.$store.state.records
    },
    stats() {
      return this.metrics.reduce((totals, metric) => {
        totals[metric.id] = this.records
          .filter(record => record.metric === metric.id)
          .length
        return totals
      }, {})
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
