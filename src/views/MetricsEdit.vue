<template>
  <div class="page">
    <app-titlebar>
      <span v-if="id" slot="middle">Upravit jednotku</span>
      <span v-if="!id" slot="middle">Nová jednotka</span>
      <span slot="left" v-on:click="$router.go('-1')" class="text-primary">Zpět</span>
      <span slot="right" v-on:click="submit" class="text-primary">Uložit</span>
    </app-titlebar>

    <div class="page-content bg-white p-2">
      <form v-on:submit.prevent="submit">
        <div class="form-group text-center">
          <label for="presets">Vyber si z nachystaných jednotek&hellip;</label>
          <select v-on:change="preset($event.target.value)" class="form-control" id="presets">
            <option>Vyber jednotku</option>
            <option
              v-for="(preset, presetIndex) in presets"
              v-bind:key="preset.name"
              v-bind:value="presetIndex"
            >
              {{ preset.emoji }} {{ preset.name }}
            </option>
          </select>
        </div>
        <p class="text-center mb-2">&hellip;nebo si vytvoř vlastní</p>
        <div class="form-row">
          <div class="form-group col-3">
            <label for="emoji">Emoji</label>
            <input v-model="emoji" maxlength="1" class="form-control text-center" id="emoji" placeholder="❔">
          </div>
          <div class="form-group col-9">
            <label for="name">Název</label>
            <input v-model="name" class="form-control" id="name" placeholder="Vlastní jednotka">
          </div>
        </div>
        <p class="text-center mb-2">Vlastnosti</p>
        <div class="form-group">
          <label for="period">Měřené období</label>
          <select v-model="period" class="form-control" id="period">
            <option value="day">Den</option>
            <option value="week">Týden</option>
            <option value="month">Měsíc</option>
            <option value="quarter">Čtvrtletí</option>
            <option value="year">Rok</option>
          </select>
        </div>
        <div class="form-group">
          <p class="mb-2">Lokalita</p>
          <div class="form-check form-check-inline">
            <input v-model="location" v-bind:value="true" class="form-check-input" type="radio" name="inlineRadioOptions" id="location-on">
            <label class="form-check-label" for="location-on">včetně lokace</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="location" v-bind:value="false" class="form-check-input" type="radio" name="inlineRadioOptions" id="location-off">
            <label class="form-check-label" for="location-off">bez lokace</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppTitlebar from '../components/AppTitlebar.vue'

export default {
  name: 'MetricsEditPage',
  data: function() {
    return {
      presets: [
        { emoji: '🚬', name: 'Cígo' },
        { emoji: '☕', name: 'Kafe' },
        { emoji: '🏃', name: 'Běh' },
        { emoji: '🚴', name: 'Kolo' },
        { emoji: '🐶', name: 'Venčení' },
        { emoji: '💑', name: 'Sex' },
        { emoji: '🍔', name: 'Fast-food' },
      ],
      name: '',
      emoji: '',
      location: true,
      period: 'day',
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    preset(presetIndex) {
      var preset = this.presets[presetIndex]
      if (preset) {
        this.emoji = preset.emoji
        this.name = preset.name
      }
      else {
        this.emoji = ''
        this.name = ''
      }
    },
    submit() {
      if (!this.name || !this.emoji) {
        window.alert('Musíš zadat alespoň název a emoji jednotky')
        return
      }

      this.$store.commit('saveMetric', {
        id: this.id,
        emoji: this.emoji,
        name: this.name,
        period: this.period,
        location: this.location,
      })
      this.$router.go('-1')
    }
  },
  created() {
    var metric = this.$store.state.metrics.find(item => item.id === this.id)
    if (metric) {
      this.emoji = metric.emoji
      this.name = metric.name
      this.period = metric.period
      this.location = metric.location
    }
  },
  components: {
    AppTitlebar,
  }
}
</script>
