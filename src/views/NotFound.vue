<template>
  <div class="view">
    <div class="page">
      <app-navbar>
        <span slot="title">Hups!</span>
      </app-navbar>

      <app-toolbar></app-toolbar>

      <empty-page>
        <p>Nemám páru jak se ti to povedlo,<br>ale nemůžu najít co hledáš.</p>
        <router-link to="/">Zpět na hlavní obrazovku</router-link>
      </empty-page>
    </div>
  </div>
</template>

<script>
import AppToolbar from '../components/AppToolbar.vue'
import AppNavbar from '../components/AppNavbar.vue'
import EmptyPage from '../components/EmptyPage.vue'

export default {
  name: 'NotFoundPage',
  components: {
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>
