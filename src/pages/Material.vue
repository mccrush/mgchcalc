<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        <ListMaterialGroups
          :groups="groups"
          v-model:group="group"
          @show-modal-material="showModalMaterial"
        />
      </div>

      <div class="col-12 col-md-8 col-lg-9 ps-md-0">
        <ViewListMaterial :group="group" :materials="materials" />
      </div>
    </div>
    <ModalMaterial :item="modalItem" @save-item="saveItem" />
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Material from './../classes/materialClass'
import ListMaterialGroups from './../components/material/ListMaterialGroups.vue'
import ViewListMaterial from './../components/material/ViewListMaterial.vue'
import ModalMaterial from './../components/material/ModalMaterial.vue'

export default {
  components: {
    ListMaterialGroups,
    ViewListMaterial,
    ModalMaterial
  },
  data() {
    return {
      group: null,
      modalItem: null,
      modalType: '',
      postuplenie: []
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
  async mounted() {
    if (!this.$store.getters.postuplenie.length) {
      await this.$store.dispatch('getItems', { type: 'postuplenie' })
      console.log('Material.vue mounted(): postuplenie is get')
    }
  },
  methods: {
    showModalMaterial(item) {
      this.modalItem = item
      //this.modalType = item.type
      const myModalMaterial = new Modal(
        document.getElementById('modalMaterial')
      )
      myModalMaterial.show()
    },
    saveItem() {
      //console.log('have item = ', item)
      this.$store.dispatch('updateItem', { item: this.modalItem })
    }
  }
}
</script>