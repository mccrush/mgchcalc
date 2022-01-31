<template>
  <label
    class="
      list-group-item
      d-flex
      justify-content-between
      align-content-center
      pe-2
    "
  >
    <div class="pt-1">
      <input
        v-if="mod === 'edit'"
        class="form-check-input me-2"
        type="checkbox"
      />
      <span> {{ item.title }}, {{ item.size }} {{ item.ed }} </span>
    </div>
    <div class="d-flex align-content-center">
      <span class="badge bg-light text-dark align-self-center me-2 p-2"
        >{{ item.summa }} ₽</span
      >
    </div>
  </label>
</template>

<script>
export default {
  props: ['item', 'mod']
}
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>