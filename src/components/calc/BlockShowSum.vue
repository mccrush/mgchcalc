<template>
  <div class="row bg-light">
    <div class="col-8"></div>
    <div class="col-4 d-flex justify-content-between p-1 pe-2">
      <div></div>
      <div class="small">
        Итого {{ title }}: <span class="fw-bold">{{ sum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'sum']
}
</script>