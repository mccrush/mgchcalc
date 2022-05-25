<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-end align-items-center mt-2 mt-md-0">
        <ButtonAdd
          @click="addNewMaterial"
          :class="{ disabled: !materialUndergroupId }"
        />
      </div>
      <hr class="mt-2 mb-0" />
    </div>
    <div class="col-12">
      <ul class="list-group list-group-flush">
        <li
          v-for="material in sortMaterials(materials)"
          :key="material.id"
          class="
            list-group-item
            d-sm-flex
            justify-content-between
            align-items-center
            lh-1
            p-1
            ps-1
            pe-1
          "
        >
          <span class="small"
            ><span class="text-muted me-2">{{ material.position }}</span
            >{{ material.title }}</span
          >
          <div class="d-flex align-items-center mt-1 mt-sm-0">
            <!-- <span class="badge text-dark me-2">
              {{ material.ed }}
            </span> -->
            <span class="badge text-dark border border-success ms-2 me-1">
              {{ material.price }}
            </span>
            <span class="badge text-dark border border-warning me-1">{{
              Math.ceil(
                material.price + (material.price * material.nacenka) / 100
              )
            }}</span>
            <ButtonUp
              class="border-0"
              @click.stop="updateItemPositionUp(material.id)"
            />
            <ButtonDown
              class="border-0"
              @click.stop="updateItemPositionDown(material.id)"
            />
            <ButtonEdit
              class="border-0"
              @click.stop="editMaterial(material.id)"
            />
            <ButtonCopy
              class="border-0"
              @click="copyInBuffer(material.title)"
            />
            <ButtonTrash
              class="border-0"
              @click="removeMaterial(material.type, material.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import sortMethod from './../../scripts/sortMethod'
import Material from './../../classes/materialClass'

import ButtonUp from './../elements/buttons/ButtonUp.vue'
import ButtonDown from './../elements/buttons/ButtonDown.vue'
import ButtonCopy from './../elements/buttons/ButtonCopy.vue'
import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ButtonEdit from './../elements/buttons/ButtonEdit.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonUp,
    ButtonDown,
    ButtonCopy,
    ButtonAdd,
    ButtonEdit,
    ButtonTrash
  },
  props: ['groupNacenka'],
  emits: ['edit-material'],
  computed: {
    materialUndergroupId() {
      return this.$store.getters.materialUndergroupId
    },
    materials() {
      return this.$store.getters.material.filter(
        item => item.undergroupId === this.materialUndergroupId
      )
    }
  },
  methods: {
    updateItemPositionUp(id) {
      let materialItem = this.materials.find(item => item.id === id)
      materialItem.position = materialItem.position - 1
      this.$store.dispatch('updateItem', { item: materialItem })
    },

    updateItemPositionDown(id) {
      let materialItem = this.materials.find(item => item.id === id)
      materialItem.position = materialItem.position + 1
      this.$store.dispatch('updateItem', { item: materialItem })
    },

    sortMaterials(materialsArray) {
      return sortMethod(materialsArray, 'asc', 'position')
    },

    removeMaterial(type, id) {
      if (confirm('Точно удалить?')) {
        this.$store.dispatch('removeItem', { type, id })
      }
    },

    addNewMaterial() {
      const item = Object.assign(
        {},
        new Material(
          '',
          '',
          this.materialUndergroupId,
          this.materials.length + 1
        )
      )
      this.$store.dispatch('addItem', { item })
      this.$store.commit('setMaterialValue', {
        type: 'materialMaterialId',
        value: item.id
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'edit'
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialForm',
        value: 'FormMaterial'
      })
    },

    editMaterial(id) {
      this.$store.commit('setMaterialValue', {
        type: 'materialMaterialId',
        value: id
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'edit'
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialForm',
        value: 'FormMaterial'
      })
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