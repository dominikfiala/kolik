<template>
  <div class="page">
    <app-navbar>
      <span slot="title">
        <span v-if="id === 0">Nová jednotka</span>
        <span v-else>Upravit jednotku</span>
      </span>
      <a slot="left" v-on:click="$router.go('-1')">Zpět</a>
      <a slot="right" v-on:click="submit">Uložit</a>
    </app-navbar>

    <div class="page-content">
      <form v-on:submit.prevent="submit" class="list">
        <ul>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Přednastavené jednotky</div>
                <div class="item-input-wrap">
                  <select v-on:change="preset($event.target.value)">
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
              </div>
            </div>
          </li>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Název</div>
                <div class="item-input-wrap">
                  <input type="text" v-model="name" placeholder="Vlastní jednotka">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Emoji</div>
                <div class="item-input-wrap">
                  <input type="text" v-model="emoji" maxlength="1" placeholder="❔">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Měřené období</div>
                <div class="item-input-wrap">
                  <select v-model="period">
                    <option value="day">Den</option>
                    <option value="week">Týden</option>
                    <option value="month">Měsíc</option>
                    <option value="quarter">Čtvrtletí</option>
                    <option value="year">Rok</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">Geolokace</div>
                <div class="item-after">
                  <label class="toggle toggle-init">
                    <input type="checkbox" v-model="location" v-bind:value="true"><i class="toggle-icon"></i>
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue'

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
    AppNavbar,
  }
}
</script>
