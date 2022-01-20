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
          <template v-slot:modal-title>
            Параметры {{ pathname === 'order' ? 'заказа' : 'обработки' }}
          </template>
        </ModalHeader>
        <ModalBodyOrder
          v-if="order && (pathname === 'order' || pathname === 'calc')"
          @create-tz="createTZ"
          @update-object="updateItem"
          @update-order-title="updateOrderTitle"
          @update-order-status="updateObjectStatus"
          @update-order-polka="updateOrderPolka"
          @update-object-datefinish="updateObjectDatefinish"
          :order="order"
          :mod="mod"
        />
        <ModalBodyNafrezer
          v-if="order && pathname === 'nafrezer'"
          @update-object="updateItem"
          @update-order-title="updateOrderTitle"
          @update-order-status="updateObjectStatus"
          @update-object-datefinish="updateObjectDatefinish"
          :order="order"
          :mod="mod"
        />
        <ModalFooter
          @save-item="saveItem"
          @remove-item="removeItem"
          :mod="mod"
        />
      </div>
    </div>
  </div>
</template>

<script>
import getDateNow from '@/scripts/getDateNow'
import ModalHeader from '@/components/modal/ModalHeader'
import ModalBodyOrder from '@/components/modal/ModalBodyOrder'
import ModalBodyNafrezer from '@/components/modal/ModalBodyNafrezer'
import ModalFooter from '@/components/modal/ModalFooter'

export default {
  components: {
    ModalHeader,
    ModalBodyOrder,
    ModalBodyNafrezer,
    ModalFooter
  },
  props: {
    order: Object,
    mod: String,
    pathname: String
  },
  computed: {
    nafrezerOfOrder() {
      return this.$store.getters.nafrezer.filter(
        item => item.orderId === this.order.id
      )
    }
  },
  methods: {
    createTZ(item) {
      console.log('createTZ elem:', item)
      item.orderId = this.order.id
      item.status = 'newfrezer'
      item.dateCreate = getDateNow
      item.dateForReady = this.order.dateForReady
      this.$store.commit('addItem', { item })
      this.$store.dispatch('addItem', { item })
      this.updateElemStatus({
        array: 'rabotaArray',
        id: item.id,
        status: 'newfrezer'
      })
      this.updateItem(this.order)
    },
    updateOrderPolka(polka) {
      if (polka != 0 && this.order.status != 'readyorder') {
        this.order.status = 'readyorder'
        this.order.dateFinish = getDateNow

        // Всем дочерним обработкам в rabotaArray установить статус donefrezer
        this.order.rabotaArray.forEach(item => {
          this.updateElemStatus({
            array: 'rabotaArray',
            id: item.id,
            status: 'donefrezer'
          })
        })

        this.updateItem(this.order)

        // Всем дочерним обработкам nafrezer установить статус donefrezer
        this.nafrezerOfOrder.forEach(item => {
          item.status = 'donefrezer'
          item.dateFinish = this.order.dateFinish
          this.updateItem(item)
        })
      }
    },
    updateElemStatus({ array, id, status }) {
      const index = this.order[array].findIndex(item => item.id === id)
      this.order[array][index].status = status
    },
    updateOrderTitle(client) {
      const startPos = this.order.title.indexOf('_')
      const subStr = this.order.title.slice(startPos)
      this.order.title = client.toUpperCase() + subStr
      if (this.order.title && this.mod === 'edit') {
        this.updateItem(this.order)
      }
    },
    updateChildStatusInParentOrder(orderId, status) {
      let parentOrder = this.$store.getters.parentOrder(orderId)
      console.log('parentOrder:', parentOrder)
      if (parentOrder) {
        parentOrder.rabotaArray.forEach(item => {
          this.updateElemStatus({
            array: 'rabotaArray',
            id: item.id,
            status
          })
        })
      }

      if (parentOrder.rabotaArray.every(item => item.status === 'donefrezer')) {
        parentOrder.status = 'readyorder'
      }
      this.updateItem(parentOrder)
    },
    updateObjectStatus(object) {
      if (object.type === 'order') {
        if (object.status === 'success' || object.status === 'failorder') {
          object.dateFinish = getDateNow
          object.polka = ''
        } else {
          object.dateFinish = ''
        }
        this.updateItem(object)
      } else if (object.type === 'nafrezer') {
        this.updateItem(object)
        this.updateChildStatusInParentOrder(object.orderId, object.status)
      }
      // Если oreder.type = nafrezer, то:
      // также обновить статус и в rabotaArray,
      // проверить, все ли дочерние обработки заказа имеют статус donefrezer,
      //   если да, то обновить статус заказа на readyorder
    },
    updateObjectDatefinish(object) {
      if (object.type === 'order') {
        object.status === 'success'
        this.updateItem(object)
      } else if (object.type === 'nafrezer') {
        this.updateChildStatusInParentOrder(object.orderId, 'donefrezer')
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
    removeItem() {
      if (confirm('Действительно удалить элемент?')) {
        this.$store.commit('removeItem', {
          type: this.order.type,
          id: this.order.id
        })
        this.$store.dispatch('removeItem', {
          type: this.order.type,
          id: this.order.id
        })
      }
    }
  }
}
</script>