<template>
  <div class="border-bottom p-2 bg-light">
    <div class="row no-gutters">
      <span class="text-left col"><slot name="left"></slot></span>
      <strong class="text-center col-6"><slot name="middle"></slot></strong>
      <span class="text-right col"><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appTitlebar'
  }
</script>
