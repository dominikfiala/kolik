<template>
  <div class="page page-with-subnavbar">
    <app-navbar>
      <router-link slot="left" to="/metrics" class="link">Zpět</router-link>
      <router-link slot="right" v-bind:to="`/metrics-edit/${metric.id}`" class="link">Upravit</router-link>
    </app-navbar>

    <div class="subnavbar">
      <div class="subnavbar-inner">
        <div class="segmented">
          <a v-on:click.prevent="showTab" href="#stats" class="button tab-link tab-link-active">Statistiky</a>
          <a v-on:click.prevent="showTab" href="#records" class="button tab-link">Záznamy</a>
          <a v-on:click.prevent="showTab" href="#details" class="button tab-link">Detaily</a>
        </div>
      </div>
    </div>

    <app-toolbar></app-toolbar>

    <div class="page-content">
      <div class="tabs">
        <div id="stats" class="tab tab-active">
          <div class="block-title">{{ metric.emoji }}&ensp;{{ metric.name }} / Statistiky</div>
          <div class="list">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Celkem záznamů</div>
                    <div class="item-after text-color-black">
                      {{ stats.total }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Průměr</div>
                    <div class="item-after text-color-black">
                      {{ stats.avarage }} {{ metric.period|period }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Nejnovější</div>
                    <div class="item-after text-color-black">
                      <span v-if="stats.latest">{{ stats.latest|datetime }}</span>
                      <span v-else>&mdash;</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Nejstarší</div>
                    <div class="item-after text-color-black">
                      <span v-if="stats.oldest">{{ stats.oldest|datetime }}</span>
                      <span v-else>&mdash;</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Měřených dní</div>
                    <div class="item-after text-color-black">
                      {{ stats.days }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div id="records" class="tab">
          <div class="block-title">{{ metric.emoji }}&ensp;{{ metric.name }} / Záznamy</div>
          <div class="list">
            <ul>
              <li v-for="record in records" v-bind:key="record.time">
                <router-link v-bind:to="`/records-edit/${record.time}`" class="item-content item-link">
                  <div class="item-inner">
                    <div class="item-title">{{ record.time|datetime }}</div>
                    <!-- <div class="item-after text-color-black">{{ metric.name|trim }}</div> -->
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div id="details" class="tab">
          <div class="block-title">{{ metric.emoji }}&ensp;{{ metric.name }} / Detaily</div>
          <div class="list">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Název</div>
                    <div class="item-after text-color-black">{{ metric.name|trim }}</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Emoji</div>
                    <div class="item-after text-color-black">{{ metric.emoji }}</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">Měřené období</div>
                    <div class="item-after text-color-black">{{ metric.period|period }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
  name: 'MetricPage',
  methods: {
    showTab(event) {
      window.f7.tab.show(event.target.getAttribute('href'), event.target)
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    metric() {
      return this.$store.state.metrics.metrics
        .find(item => item.id === this.id)
    },
    records() {
      return this.$store.state.records.records
        .filter(item => item.metric === this.id)
    },
    stats() {
      const stats = {
        total: this.records.length,
        oldest: this.records[this.records.length - 1].time,
        latest: this.records[0].time,
        days: 0,
        avarage: 0,
      }

      if (stats.oldest) {
        const firstMoment = new moment(stats.oldest)
        const diff = moment.duration(firstMoment.diff())
        stats.days = diff.get('days') === 0
          ? 1
          : Math.abs(diff.get('days'))
      }

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
