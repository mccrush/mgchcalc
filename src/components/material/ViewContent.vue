<template>
  <div class="row">
    <div class="col-12">
      <div
        class="d-flex justify-content-between align-items-center mt-2 mt-md-0"
      >
        <div>Free block</div>
        <button
          class="btn btn-sm btn-outline-success"
          title="Добавить материал"
          @click="addNewMaterial"
        >
          Добавить &nbsp;+&nbsp;
        </button>
      </div>
      <hr class="mt-2" />
    </div>
    <div class="col-12">
      <ListMaterials :materials="materials" />
    </div>
  </div>
</template>

<script>
import Material from './../../classes/materialClass'

import ListMaterials from './ListMaterials.vue'
import ViewForm from './ViewForm.vue'

export default {
  components: {
    ListMaterials,
    ViewForm
  },
  props: ['group', 'materials', 'material', 'form'],
  emits: ['update:material', 'update:form'],
  methods: {
    addNewMaterial() {
      const material = Object.assign({}, new Material('', this.group.id))
      console.log('new material:', material)
      this.editMaterial(material)
      this.$store.dispatch('addItem', { item: material })
    },
    editMaterial(material) {
      this.$emit('update:material', material)
      this.$emit('update:form', 'material')
    }
  }
}
</script>