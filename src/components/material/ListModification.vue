<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group list-group-flush">
        <li
          v-for="modification in item.modifications || []"
          :key="modification.id"
          class="list-group-item lh-1 p-1 ps-1 pe-1"
        >
          <div class="d-flex justify-content-between align-items-center">
            <span class="small"
              >{{ getPostavshikTitle(modification.postavshikId) }} -
              {{ modification.title }}</span
            >
            <div class="d-flex align-items-center mt-1 mt-sm-0">
              <ButtonEdit
                class="border-0"
                :class="{
                  'bg-warning':
                    showForm && modification.id === selectModificationId
                }"
                @click.stop="editModification(modification.id)"
              />
              <ButtonCopy
                class="border-0"
                @click.stop="copyInBuffer(modification.title)"
              />
              <ButtonTrash
                class="border-0"
                @click.stop="removeModification(modification.id)"
              />
            </div>
          </div>
          <FormModification
            v-show="showForm && modification.id === selectModificationId"
            :modification="modification"
            :ed="ed"
            @update-modification="updateModification"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ed from './../../data/ed'

import ButtonCopy from './../elements/buttons/ButtonCopy.vue'
import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ButtonEdit from './../elements/buttons/ButtonEdit.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

import FormModification from './FormModification.vue'

export default {
  components: {
    ButtonCopy,
    ButtonAdd,
    ButtonEdit,
    ButtonTrash,
    FormModification
  },
  props: ['item'],
  data() {
    return {
      ed,
      showForm: false,
      selectModificationId: ''
    }
  },
  methods: {
    getPostavshikTitle(id) {
      if (id && this.$store.getters.postavshik.length) {
        return this.$store.getters.postavshik.find(item => item.id === id).title
      } else {
        return 'Нет поставщика'
      }
    },

    editModification(id) {
      this.showForm = !this.showForm
      this.selectModificationId = id
    },

    updateModification() {
      this.$store.dispatch('updateItem', { item: this.item })
    },

    removeModification(id) {
      this.item.modifications = this.item.modifications.filter(
        item => item.id !== id
      )
      this.$store.dispatch('updateItem', { item: this.item })
    },

    async copyInBuffer(text) {
      try {
        await navigator.clipboard.writeText(text)
        console.log('Async: Copying to clipboard was successful!', text)
      } catch (err) {
        console.error('Async: Could not copy text: ', err)
      }
    }
  }
}
</script>