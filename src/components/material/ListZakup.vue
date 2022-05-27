<template>
  <div class="row">
    <div class="col-12">
      <table class="table table-striped table-sm text-center lh-1 mt-2">
        <thead>
          <tr>
            <th scope="col" class="small" width="10%">№</th>
            <th scope="col" class="small" width="10%">Счет</th>
            <th scope="col" class="small" width="10%">Дата</th>
            <th scope="col" class="small" width="20%">Поставщик</th>
            <th scope="col" class="small" width="15%">Прих. в ед.</th>
            <th scope="col" class="small" width="15%">Прих. в руб.</th>
            <th scope="col" class="small" width="10%">Цена</th>
            <th scope="col" class="small" width="10%"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="zakup in item.zakups || []"
            :key="zakup.id"
            class="align-middle"
          >
            <td>
              <span class="small">{{ zakup.zakupNomer || '-' }}</span>
            </td>
            <td>
              <span class="small">{{ zakup.nomerScheta || '-' }}</span>
            </td>
            <td>
              <span class="small">{{
                new Date(zakup.dateCreate).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })
              }}</span>
            </td>
            <td class="text-start small">
              <span class="small">{{
                getPostavshikTitle(zakup.postavshikId) || 'Нет поставщика'
              }}</span>
            </td>
            <td>
              <span class="small">{{ zakup.prihodEdinicy || '-' }}</span>
            </td>
            <td>
              <span class="small">{{ zakup.prihodRubly || '-' }}</span>
            </td>
            <td>
              <span class="small">{{ zakup.price || '-' }}</span>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <ButtonEdit
                  class="border-0"
                  :class="{
                    'bg-warning': showForm && zakup.id === selectZakupId
                  }"
                  @click.stop="editZakup(zakup)"
                />
                <ButtonTrash
                  class="border-0"
                  @click.stop="removeZakup(zakup.id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <FormZakup
        v-if="showForm && zakupItem"
        :zakup="zakupItem"
        @update-zakup="updateZakup"
      />
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
      selectZakupId: '',
      zakupItem: null
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

    editZakup(zakup) {
      this.showForm = !this.showForm
      this.selectZakupId = zakup.id
      this.zakupItem = zakup
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