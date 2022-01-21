<template>
  <div>
    <div
      class="bg-light rounded-3 p-2"
      @drop="onDrop($event, status)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="list-title text-center pt-0">
        <strong>{{ title }}</strong>
      </div>
      <div class="list-items">
        <KanbanCard
          v-for="item in array"
          :key="item.id"
          :item="item"
          class="item bg-white shadow-sm rounded lh-1 mt-2 p-2"
          draggable="true"
          @dblclick="editItem(item.id)"
          @dragstart="onDragStart($event, item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from '@/components/kanban/KanbanCard'

export default {
  components: {
    KanbanCard
  },
  props: ['title', 'array', 'pathname', 'status'],
  emits: ['edit-order'],
  computed: {
    items() {
      return this.$store.getters[this.pathname]
    }
  },
  methods: {
    onDragStart(e, item) {
      console.log('DragStart, item:', item.id)
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id)
    },
    onDrop(e, status) {
      console.log('onDrop, status:', status)
      let itemId = e.dataTransfer.getData('itemId')

      this.items.forEach(item => {
        if (item.id === itemId) {
          console.log('Element naiden')
          item.status = status
          console.log('item.status:', item.status)
          this.$store.commit('updateItem', { item })
          this.$store.dispatch('updateItem', { item })
        }
      })
    },
    editItem(id) {
      const item = this.array.find(item => item.id === id)
      this.$emit('edit-order', item)
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