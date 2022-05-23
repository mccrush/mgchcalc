<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-end align-items-center mt-2 mt-md-0">
        <ButtonAdd
          @click="addNewMaterial"
          :class="{ disabled: !materialUndergroupId }"
        />
      </div>
      <hr class="mt-2" />
    </div>
    <div class="col-12">
      <ul class="list-group">
        <li class="list-group-item">ListMaterials.vue</li>
        <li
          v-for="material in materials"
          :key="material.id"
          class="
            list-group-item
            d-sm-flex
            justify-content-between
            align-items-center
            lh-1
            p-1
            ps-3
            pe-2
          "
        >
          <span class="small">{{ material.title }}</span>
          <div class="d-flex align-items-center mt-1 mt-sm-0">
            <span class="badge text-dark me-2">
              {{ material.ed }}
            </span>
            <span class="badge text-dark border border-success me-2">
              {{ material.price }}
            </span>
            <span class="badge text-dark border border-warning me-2">{{
              Math.ceil(
                material.price + (material.price * material.nacenka) / 100
              )
            }}</span>
            <ButtonEdit
              class="border-0 me-1"
              @click.stop="editMaterial(material.id)"
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
import Material from './../../classes/materialClass'

import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ButtonEdit from './../elements/buttons/ButtonEdit.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
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
    removeMaterial(type, id) {
      if (confirm('Точно удалить?')) {
        this.$store.dispatch('removeItem', { type, id })
      }
    },
    addNewMaterial() {
      const item = Object.assign(
        {},
        new Material('', '', this.materialUndergroupId)
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
    }
  }
}
</script>