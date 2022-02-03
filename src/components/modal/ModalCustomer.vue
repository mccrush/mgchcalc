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
          <FormCustomerModal @add-customer="addCustomer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormCustomerModal from '@/components/admin/FormCustomerModal'

export default {
  components: {
    FormCustomerModal
  },
  methods: {
    addCustomer(item) {
      if (item.title) {
        item.id = Date.now().toString()
        item.type = 'customer'
        console.log('ModalCustomer: item:', item)
        this.$store.commit('addItem', { item })
        this.$store.dispatch('addItem', { item })
      }
    }
  }
}
</script>