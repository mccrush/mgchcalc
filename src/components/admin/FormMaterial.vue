<template>
  <div class="col-12 pt-2">
    <div
      v-for="(item, index) in sortFilter"
      :key="item.id"
      class="row mt-2 pt-2 pb-2"
      :class="{ 'bg-light': index % 2 === 0 }"
      draggable="true"
      @dragstart="dragStart($event, item)"
      @dragover="dragOver($event)"
      @dragleave="dragLeave($event)"
      @drop="dropItem($event, item, index)"
      @dragover.prevent
    >
      <div class="drag-button ms-1 p-0 pb-1">
        <ButtonDrag />
      </div>
      <div class="position-block border small text-center rounded p-0 pt-1">
        {{ item.position }}
      </div>
      <div class="col-10 col-sm-5 col-md-4 ps-1 pe-sm-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-12 col-sm-5 col-md-2 mt-2 mt-sm-0 pe-md-0">
        <select
          class="form-select form-select-sm w-100"
          aria-label="Select resourse"
          v-model="item.categoryId"
          @change="saveItem(item)"
        >
          <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
      </div>
      <div class="col-5 col-md-2 mt-2 mt-md-0 pe-0">
        <select
          class="form-select form-select-sm w-100"
          aria-label="Select Ed"
          v-model="item.ed"
          @change="saveItem(item)"
        >
          <option v-for="(e, idx) in ed" :key="'e' + idx" :value="e">
            {{ e }}
          </option>
        </select>
      </div>
      <div class="col-5 col-md-2 mt-2 mt-md-0 pe-0">
        <input
          type="number"
          class="form-control form-control-sm"
          min="0"
          max="10000"
          step="10"
          v-model.number="item.price"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-2 col-md-1 text-end mt-2 mt-md-0 pe-md-0">
        <ButtonTrash @click="$emit('remove-item', item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import ed from '@/data/ed'
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
  data() {
    return {
      ed
    }
  },
  computed: {
    items() {
      return this.$store.getters[this.type].filter(
        item => item.categoryId === this.categoryId
      )
    },
    categorys() {
      return this.$store.getters.materialvid
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
    dragStart(e, item) {
      e.dataTransfer.setData('itemId', item.id)
    },
    dragOver(e) {
      e.currentTarget.classList.remove('bg-light')
      e.currentTarget.classList.add('bg-secondary')
    },
    dragLeave(e) {
      e.currentTarget.classList.remove('bg-secondary')
    },
    dropItem(e, item, index) {
      e.currentTarget.classList.remove('bg-secondary')
      if (index % 2 === 0) e.currentTarget.classList.add('bg-light')

      const itemId = e.dataTransfer.getData('itemId')

      if (item.id !== itemId) {
        const newItemPos = item.position

        const itemIndex = this.items.findIndex(item => item.id === itemId)
        let element = this.items[itemIndex]
        element.position = newItemPos
        this.saveItem(element)

        // Пока не до конца ясно, почему надо делать так,
        // почему не обновляются данные через computed
        this.items.splice(itemIndex, 1)
        this.items.splice(index, 0, element)

        if (itemIndex > index) {
          this.upArrayIndexes(index, newItemPos, this.items)
        } else {
          this.downArrayIndexes(index, this.items)
        }
      }
    },
    upArrayIndexes(index, newPos, array) {
      let element
      for (let i = index + 1; i < array.length; i++) {
        newPos = +newPos + 1
        element = array[i]
        element.position = newPos
        this.saveItem(element)
        //console.log('new elem up pos:', element)
      }
    },
    downArrayIndexes(index, array) {
      let element
      for (let i = 0; i < index; i++) {
        element = array[i]
        element.position = i + 1
        this.saveItem(element)
        //console.log('new elem down pos:', element)
      }
    },
    saveItem(item) {
      this.$emit('save-item', { item })
    }
  }
}
</script>

<style scoped>
.drag-button,
.position-block {
  width: 24px;
}
</style>