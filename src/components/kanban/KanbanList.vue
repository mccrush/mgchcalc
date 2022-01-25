<template>
  <div>
    <div
      class="dropzone bg-light rounded-3 p-2"
      :data-status="status"
      @drop="onDrop($event, status)"
      @dragover.prevent
      @dragleave.prevent
      @dragenter="onDragEnter($event)"
    >
      <div class="list-title text-center pt-0">
        <strong class="no-select">{{ title }}</strong>
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
import getDateNow from '@/scripts/getDateNow'
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
            if (item.type === 'order') {
              if (status === 'doneorder') {
                const nafrezer = this.$store.getters.nafrezer.filter(
                  item1 => item1.orderId === item.id
                )

                nafrezer.forEach(item1 => {
                  item1.dateFinish = getDateNow
                  item1.status = 'arhivefrezer'
                  //this.$store.commit('updateItem', { item: item1 })
                  this.$store.dispatch('updateItemRT', { item: item1 })
                })
              } else if (status === 'successorder' || status === 'failorder') {
                item.dateFinish = getDateNow
              } else {
                item.dateFinish = ''
              }
            } else if (item.type === 'nafrezer') {
              if (status === 'donefrezer') {
                item.dateFinish = getDateNow
              } else {
                item.dateFinish = ''
                let parentOrder = this.$store.getters.parentOrder(item.orderId)
                parentOrder.status = 'nafrezer'
                //this.$store.commit('updateItem', { item: parentOrder })
                this.$store.dispatch('updateItemRT', { item: parentOrder })
              }
            }

            item.status = status
            console.log('new item.status:', item.status)
            //this.$store.commit('updateItem', { item })
            this.$store.dispatch('updateItemRT', { item })
          }
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