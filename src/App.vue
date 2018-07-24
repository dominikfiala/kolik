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
    }
  }
</script>

<style lang="scss">
  // $font-size-base: 0.9rem;
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
  @import "../node_modules/ionicons/dist/css/ionicons.min.css";

  /* barlow-semi-condensed-regular - latin_latin-ext */
  @font-face {
    font-family: 'Barlow Semi Condensed';
    font-style: normal;
    font-weight: 400;
    src: local('Barlow Semi Condensed Regular'), local('BarlowSemiCondensed-Regular'),
         url('./assets/fonts/barlow-semi-condensed-v1-latin_latin-ext-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
         url('./assets/fonts/barlow-semi-condensed-v1-latin_latin-ext-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* barlow-semi-condensed-500 - latin_latin-ext */
  @font-face {
    font-family: 'Barlow Semi Condensed';
    font-style: normal;
    font-weight: 500;
    src: local('Barlow Semi Condensed Medium'), local('BarlowSemiCondensed-Medium'),
         url('./assets/fonts/barlow-semi-condensed-v1-latin_latin-ext-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
         url('./assets/fonts/barlow-semi-condensed-v1-latin_latin-ext-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

  body {
    font-family: 'Barlow Semi Condensed', sans-serif;
  }

  strong {
    font-weight: 500;
  }

  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .page-content {
    flex: 1 1 auto;
    overflow-y: auto;
  }
  .page-footer {
    font-size: 0.75rem;
    line-height: 1.25;
  }
</style>
