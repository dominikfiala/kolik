<template>
  <div class="page">
    <app-titlebar>
      <span slot="middle">Přidat záznam</span>
    </app-titlebar>

    <empty-page v-if="metrics.length === 0">
      <p>Zatím nemáš založenou<br>žádnou počítanou jednotku.</p>
      <router-link to="/metrics-edit/0" tag="span" class="text-primary p-4">Přidat jednotku</router-link>
    </empty-page>

    <div v-if="metrics.length" class="page-content bg-white">
      <ul
        v-if="metrics.length"
        class="list-group list-group-flush border-bottom"
      >
        <li
          v-for="metric in metrics"
          v-bind:key="metric.id"
          v-on:click="iterate(metric.id)"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span class="vertical-top">
            <span class="lead mt-1">{{ metric.emoji }}&ensp;</span>
            <span class="align-text-bottom">{{ metric.name }}</span>
          </span>
          <span class="badge badge-primary badge-pill">{{ stats[metric.id] }}</span>
        </li>
      </ul>
    </div>
    <app-navigation></app-navigation>
  </div>
</template>

<script>
import AppNavigation from '../components/AppNavigation.vue'
import AppTitlebar from '../components/AppTitlebar.vue'
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
    AppNavigation,
    AppTitlebar,
    EmptyPage,
  }
}
</script>
