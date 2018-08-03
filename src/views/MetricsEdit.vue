<template>
  <div class="page">
    <app-navbar>
      <a slot="left" v-on:click="$router.go('-1')" class="link">Zrušit</a>
      <a slot="right" v-on:click="submit" class="link">Uložit</a>
    </app-navbar>

    <div class="page-content">
      <div class="block-title">
        <span v-if="id === 0">Nová jednotka</span>
        <span v-else>Upravit jednotku</span>
      </div>
      <form v-on:submit.prevent="submit" class="list" ref="form">
        <ul>
          <li v-if="id === 0">
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
                  <input type="text" v-model="name" placeholder="Vlastní jednotka" required>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-title item-label">Emoji</div>
                <div class="item-input-wrap">
                  <input type="text" v-model="emoji" maxlength="1" placeholder="❔" required>
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
        </ul>
      </form>

      <div v-if="id !== 0" class="">
        <div class="block-title">Další volby</div>
        <div class="list">
          <ul>
            <li v-on:click="reset">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title text-color-red">Vynulovat jednotku</div>
                </div>
              </div>
            </li>
            <li v-on:click="remove">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title text-color-red">Smazat jednotku</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
      if (this.$refs.form.reportValidity && !this.$refs.form.reportValidity()) {
        return
      }

      this.$store.commit('metrics/SAVE', {
        id: this.id,
        emoji: this.emoji,
        name: this.name,
        period: this.period,
      })
      this.$router.go('-1')
    },
    reset() {
      if (window.confirm('Opravdu vynulovat tuto jednotku?')) {
        this.$store.commit('records/RESET', this.id)
      }
    },
    remove() {
      if (window.confirm('Opravdu smazat tuto jednotku? Smazány budou i veškeré její záznamy.')) {
        this.$store.commit('records/RESET', this.id)
        this.$store.commit('metrics/DELETE', this.id)
        this.$router.push('/metrics')
      }
    },
  },
  created() {
    var metric = this.$store.state.metrics.metrics.find(item => item.id === this.id)
    if (metric) {
      this.emoji = metric.emoji
      this.name = metric.name
      this.period = metric.period
    }
  },
  components: {
    AppNavbar,
  }
}
</script>
