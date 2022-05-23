<template>
  <div class="row">
    <div class="col-12">
      <component
        v-if="item"
        :is="materialForm"
        :item="item"
        @save-item="saveItem"
      />
    </div>
  </div>
</template>

<script>
import FormGroup from './FormGroup.vue'
import FormUndergroup from './FormUndergroup.vue'
import FormMaterial from './FormMaterial.vue'

export default {
  components: {
    FormGroup,
    FormUndergroup,
    FormMaterial
  },
  computed: {
    materialForm() {
      return this.$store.getters.materialForm
    },
    materialGroupId() {
      return this.$store.getters.materialGroupId
    },
    materialMaterialId() {
      return this.$store.getters.materialMaterialId
    },
    materialUndergroupId() {
      return this.$store.getters.materialUndergroupId
    },
    groups() {
      return this.$store.getters.group
    },
    undergroups() {
      return this.$store.getters.undergroup
    },
    materials() {
      return this.$store.getters.material
    },
    // form() {
    //   if (this.item) {
    //     const formString =
    //       'Form' +
    //       this.item.type.substring(0, 1).toUpperCase() +
    //       this.item.type.substring(1)
    //     console.log('formString: ', formString)
    //     return formString
    //   } else {
    //     return ''
    //   }
    // },
    item() {
      switch (this.materialForm) {
        case 'FormGroup':
          return this.groups.find(item => item.id === this.materialGroupId)
        case 'FormUndergroup':
          return this.undergroups.find(
            item => item.id === this.materialUndergroupId
          )
        case 'FormMaterial':
          return this.materials.find(
            item => item.id === this.materialMaterialId
          )
      }
    }
  },
  methods: {
    saveItem() {
      console.log('ViewForm.vue: have item for update = ', this.item)
      this.$store.dispatch('updateItem', { item: this.item })
    }
  }
}
</script>