<template>
  <div>
    <div
      class="dropzone border rounded-3 p-2"
      :data-status="status"
      @drop="onDrop($event, status)"
      @dragover.prevent
      @dragleave.prevent
      @dragenter="onDragEnter($event)"
    >
      <div class="list-title text-center pt-0">
        <strong class="no-select">{{ title }}</strong>
        <div
          v-if="array.length && this.pathname === 'order'"
          class="text-muted small"
        >
          <span>{{ array.length }} шт., </span>
          <strong> {{ itogSum(array) }}</strong>
        </div>
      </div>
      <div class="list-items pb-1">
        <KanbanCard
          v-for="item in array"
          :key="item.id"
          :item="item"
          class="item bg-white shadow-sm rounded lh-1 mt-2 p-2"
          draggable="true"
          @click="editItem(item.id)"
          @dragstart.stop="onDragStart($event, item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
//import getDateNow from '@/scripts/getDateNow'
import { getArraySum } from '@/scripts/getArraySum'
import { formatMoney } from '@/scripts/formatMoney'
import KanbanCard from '@/components/kanban/KanbanCard'

export default {
  components: {
    KanbanCard
  },
  props: ['title', 'array', 'pathname', 'status'],
  emits: ['edit-item'],
  data() {
    return {
      array2: [
        { summa: 1 },
        { summa: 2 },
        { summa: 3 },
        { summa: 4 },
        { summa: 5 }
      ]
    }
  },
  computed: {
    items() {
      return this.$store.getters[this.pathname]
    }
  },
  methods: {
    itogSum(array) {
      return formatMoney(getArraySum(array))
    },
    onDragStart(e, item) {
      console.log('DragStart, item:', item.id)
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id)
    },
    onDragEnter(e) {
      if (e.target.classList.contains('dropzone')) {
        let dropzones = document.querySelectorAll('.dropzone')
        dropzones.forEach(item => {
          item.lastChild.style.paddingTop = '0'
        })
        e.target.lastChild.style.paddingTop = '64px'
      }
    },
    onDrop(e, status) {
      console.log('onDrop, status:', status)

      let dropzone = document.querySelector(
        '.dropzone[data-status ="' + status + '" ]'
      )
      dropzone.lastChild.style.paddingTop = '0'

      let itemId = e.dataTransfer.getData('itemId')

      this.items.forEach(item => {
        if (item.id === itemId) {
          if (item.status !== status) {
            item.status = status
            this.$store.dispatch('updateItemStatus', { item })
          }
        }
      })
    },
    editItem(id) {
      const item = this.array.find(item => item.id === id)
      this.$emit('edit-item', item)
    }
  }
}
</script>

<style scoped>
.no-select {
  -webkit-user-select: none;
  user-select: none;
}

.list-items {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
}

.item {
  user-select: none;
  cursor: pointer;
}
</style>