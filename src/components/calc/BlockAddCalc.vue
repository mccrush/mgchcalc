<template>
  <div class="row pt-2 pb-2">
    <div class="col-12 d-flex justify-content-between">
      <button
        class="btn btn-sm btn-outline-light text-muted"
        @click="$emit('add-new-calc', { type })"
      >
        Добавить позицию
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>