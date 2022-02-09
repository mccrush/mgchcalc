<template>
  <div class="col-12 pt-2">
    <div
      v-for="(item, index) in sortFilter"
      :key="item.id"
      class="row mt-2 pt-2 pb-2"
      :class="{ 'bg-light': index % 2 === 0 }"
    >
      <div class="col-12 col-sm-6 col-md-5 pe-sm-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-3 mt-1 mt-sm-0 pe-md-0">
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
      <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="item.priceS"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="item.priceM"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="item.priceL"
          @change="saveItem(item)"
        />
      </div>
      <div class="col-3 col-md-1 mt-1 mt-md-0 text-end">
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
      return this.$store.getters.obrabotkavid
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