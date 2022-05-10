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
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span v-if="group" class="small"
              >Наценка группы: {{ group.nacenka }}%, норма отхода:
              {{ group.othody }}%</span
            >
          </div>
          <button
            class="btn btn-sm btn-outline-success"
            :class="{ disabled: !group }"
            title="Добавить материал"
            @click="addNewMaterial"
          >
            Добавить &nbsp;+&nbsp;
          </button>
        </div>
        <hr class="mt-2" />
        <ListMaterials
          v-if="group"
          :materials="materials"
          :groupNacenka="group.nacenka"
          @show-modal-material="showModalMaterial"
        />
      </div>
    </div>
    <ModalMaterial :type="modalType" :item="modalItem" @save-item="saveItem" />
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
import Material from './../classes/materialClass.js'
import ListMaterialGroups from './../components/material/ListMaterialGroups.vue'
import ListMaterials from './../components/material/ListMaterials.vue'
import ModalMaterial from './../components/material/ModalMaterial.vue'

export default {
  components: {
    ListMaterialGroups,
    ListMaterials,
    ModalMaterial
  },
  data() {
    return {
      group: null,
      modalItem: null,
      modalType: ''
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
    addNewMaterial() {
      const item = Object.assign({}, new Material('', this.group.id))
      //console.log('new material:', item)
      this.$store.dispatch('addItem', { item })
      this.showModalMaterial(item)
    },
    showModalMaterial(item) {
      this.modalItem = item
      this.modalType = item.type
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