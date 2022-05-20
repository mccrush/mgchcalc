<template>
  <div class="row">
    <div class="col-12">
      <component :is="showComponent" />
    </div>
  </div>
</template>

<script>
import ListMaterials from './ListMaterials.vue'
import ViewForm from './ViewForm.vue'

export default {
  components: {
    ListMaterials,
    ViewForm
  },
  computed: {
    materialUndergroupId() {
      return this.$store.getters.materialUndergroupId
    },
    materialMode() {
      return this.$store.getters.materialMode
    },
    showComponent() {
      switch (this.materialMode) {
        case 'show':
          return 'ListMaterials'
        case 'edit':
          return 'ViewForm'
        default:
          return 'ListMaterials'
      }
    }
  }
}
</script>