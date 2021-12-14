<template>
  <div class="col-12 pt-2">
    <div v-for="item in sortFilter" :key="item.id" class="row mt-1">
      <div class="col-6 pe-0">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model.trim="item.title"
        />
      </div>
      <div class="col-1 text-end"><ButtonTrash /></div>
      <div class="col-5"></div>
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
  props: ['type'],
  data() {
    return {
      searchText: '',
      sortType: 'asc'
    }
  },
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
      return sortMethod(this.searchFilter, this.sortType, 'title')
    }
  }
}
</script>