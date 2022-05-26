<template>
  <div class="row pt-3">
    <div class="col-12 col-sm-6 col-md-3 pe-sm-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        :value="razdel"
        @change="$emit('update:razdel', $event.target.value)"
      >
        <option
          v-for="razdel in razdels"
          :key="razdel.alias"
          :value="razdel.alias"
        >
          {{ razdel.title }}
        </option>
      </select>
    </div>
    <!---->
    <div class="col-12 col-sm-6 col-md-2 col-lg-3 mt-2 mt-sm-0 pe-md-0">
      <select
        v-if="razdel === 'obrabotkatolshina'"
        class="form-select form-select-sm w-100"
        aria-label="Select group resourse"
        :value="categoryId"
        @change="$emit('update:categoryId', $event.target.value)"
      >
        <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
          {{ cat.title }}
        </option>
      </select>
    </div>
    <!---->
    <div class="col-3 col-sm-4 col-md-2 col-lg-1 mt-2 mt-md-0 pe-0">
      <ButtonSort
        v-model:sortType="sortType"
        @click="$emit('update:sortType', sortType)"
      />
    </div>
    <div class="col-9 col-sm-4 col-md-3 mt-2 mt-md-0 pe-sm-0">
      <InputSearch
        v-model:searchText="searchText"
        @input="$emit('update:searchText', searchText)"
      />
    </div>
    <div class="col-12 col-sm-4 col-md-2 mt-2 mt-md-0">
      <ButtonAdd
        @click="$emit('add-item')"
        :class="{
          disabled: this.razdel === 'obrabotkatolshina' && !categoryId
        }"
      />
    </div>
  </div>
</template>

<script>
import razdels from './../../data/razdels'

import ButtonSort from './../elements/buttons/ButtonSort.vue'
import InputSearch from './../elements/inputs/InputSearch.vue'
import ButtonAdd from './../elements/buttons/ButtonAdd.vue'

export default {
  components: {
    ButtonSort,
    InputSearch,
    ButtonAdd
  },
  props: ['razdel', 'categoryId', 'searchText', 'sortType', 'procent'],
  emits: [
    'update:razdel',
    'update:categoryId',
    'update:searchText',
    'update:sortType',
    'update:procent',
    'add-item'
  ],
  data() {
    return {
      razdels
    }
  },
  computed: {
    categorys() {
      if (this.razdel === 'obrabotkatolshina') {
        return this.$store.getters.obrabotkavid
      }
    }
  }
}
</script>