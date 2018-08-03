<template>
  <div class="page">
    <app-navbar>
      <a slot="left" v-on:click="$router.go('-1')" class="link">Zrušit</a>
      <a slot="right" v-on:click="submit" class="link">Uložit</a>
    </app-navbar>

    <div class="page-content">
      <div class="block-title">
        <span v-if="id === 0">Nový záznam</span>
        <span v-else>Upravit záznam</span>
      </div>
      <form v-on:submit.prevent="submit" class="list" ref="form">
        <ul>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Jednotka</div>
                <div class="item-input-wrap">
                  <select v-model="metric" required>
                    <option v-bind:value="null">Vyber jednotku</option>
                    <option
                      v-for="metric in metrics"
                      v-bind:key="metric.id"
                      v-bind:value="metric.id"
                    >
                      {{ metric.emoji }} {{ metric.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Datum a čas</div>
                <div class="item-input-wrap">
                  <input v-model="time" type="datetime-local" v-bind:max="time" required>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </form>

      <div v-if="id !== 0" class="list">
        <ul>
          <li v-on:click="remove">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title text-color-red">Smazat záznam</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import AppNavbar from '../components/AppNavbar.vue'

export default {
  name: 'RecordsEditPage',
  data: function() {
    return {
      metric: null,
      time: new moment().format(moment.HTML5_FMT.DATETIME_LOCAL)
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    },
    metrics() {
      return this.$store.state.metrics.metrics
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.reportValidity && !this.$refs.form.reportValidity()) {
        return
      }

      this.$store.commit('records/SAVE', {
        id: this.id,
        metric: this.metric,
        time: parseInt(new moment(this.time).format('x')),
      })
      this.$router.go('-1')
    },
    remove() {
      if (window.confirm('Opravdu smazat tento záznam?')) {
        this.$store.commit('records/DELETE', this.id)
        this.$router.go('-1')
      }
    },
  },
  created() {
    var record = this.$store.state.records.records.find(item => item.time === this.id)
    if (record) {
      this.metric = record.metric
      this.time = new moment(record.time).format(moment.HTML5_FMT.DATETIME_LOCAL)
    }
    else if (this.metrics.length === 1) {
      this.metric = this.metrics[0].id
    }
  },
  components: {
    AppNavbar,
  }
}
</script>

<style>
.list input[type="datetime-local"] {
  max-width: 100% !important;
}
</style>
