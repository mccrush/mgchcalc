<template>
  <div class="row">
    <div class="col-4 mb-2 pe-0">
      <ButtonAdd class="w-100" @click="addNewPostavshik" />
    </div>
    <div class="col-8 mb-2"></div>
    <div class="col-4 pe-0"><ListPostavshiki :postavshiki="postavshiki" /></div>
    <div class="col-8">
      <FormPostavshik v-if="item" :item="item" @save-item="saveItem" />
    </div>
  </div>
</template>

<script>
import Postavshik from './../../classes/postavshikClass'

import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ListPostavshiki from './ListPostavshiki.vue'
import FormPostavshik from './FormPostavshik.vue'

export default {
  components: {
    ButtonAdd,
    ListPostavshiki,
    FormPostavshik
  },
  computed: {
    postavshiki() {
      return this.$store.getters.postavshik
    },
    materialPostavshikId() {
      return this.$store.getters.materialPostavshikId
    },
    item() {
      return this.postavshiki.find(
        item => item.id === this.materialPostavshikId
      )
    }
  },
  methods: {
    addNewPostavshik() {
      const item = Object.assign({}, new Postavshik())
      this.$store.dispatch('addItem', { item })
    },
    saveItem() {
      this.$store.dispatch('updateItem', { item: this.item })
    }
  }
}
</script>