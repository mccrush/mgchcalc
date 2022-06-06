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
    <div class="col-3 ps-0">
      <select
        v-if="adminRazdel === 'obrabotkatolshina'"
        class="form-select form-select-sm"
        v-model="newCategoryId"
        @change="setCategoryId"
      >
        <option
          v-for="obrabotkavid in obrabotkavids"
          :key="obrabotkavid.id"
          :value="obrabotkavid.id"
        >
          {{ obrabotkavid.title }}
        </option>
      </select>
    </div>
    <div class="col-3"></div>
    <div class="col-3">
      <ButtonAddSmall class="w-100" @click="addNewItem" />
    </div>
  </div>
</template>

<script>
import razdels from './../../data/razdelsForAdmin'
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
      adminClass: '',
      newCategoryId: ''
    }
  },
  mounted() {
    this.newAdminRazdel = this.adminRazdel || ''
    this.newCategoryId = this.categoryId || ''
  },
  computed: {
    adminRazdel() {
      return this.$store.getters.adminRazdel
    },

    categoryId() {
      return this.$store.getters.categoryId
    },

    obrabotkavids() {
      return this.$store.getters.obrabotkavid
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

    setCategoryId() {
      this.$store.commit('setAdminValue', {
        type: 'categoryId',
        value: this.newCategoryId
      })

      this.$store.commit('setAdminValue', {
        type: 'adminItemId',
        value: ''
      })
    },

    addNewItem() {
      const item = Object.assign({}, createAdminItem(this.adminRazdel))
      this.$store.dispatch('addItem', { item })
    }
  }
}
</script>