<template>
  <div class="mess shadow-sm rounded text-white">
    <p class="lh-1 m-0">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style scoped>
.mess {
  position: fixed;
  width: 250px;
  bottom: 32px;
  right: 16px;
  padding: 8px 16px;
  z-index: 99;
}
</style>