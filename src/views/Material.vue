<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        <ListMaterialGroups
          :groups="groups"
          v-model:groupId="groupId"
          v-model:groupNacenka="groupNacenka"
          v-model:groupOthody="groupOthody"
          @show-modal-material="showModalMaterial"
        />
      </div>
      <div class="col-12 col-md-8 col-lg-9 ps-md-0">
        <div class="d-flex justify-content-between align-items-center">
          <span class="small"
            >Наценка группы: {{ groupNacenka }}%, норма отхода:
            {{ groupOthody }}%</span
          >
          <button
            class="btn btn-sm btn-outline-success"
            :class="{ disabled: !groupId }"
            title="Добавить материал"
            @click="addNewMaterial"
          >
            Добавить &nbsp;+&nbsp;
          </button>
        </div>
        <hr class="mt-2" />
        <ListMaterials :materials="materials" :groupNacenka="groupNacenka" />
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
      groupId: null,
      groupNacenka: 0,
      groupOthody: 0,
      modalItem: null,
      modalType: ''
    }
  },
  computed: {
    groups() {
      return this.$store.getters.materialvid
    },
    groupItem() {
      return this.groups.filter(item => item.id === this.groupId)
    },
    materials() {
      if (this.groupId) {
        return this.$store.getters.material.filter(
          item => item.categoryId === this.groupId
        )
      } else {
        return []
      }
    }
  },
  methods: {
    addNewMaterial() {
      const item = Object.assign({}, new Material('', this.groupId))
      //console.log('new material:', item)
      this.$store.dispatch('addItem', { item })
      this.showModalMaterial(item)
    },
    saveItem() {
      //console.log('have item = ', item)
      this.$store.dispatch('updateItem', { item: this.modalItem })
    },
    showModalMaterial(item) {
      this.modalItem = item
      this.modalType = item.type
      const myModalMaterial = new Modal(
        document.getElementById('modalMaterial')
      )
      myModalMaterial.show()
    }
  }
}
</script>