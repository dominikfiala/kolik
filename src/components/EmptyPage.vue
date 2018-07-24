<template>
  <div class="page-content bg-white d-flex p-2">
    <div class="flex-grow-1 d-flex align-items-center justify-content-center">
      <div class="text-center">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPage'
}
</script>

<style>
</style>
