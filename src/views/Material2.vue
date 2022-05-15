<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        <ViewGroup :groups="groups" />
      </div>

      <div class="col-12 col-md-8 col-lg-9 ps-md-0">
        Здесь список материалов будет
        <!-- <ViewListMaterial
          v-if="group && !form"
          :group="group"
          v-model:material="material"
          v-model:form="form"
          :materials="materials"
        />
        <ViewForm v-if="form && formItem" :item="formItem" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import ViewGroup from './../components/material/ViewGroup.vue'
import ViewListMaterial from './../components/material/ViewListMaterial.vue'

import ViewForm from './../components/material/ViewForm.vue'

export default {
  components: {
    ViewGroup,
    ViewListMaterial,
    ViewForm
  },
  data() {
    return {
      group: null,
      material: null,
      formItem: null,
      form: ''
    }
  },
  computed: {
    groups() {
      return this.$store.getters.materialvid
    },
    materials() {
      if (this.group) {
        return this.$store.getters.material.filter(
          item => item.categoryId === this.group.id
        )
      } else {
        return []
      }
    }
  },
  watch: {
    group(newv, oldv) {
      console.log('new group in watch:', newv)
    },
    material(newv, oldv) {
      console.log('new material in watch:', newv)
    },
    form(newv, oldv) {
      console.log('new form in watch:', newv)
      if (newv === 'group') {
        this.formItem = this.group
      } else if (newv === 'material') {
        this.formItem = this.material
      }
    }
  }
}
</script>