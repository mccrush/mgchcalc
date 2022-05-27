<template>
  <div class="row">
    <div class="col-12">
      <ButtonAdd @click="addNewModification" />
    </div>
    <div v-if="showForm" class="col-12">
      <FormModification />
    </div>
    <div class="col-12">
      <ListModification />
    </div>
  </div>
</template>

<script>
import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

import ListModification from './ListModification.vue'
import FormModification from './FormModification.vue'

export default {
  components: {
    ButtonAdd,
    ButtonTrash,
    ListModification,
    FormModification
  },
  props: ['item'],
  emits: ['save-item'],
  data() {
    return {
      showForm: false
    }
  },
  methods: {
    addNewModification() {
      this.showForm = true
    }
  }
}
</script>