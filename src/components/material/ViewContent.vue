<template>
  <div class="row">
    <div class="col-12">
      <div
        class="d-flex justify-content-between align-items-center mt-2 mt-md-0"
      >
        <div>Кнопка Назад</div>
        <button
          class="btn btn-sm btn-outline-success"
          title="Добавить материал"
          @click="addNewMaterial"
          :class="{ disabled: !materialUndergroupId }"
        >
          Добавить &nbsp;+&nbsp;
        </button>
      </div>
      <hr class="mt-2" />
    </div>
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
  },
  methods: {
    addNewMaterial() {
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'edit'
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialForm',
        value: 'FormMaterial'
      })
    }
    // addNewMaterial_old() {
    //   const material = Object.assign({}, new Material('', this.group.id))
    //   console.log('new material:', material)
    //   this.editMaterial(material)
    //   this.$store.dispatch('addItem', { item: material })
    // },
    // editMaterial(material) {
    //   this.$emit('update:material', material)
    // }
  }
}
</script>