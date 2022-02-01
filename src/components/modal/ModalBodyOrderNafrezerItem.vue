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
        v-if="type === 'order' && mod === 'edit'"
        class="form-check-input me-2"
        type="checkbox"
      />
      <span> {{ item.title }}, {{ item.size }} {{ item.ed }} </span>
    </div>
    <div class="d-flex align-content-center">
      <span class="badge bg-light text-dark align-self-center me-2 p-2"
        >Стоимость: {{ item.summa }} ₽</span
      >
      <span
        v-if="type === 'nafrezer'"
        class="badge bg-light text-success align-self-center me-2 p-2"
        >ЗП: {{ Math.floor(item.summa * 0.4) }} ₽</span
      >
    </div>
  </label>
</template>

<script>
export default {
  props: ['item', 'type', 'mod']
}
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>