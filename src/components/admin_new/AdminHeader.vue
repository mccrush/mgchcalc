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
  </div>
</template>

<script>
import razdels from './../../data/razdelsForAdmin'

export default {
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
    }
  }
}
</script>