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
        <span class="small">{{ item.title }}</span>
        <div class="text-muted small border-top mt-2 pt-2">
          {{
            new Date(item.date).toLocaleDateString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit'
            })
          }}
        </div>
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
.list-items {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
}

.item {
  user-select: none;
  cursor: default;
}
</style>