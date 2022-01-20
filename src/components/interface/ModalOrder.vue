<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered
      "
    >
      <div class="modal-content border-0">
        <ModalHeader>
          <template v-slot:modal-title> Параметры заказа </template>
        </ModalHeader>
        <ModalBody
          @create-tz="createTZ"
          @update-item="updateItem"
          @update-order-title="updateOrderTitle"
          @update-order-status="updateOrderStatus"
          @update-order-polka="updateOrderPolka"
          :order="order"
          :mod="mod"
        />
        <ModalFooter @remove-item="removeItem" :id="order.id" :mod="mod" />
      </div>
    </div>
  </div>
</template>

<script>
//import orderStatus from '@/data/orderStatus'
import voronkaOrders from '@/data/voronkaOrders'
import voronkaNafrezer from '@/data/voronkaNafrezer'

import getDateNow from '@/scripts/getDateNow'
import ModalHeader from '@/components/modal/ModalHeader'
import ModalBody from '@/components/modal/ModalBody'
import ModalFooter from '@/components/modal/ModalFooter'

export default {
  components: {
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalOrderList
  },
  props: {
    order: Object,
    mod: String
  },
  data() {
    return {}
  },
  computed: {
    pathname() {
      return this.$store.getters.pathname
    },
    etaps() {
      if (this.pathname === 'order') return voronkaOrders
      return voronkaNafrezer
    }
  },
  methods: {
    createTZ(item) {
      console.log('createTZ elem:', item)
      item.status = 'newfrezer'
      this.$store.commit('addItem', { item })
      this.$store.dispatch('addItem', { item })
      this.updateElemStatus({
        array: 'rabotaArray',
        id: item.id,
        status: 'newfrezer'
      })
    },
    updateOrderPolka() {
      this.order.status = 'donefrezer'
      this.updateItem(this.order)
    },
    updateElemStatus({ array, id, status }) {
      const index = this.order[array].findIndex(item => item.id === id)
      this.order[array][index].status = status
      this.updateItem(this.order)
    },
    updateOrderTitle(client) {
      const startPos = this.order.title.indexOf('_')
      const subStr = this.order.title.slice(startPos)
      this.order.title = client.toUpperCase() + subStr
      if (this.order.title && this.mod === 'edit') {
        this.updateItem(this.order)
      }
    },
    updateOrderStatus(order) {
      if (order.status === 'success' || order.status === 'failorder') {
        order.dateFinish = getDateNow
        order.polka = ''
        this.updateItem(order)
      } else {
        order.dateFinish = ''
        this.updateItem(order)
      }
    },
    saveItem() {
      if (this.order.title) {
        console.log('save order:', this.order)
        this.$store.commit('addItem', { item: this.order })
        this.$store.dispatch('addItem', { item: this.order })
      }
    },
    updateItem(item) {
      if (item.title && this.mod === 'edit') {
        this.$store.commit('updateItem', { item })
        this.$store.dispatch('updateItem', { item })
      }
    },
    removeItem(id) {
      if (confirm('Действительно удалить заказ?')) {
        this.$store.commit('removeItem', { type: 'order', id })
        this.$store.dispatch('removeItem', { type: 'order', id })
      }
    }
  }
}
</script>