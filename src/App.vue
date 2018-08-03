<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      metrics() {
        return this.$store.state.metrics
      }
    }
  }
</script>

<style lang="less">
// core
@import url('../node_modules/framework7/framework7.less');
@import url('../node_modules/framework7/components/typography/typography.less');
@import url('../node_modules/framework7/components/timeline/timeline.less');
@import url('../node_modules/framework7/components/tabs/tabs.less');
@import url('../node_modules/framework7/components/input/input.less');

// include/exclude themes
@includeIosTheme: true;
@includeMdTheme: true;

// include/exclude dark theme
@includeDarkTheme: false;

// iOS theme color
@themeColorIos: #007aff;
// MD theme color
@themeColorMd: #2196f3;

// Extra colors for iOS theme
@colorsIos: red #ff3b30, green #4cd964, orange #ff9500, blue #007aff;
// @colorsIos: blue #007aff;

// Extra colors for MD theme
@colorsMd: red #f44336, green #4caf50, orange #ff9800, blue #2196f3;
// @colorsMd: blue #2196f3;

// change to true to generate RTL styles
@rtl: false;
</style>
