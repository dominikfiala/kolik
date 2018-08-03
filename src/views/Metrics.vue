<template>
  <div class="view">
    <!-- Initial Page, "data-name" contains page name -->
    <div class="page">
      <app-navbar>
        <a slot="left" v-on:click="toggleSort" class="link">
          <span v-show="sortEnabled && metrics.length > 1">Hotovo</span>
          <span v-show="!sortEnabled && metrics.length > 1">Řadit</span>
        </a>
        <router-link slot="right" to="/metrics-edit/0" class="link">Přidat</router-link>
      </app-navbar>

      <app-toolbar></app-toolbar>

      <empty-page v-if="metrics.length === 0">
        <p>Zatím nemáš založenou<br>žádnou počítanou jednotku.</p>
        <router-link to="/metrics-edit/0">Přidat jednotku</router-link>
      </empty-page>

      <div v-if="metrics.length" class="page-content">
        <div class="block-title">
          Zobraz více voleb klepnutím
        </div>
        <div class="list sortable">
          <ul>
            <li v-for="metric in metrics"  v-bind:key="metric.id" v-on:sortable:sort="sort">
              <router-link v-bind:to="`/metrics/${metric.id}`" class="item-link item-content">
                <div class="item-media">{{ metric.emoji }}</div>
                <div class="item-inner">{{ metric.name }}</div>
              </router-link>
              <div class="sortable-handler"></div>
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
  data: function() {
    return {
      sortEnabled: false
    }
  },
  methods: {
    sort(event) {
      if (event.detail.from !== event.detail.to) {
        this.$store.commit('metrics/SWAP', {
          from: event.detail.from,
          to: event.detail.to,
        })
      }
    },
    toggleSort() {
      this.sortEnabled = !this.sortEnabled
      window.f7.sortable.toggle()
    }
  },
  computed: {
    metrics() {
      return this.$store.state.metrics.metrics
    }
  },
  components: {
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>
