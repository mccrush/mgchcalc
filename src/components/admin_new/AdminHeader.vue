<template>
  <div class="row">
    <div class="col-3">
      <select
        class="form-select form-select-sm"
        v-model="newAdminRazdel"
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
//import Contact from './../../classes/contactClass'

import createAdminItem from './../../scripts/createAdminItem'

import ButtonAddSmall from './../elements/buttons/ButtonAddSmall.vue'

export default {
  components: {
    ButtonAddSmall
  },
  data() {
    return {
      razdels,
      newAdminRazdel: '',
      adminClass: ''
    }
  },
  mounted() {
    this.newAdminRazdel = this.adminRazdel || ''
  },
  computed: {
    adminRazdel() {
      return this.$store.getters.adminRazdel
    }
  },
  methods: {
    setAdminRazdel() {
      this.$store.commit('setAdminValue', {
        type: 'adminRazdel',
        value: this.newAdminRazdel
      })

      this.$store.commit('setAdminValue', {
        type: 'adminClass',
        value:
          this.newAdminRazdel.substring(0, 1).toUpperCase() +
          this.newAdminRazdel.substring(1)
      })

      // this.$store.commit('setAdminValue', {
      //   type: 'adminList',
      //   value:
      //     'List' +
      //     this.newAdminRazdel.substring(0, 1).toUpperCase() +
      //     this.newAdminRazdel.substring(1)
      // })

      this.$store.commit('setAdminValue', {
        type: 'adminForm',
        value:
          'Form' +
          this.newAdminRazdel.substring(0, 1).toUpperCase() +
          this.newAdminRazdel.substring(1)
      })

      this.adminClass =
        this.newAdminRazdel.substring(0, 1).toUpperCase() +
        this.newAdminRazdel.substring(1)
    },

    addNewItem() {
      // Здесь необходим универсальный метод для создания всех типов данных
      const item = Object.assign({}, createAdminItem(this.adminRazdel))
      this.$store.dispatch('addItem', { item })
    }
  }
}
</script>