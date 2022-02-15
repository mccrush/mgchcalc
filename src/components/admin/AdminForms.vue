<template>
  <div class="row">
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
        {{ item.position }} . {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import sortMethod from '@/scripts/sortMethod'

export default {
  props: ['type', 'categoryId', 'searchText', 'sortType'],
  computed: {
    items() {
      if (this.type === 'obrabotkatolshina' || this.type === 'material') {
        return this.$store.getters[this.type].filter(
          item => item.categoryId === this.categoryId
        )
      } else {
        return this.$store.getters[this.type]
      }
    },
    searchFilter() {
      if (this.searchText) {
        return this.items.filter(item =>
          item.title.toUpperCase().includes(this.searchText.toUpperCase())
        )
      } else {
        return this.items
      }
    },
    sortFilter() {
      return sortMethod(this.searchFilter, this.sortType, 'position')
    }
  }
}
</script>