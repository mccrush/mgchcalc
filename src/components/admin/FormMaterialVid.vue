<template>
  <div class="col-12 pt-2">
    <div
      v-for="(item, index) in sortFilter"
      :key="item.id"
      class="row mt-1 pt-2 pb-2"
      :class="{ 'bg-light': index % 2 === 0 }"
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