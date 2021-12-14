<template>
  <div class="row pt-2 pb-2">
    <div class="col-12">
      <div class="row">
        <div class="col-3">---</div>
        <div class="col-3 pe-0">
          <ButtonSort />
        </div>
        <div class="col-3 pe-0">
          <InputSearch @search="searchStart" />
        </div>
        <div class="col-3">
          <ButtonAdd />
        </div>
      </div>
    </div>
    <div class="col-12 pt-2">
      <div v-for="item in searchFilter" :key="item.id" class="row mt-1">
        <div class="col-6 pe-0">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model.trim="item.title"
          />
        </div>
        <div class="col-5">---</div>
        <div class="col-1 text-end"><ButtonTrash /></div>
      </div>
    </div>
  </div>
</template>


<script>
import InputSearch from '@/components/inputs/InputSearch'
import ButtonSort from '@/components/buttons/ButtonSort'
import ButtonAdd from '@/components/buttons/ButtonAdd'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    InputSearch,
    ButtonSort,
    ButtonAdd,
    ButtonTrash
  },
  props: ['type'],
  data() {
    return {
      searchText: ''
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
    }
  },
  methods: {
    searchStart(search) {
      this.searchText = search
    }
  }
}
</script>