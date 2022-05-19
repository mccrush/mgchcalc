<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered
      "
    >
      <div class="modal-content border-0 bg-light shadow-lg">
        <div class="modal-header">
          <h6 class="modal-title">Создание нового заказчика</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetPharams"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="!myForm" class="row">
            <div class="col-6 pe-0">
              <button
                class="btn btn-lg shadow-sm bg-white w-100 pt-3 pb-3"
                @click="createCustomer('contact')"
              >
                Создать Контакт
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-lg shadow-sm bg-white w-100 pt-3 pb-3"
                @click="createCustomer('company')"
              >
                Создать Компанию
              </button>
            </div>
          </div>
          <component
            v-if="myForm"
            :is="myForm"
            :item="item"
            @save-item="saveItem"
            @remove-item="removeItem"
          />
        </div>
        <div class="modal-footer d-flex justify-content-between p-2">
          <div>
            <button
              v-if="razdel === 'contact'"
              type="button"
              class="btn btn-outline-success"
              @click="createCustomer('company')"
            >
              Или создать Компанию
            </button>
            <button
              v-if="razdel === 'company'"
              type="button"
              class="btn btn-outline-success"
              @click="createCustomer('contact')"
            >
              Или создать Контакт
            </button>
          </div>
          <button
            v-if="item"
            type="button"
            class="btn btn-outline-danger"
            data-bs-dismiss="modal"
            @click="resetPharams"
          >
            Удалить заказчика
          </button>
          <button
            v-if="!item"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="resetPharams"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createItem from './../../scripts/createItem'

import FormContact from './../admin/forms/FormContact.vue'
import FormCompany from './../admin/forms/FormCompany.vue'

export default {
  components: {
    FormContact,
    FormCompany
  },
  data() {
    return {
      myForm: '',
      razdel: '',
      item: null
    }
  },
  methods: {
    createCustomer(type) {
      this.razdel = type
      this.item = createItem(type)
      this.$store.dispatch('addItem', { item: this.item })
      switch (type) {
        case 'contact':
          this.myForm = 'FormContact'
          break
        case 'company':
          this.myForm = 'FormCompany'
      }
      console.log('this.myForm:', this.myForm)
    },
    saveItem({ item }) {
      if (item.title) {
        this.$store.dispatch('updateItem', { item })
      }
    },
    removeItem(id) {
      this.$store.dispatch('removeItem', { type: this.razdel, id })
    },
    resetPharams() {
      this.myForm = ''
      this.razdel = ''
      this.item = null
    }
  }
}
</script>