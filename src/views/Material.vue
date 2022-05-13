<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        <ListMaterialGroups
          :groups="groups"
          v-model:group="group"
          v-model:form="form"
        />
      </div>

      <div class="col-12 col-md-8 col-lg-9 ps-md-0">
        <ViewListMaterial
          v-if="group && !form"
          :group="group"
          v-model:material="material"
          v-model:form="form"
          :materials="materials"
        />
        <FormGroup
          v-if="group && form === 'group'"
          :item="group"
          @save-item="saveItem(group)"
        />
        <FormMaterial
          v-if="material && form === 'material'"
          :item="material"
          @save-item="saveItem(material)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ListMaterialGroups from './../components/material/ListMaterialGroups.vue'
import ViewListMaterial from './../components/material/ViewListMaterial.vue'

import FormGroup from './../components/forms/FormGroup.vue'
import FormMaterial from './../components/forms/FormMaterial.vue'

export default {
  components: {
    ListMaterialGroups,
    ViewListMaterial,
    FormGroup,
    FormMaterial
  },
  data() {
    return {
      group: null,
      material: null,
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
  methods: {
    saveItem(item) {
      console.log('have item for update = ', item)
      this.$store.dispatch('updateItem', { item })
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
    }
  }
}
</script>