<template>
  <div class="view">
    <!-- Initial Page, "data-name" contains page name -->
    <div class="page">
      <app-navbar>
        <span slot="title">Jednotky</span>
        <router-link slot="right" to="/metrics-edit/0">Přidat</router-link>
      </app-navbar>

      <app-toolbar></app-toolbar>

      <empty-page v-if="metrics.length === 0">
        <p>Zatím nemáš založenou<br>žádnou počítanou jednotku.</p>
        <router-link to="/metrics-edit/0">Přidat jednotku</router-link>
      </empty-page>

      <div v-if="metrics.length" class="page-content">
        <div class="block-title">
          Zobraz si více voleb klepnutím
        </div>
        <div class="list">
          <ul v-for="metric in metrics"  v-bind:key="metric.id">
            <li>
              <router-link v-bind:to="`/metrics/${metric.id}`" class="item-link">
                <div class="item-content">
                  <div class="item-media">{{ metric.emoji }}</div>
                  <div class="item-inner">{{ metric.name }}</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppToolbar from '../components/AppToolbar.vue'
import AppNavbar from '../components/AppNavbar.vue'
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
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>
