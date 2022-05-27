<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <ButtonAdd @click="addNewZakup" />
    </div>
    <div class="col-12">
      <ListZakup :item="this.item" />
    </div>
  </div>
</template>

<script>
import Zakup from './../../classes/zakupClass'

import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ListZakup from './ListZakup.vue'

export default {
  components: {
    ButtonAdd,
    ListZakup
  },
  props: ['item'],
  methods: {
    addNewZakup() {
      if (!this.item.zakups) {
        this.item.zakups = []
      }
      const newZakup = Object.assign({}, new Zakup())
      this.item.zakups.push(newZakup)
      this.$store.dispatch('updateItem', { item: this.item })
    }
  }
}
</script>