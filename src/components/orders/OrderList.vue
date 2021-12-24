<template>
  <div class="bg-light rounded-3 p-2">
    <div class="list-title text-center pt-0">
      <strong>{{ title }}</strong>
    </div>
    <div class="list-items">
      <div
        v-for="item in array"
        :key="item.id"
        class="item bg-white shadow-sm rounded lh-1 mt-2 p-2"
        @dblclick="editItem(item.id)"
      >
        <span class="">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'array'],
  emits: ['edit-order'],
  methods: {
    editItem(id) {
      const order = this.array.find(item => item.id === id)
      this.$emit('edit-order', order)
    }
  }
}
</script>

<style scoped>
.item {
  user-select: none;
  cursor: default;
}
</style>