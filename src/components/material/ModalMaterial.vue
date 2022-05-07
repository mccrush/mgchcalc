<template>
  <div class="modal fade" id="modalMaterial" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <component v-if="item" :is="myModalMaterialComponent" :item="item" />
        </div>
        <!-- <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ModalMaterialGroup from './ModalMaterialGroup.vue'
import ModalMaterialMaterial from './ModalMaterialMaterial.vue'

export default {
  components: {
    ModalMaterialGroup,
    ModalMaterialMaterial
  },
  props: ['formType', 'item'],
  data() {
    return {
      modalTitle: ''
    }
  },
  computed: {
    myModalMaterialComponent() {
      switch (this.formType) {
        case 'ListMaterialGroups':
          this.modalTitle = 'Группа'
          return 'ModalMaterialGroup'
        case 'ListMaterials':
          this.modalTitle = 'Материал'
          return 'ModalMaterialMaterial'
      }
    }
  }
}
</script>