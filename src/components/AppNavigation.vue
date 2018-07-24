<template>
  <div class="page-footer border-top p-2 bg-light">
    <div class="d-flex justify-content-around">
      <router-link
        v-for="route in routes"
        v-bind:to="route.meta.base"
        v-bind:exact="route.name === 'home' ? true : false"
        v-bind:key="route.name"
        class="no-color text-center"
        tag="span"
        active-class="text-primary"
      >
        <i class="icon lead" v-bind:class="route.meta.icon"></i>
        <div class="">{{ route.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appNavigation',
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
  }
}
</script>
