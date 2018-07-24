<template>
  <div class="page">
    <app-titlebar>
      <span slot="middle">Jednotky</span>
      <router-link slot="right" to="/metrics-edit/0" tag="span" class="text-primary">Nová</router-link>
    </app-titlebar>

    <empty-page v-if="metrics.length === 0">
      <p>Zatím nemáš založenou<br>žádnou počítanou jednotku.</p>
      <router-link to="/metrics-edit/0" class="p-4 text-primary" tag="span">Přidat jednotku</router-link>
    </empty-page>

    <div v-if="metrics.length" class="page-content bg-white">
      <ul
        v-if="metrics.length"
        class="list-group list-group-flush border-bottom"
      >
        <router-link
          v-for="metric in metrics"
          v-bind:to="`/metrics/${metric.id}`"
          v-bind:key="metric.id"
          v-on:click="iterate(metric.id)"
          class="list-group-item d-flex justify-content-between align-items-center no-color"
          tag="span"
        >
          <span class="vertical-top">
            <span class="lead mt-1">{{ metric.emoji }}&ensp;</span>
            <span class="align-text-bottom">{{ metric.name }}</span>
          </span>
          <i class="icon ion-ios-arrow-forward"></i>
        </router-link>
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
  name: 'MetricsPage',
  methods: {
    editMetric(metric) {
      this.$store.commit('setEditedMetric', {
        id: metric.id,
        icon: metric.icon,
        name: metric.name,
      })
      this.showEditModal = true
    }
  },
  computed: {
    metrics() {
      return this.$store.state.metrics
    }
  },
  components: {
    AppNavigation,
    AppTitlebar,
    EmptyPage,
  }
}
</script>

<style media="screen">
  .empty {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  select {
    height: 35px;
    background-color: #fff;
    padding-top: 0;
    padding-bottom: 0;
  }
  .metric-icon {
    transform: scale(1.25)
  }
</style>
