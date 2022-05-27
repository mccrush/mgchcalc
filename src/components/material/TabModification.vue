<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <ButtonAdd @click="addNewModification" />
    </div>
    <div class="col-12">
      <ListModification :item="this.item" />
    </div>
  </div>
</template>

<script>
import Modification from './../../classes/modificationClass'

import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ListModification from './ListModification.vue'

export default {
  components: {
    ButtonAdd,
    ListModification
  },
  props: ['item'],
  methods: {
    addNewModification() {
      if (!this.item.modifications) {
        this.item.modifications = []
      }
      const newModification = Object.assign({}, new Modification())
      this.item.modifications.push(newModification)
      this.$store.dispatch('updateItem', { item: this.item })
    }
  }
}
</script>