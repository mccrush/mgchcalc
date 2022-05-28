<template>
  <div class="row">
    <div class="col-3">
      <select
        class="form-select form-select-sm"
        v-model="adminRazdel"
        @change="setAdminRazdel"
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
    <div class="col-6"></div>
    <div class="col-3">
      <ButtonAddSmall class="w-100" @click="addNewItem" />
    </div>
  </div>
</template>

<script>
import razdels from './../../data/razdelsForAdmin'
import Contact from './../../classes/contactClass'

import ButtonAddSmall from './../elements/buttons/ButtonAddSmall.vue'

export default {
  components: {
    ButtonAddSmall
  },
  data() {
    return {
      razdels,
      adminRazdel: 'obrabotkavid'
    }
  },
  methods: {
    setAdminRazdel() {
      this.$store.commit('setAdminValue', {
        type: 'adminRazdel',
        value: this.adminRazdel
      })

      this.$store.commit('setAdminValue', {
        type: 'adminList',
        value:
          'List' +
          this.adminRazdel.substring(0, 1).toUpperCase() +
          this.adminRazdel.substring(1)
      })

      this.$store.commit('setAdminValue', {
        type: 'adminForm',
        value:
          'Form' +
          this.adminRazdel.substring(0, 1).toUpperCase() +
          this.adminRazdel.substring(1)
      })
    },

    addNewItem() {
      const item = Object.assign({}, new Contact())
      this.$store.dispatch('addItem', { item })
    }
  }
}
</script>