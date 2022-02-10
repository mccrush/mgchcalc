<template>
  <div
    class="col-12 dropzone pt-2"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragleave.prevent
    @dragenter="onDragEnter($event)"
  >
    <div
      v-for="(item, index) in sortFilter"
      :key="item.id"
      class="row pre-drop mt-1 pt-2 pb-2"
      :class="{ 'bg-light': index % 2 === 0 }"
      draggable="true"
      @dragstart.stop="onDragStart($event, item)"
      @dragover.self="onDragOverItem($event, item.position)"
      @dragleave.self="onDragLeaveItem($event, item.position)"
    >
      <div class="drag-button ms-1 p-0 pb-1">
        <ButtonDrag />
      </div>
      <div class="col-2 col-sm-1 ps-1 pe-0">
        <input
          type="number"
          class="form-control form-control-sm"
          v-model.number="item.position"
          @change="saveItem(item)"
          disabled
        />
      </div>
      <div class="col-8 col-md-6 ps-1 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-2 col-md-1 text-end">
        <ButtonTrash @click="$emit('remove-item', item.id)" />
      </div>
      <div class="col-5"></div>
    </div>
  </div>
</template>


<script>
import sortMethod from '@/scripts/sortMethod'
import ButtonDrag from '@/components/buttons/ButtonDrag'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonDrag,
    ButtonTrash
  },
  props: ['type', 'categoryId', 'searchText', 'sortType'],
  emits: ['save-item', 'remove-item'],
  computed: {
    items() {
      return this.$store.getters[this.type]
    },
    searchFilter() {
      if (this.searchText) {
        return this.items.filter(item => item.title.includes(this.searchText))
      } else {
        return this.items
      }
    },
    sortFilter() {
      return sortMethod(this.searchFilter, this.sortType, 'position')
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
        // let dropzones = document.querySelectorAll('.dropzone')
        // dropzones.forEach(item => {
        //   item.lastChild.style.paddingTop = '0'
        // })
        // e.target.lastChild.style.paddingTop = '64px'
      }
    },
    onDragOverItem(e, index) {
      //e.target.classList.add('border', 'border-danger')
      let element = e.target
      //console.log('onDragOverItem: element:', element)

      // while (!element.contains('pre-drop')) {
      //   element = element.parentNode
      // }

      element.classList.add('border', 'border-danger')

      //e.target.style.border = '1px solid red'
      //e.target.style.marginTop = '52px'
      //this.sortFilter.splice(index, 0, { title: '333' })
    },
    onDragLeaveItem(e, position) {
      e.target.classList.remove('border', 'border-danger')
      //e.target.classList.add('border', 'border-success')
    },
    onDrop(e, status) {
      //console.log('onDrop, status:', status)

      // let dropzone = document.querySelector(
      //   '.dropzone[data-status ="' + status + '" ]'
      // )
      // dropzone.lastChild.style.paddingTop = '0'

      let itemId = e.dataTransfer.getData('itemId')
      console.log('onDrop, itemId:', itemId)
      e.target.classList.remove('border', 'border-danger', 'mt-5')
      // this.items.forEach(item => {
      //   if (item.id === itemId) {
      //     if (item.status !== status) {
      //       item.status = status
      //       this.$store.dispatch('updateItemStatus', { item })
      //     }
      //   }
      // })
    },
    saveItem(item) {
      this.$emit('save-item', { item })
    }
  }
}
</script>

<style scoped>
.drag-button {
  width: 24px;
}
</style>