<template>
  <div class="col-12 pt-2">
    <div v-for="item in sortFilter" :key="item.id" class="row mt-1">
      <div class="col-6 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-3 pe-0">
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
      <div class="col-1 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="ed.izm"
          v-model.trim="item.ed"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-1 pe-0">
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
      <div class="col-1 text-end">
        <ButtonTrash @click="$emit('remove-item', item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import sortMethod from '@/scripts/sortMethod'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonTrash
  },
  props: ['type', 'categoryId', 'searchText', 'sortType'],
  emits: ['save-item', 'remove-item'],
  computed: {
    items() {
      return this.$store.getters[this.type].filter(
        item => item.categoryId === this.categoryId
      )
    },
    categorys() {
      return this.$store.getters.group
    },
    searchFilter() {
      if (this.searchText) {
        return this.items.filter(item => item.title.includes(this.searchText))
      } else {
        return this.items
      }
    },
    sortFilter() {
      return sortMethod(this.searchFilter, this.sortType, 'title')
    }
  },
  methods: {
    saveItem(item) {
      this.$emit('save-item', { item })
    }
  }
}
</script>