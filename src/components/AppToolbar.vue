<template>
  <div class="toolbar tabbar tabbar-labels toolbar-bottom-md">
    <div class="toolbar-inner">
      <router-link
        v-for="route in routes"
        v-bind:to="route.meta.base"
        v-bind:exact="route.name === 'home' ? true : false"
        v-bind:key="route.name"
        class="tab-link"
        active-class="tab-link-active"
      >
        <i class="f7-icons">{{ route.meta.icon }}</i>
        <span class="tabbar-label">{{ route.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-toolbar',
  computed: {
    routes: function () {
      var routes = []
      for (var i in this.$router.options.routes) {
        if (!this.$router.options.routes.hasOwnProperty(i)) {
          continue
        }
        var route = this.$router.options.routes[i];
        if (route.hasOwnProperty('title')) {
          routes.push(route)
        }
      }
      return routes
    }
  },
  methods: {
    click() {
      console.log('domo');
    }
  }
}
</script>
