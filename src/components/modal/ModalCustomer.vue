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
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6 pe-0">
              <button class="btn btn-lg shadow-sm bg-white w-100 pt-3 pb-3">
                Создать Контакт
              </button>
            </div>
            <div class="col-6 pe-0">
              <button class="btn btn-lg shadow-sm bg-white w-100 pt-3 pb-3">
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
            @add-customer="addCustomer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createItem from '@/scripts/createItem'
import FormContact from '@/components/admin/forms/FormContact.vue'

export default {
  components: {
    FormContact
  },
  data() {
    return {
      myForm: 'FormContact',
      item: createItem('contact')
    }
  },
  methods: {
    saveItem({ item }) {
      if (item.title || item.name) {
        this.$store.dispatch('updateItem', { item })
      }
    },
    removeItem(id) {
      this.$emit('remove-item', id)
      // Если это Контакт или Компания, то также удалить их
      // из всех Компаний и Контактов
    },
    addCustomer(item) {
      if (item.title) {
        item.id = Date.now().toString()
        item.type = 'customer'
        console.log('ModalCustomer: item:', item)
        //this.$store.commit('addItem', { item })
        this.$store.dispatch('addItem', { item })
      }
    }
  }
}
</script>