<template>
  <div class="row">
    <div class="col-12">
      <table>
        <tr v-for="zakup in item.zakups || []" :key="zakup.id" class="lh-1">
          <td>
            <span class="small me-2">{{ zakup.zakupNomer || '0000' }}</span>
          </td>
          <td>
            <span class="small me-2">{{ zakup.nomerScheta || '000-000' }}</span>
          </td>
          <td>
            <span class="small me-2">{{
              new Date(zakup.dateCreate).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })
            }}</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <ul class="list-group list-group-flush">
        <li
          v-for="zakup in item.zakups || []"
          :key="zakup.id"
          class="list-group-item lh-1 p-1 ps-1 pe-1"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="small me-2">{{ zakup.zakupNomer || '0000' }}</span>
              <span class="small me-2">{{
                zakup.nomerScheta || '000-000'
              }}</span>
              <span class="small me-2">{{
                new Date(zakup.dateCreate).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })
              }}</span>
              <span class="small me-2">{{
                getPostavshikTitle(zakup.postavshikId) || 'Нет поставщика'
              }}</span>
              <span class="small me-2">{{ zakup.prihodEdinicy || '000' }}</span>
              <span class="small me-2">{{ zakup.prihodRubly || '000' }}</span>
              <span class="small me-2">{{ zakup.price || '000' }}</span>
            </div>
            <div class="d-flex align-items-center mt-1 mt-sm-0">
              <ButtonEdit class="border-0" @click.stop="editZakup(zakup.id)" />
              <ButtonTrash
                class="border-0"
                @click.stop="removeZakup(zakup.id)"
              />
            </div>
          </div>

          <FormZakup
            v-show="showForm && zakup.id === selectZakupId"
            :zakup="zakup"
            @update-zakup="updateZakup"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonAdd from './../elements/buttons/ButtonAdd.vue'
import ButtonEdit from './../elements/buttons/ButtonEdit.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

import FormZakup from './FormZakup.vue'

export default {
  components: {
    ButtonAdd,
    ButtonEdit,
    ButtonTrash,
    FormZakup
  },
  props: ['item'],
  data() {
    return {
      showForm: false,
      selectZakupId: ''
    }
  },
  methods: {
    getPostavshikTitle(id) {
      if (id) {
        return this.$store.getters.postavshik.find(item => item.id === id).title
      } else {
        return 'Нет поставщика'
      }
    },

    editZakup(id) {
      this.showForm = !this.showForm
      this.selectZakupId = id
    },

    updateZakup() {
      this.$store.dispatch('updateItem', { item: this.item })
    },

    removeZakup(id) {
      this.item.zakups = this.item.zakups.filter(item => item.id !== id)
      this.$store.dispatch('updateItem', { item: this.item })
    }
  }
}
</script>