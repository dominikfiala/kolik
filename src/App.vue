<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      activateTab(key) {
        this.$store.commit('setActiveTab', key)
      }
    },
    computed: {
      metrics() {
        return this.$store.state.metrics
      }
    },
    watch: {
      $route() {
        this.$nextTick(() => {
          window.f7.navbar.size('.navbar')
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.f7.navbar.size('.navbar')
      })
    }
  }
</script>
