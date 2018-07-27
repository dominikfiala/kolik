<template>
  <div class="navbar">
    <div class="navbar-inner">
      <div class="left"><slot name="left"></slot></div>
      <div class="title"><slot name="title"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-navbar'
  }
</script>
