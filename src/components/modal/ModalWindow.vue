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
          @update-object-datefinish="updateObjectDatefinish"
          :order="order"
          :mod="mod"
        />
        <ModalBodyNafrezer
          v-if="order && pathname === 'nafrezer'"
          @update-object="updateItem"
          @update-order-status="updateObjectStatus"
          @update-object-datefinish="updateObjectDatefinish"
          @update-nafrezer-polka="updateNafrezerPolka"
          :order="order"
          :mod="mod"
        />
        <ModalFooter @save-item="saveItem" @remove-item="removeItem" :mod="mod"
          ><template v-slot:modal-footer>
            {{ pathname === 'order' ? 'заказ' : 'обработку' }}
          </template>
        </ModalFooter>
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
  methods: {
    createTZ(item) {
      console.log('createTZ elem:', item)
      item.orderId = this.order.id
      item.client = this.order.client
      item.status = 'newfrezer'
      item.dateCreate = getDateNow
      item.dateForReady = this.order.dateForReady
      //this.$store.commit('addItem', { item })
      this.$store.dispatch('addItemRT', { item })
      this.removeElementFromRabotaArray(item.id)
    },
    removeElementFromRabotaArray(id) {
      this.order.rabotaArray = this.order.rabotaArray.filter(
        item => item.id != id
      )
      this.updateItem(this.order)
    },
    updateNafrezerPolka(object) {
      if (object.polka != 0) {
        object.status = 'donefrezer'
        object.dateFinish = getDateNow

        this.updateItem(object)

        const nafrezer = this.$store.getters.nafrezer.filter(
          item => item.orderId === object.orderId
        )

        if (
          nafrezer.every(item => item.status === 'donefrezer' && item.polka)
        ) {
          let parentOrder = this.$store.getters.parentOrder(object.orderId)
          parentOrder.status = 'readyorder'
          this.updateItem(parentOrder)
        }
      } else {
        // let parentOrder = this.$store.getters.parentOrder(object.orderId)
        // parentOrder.status = 'nafrezer'
        // this.updateItem(parentOrder)
      }
    },
    // updateElemStatus({ array, id, status }) {
    //   const index = this.order[array].findIndex(item => item.id === id)
    //   this.order[array][index].status = status
    // },
    updateOrderTitle(client) {
      const startPos = this.order.title.indexOf('_')
      const subStr = this.order.title.slice(startPos)
      this.order.title = client.toUpperCase() + subStr
      this.order.client = client
      if (this.order.title && this.mod === 'edit') {
        this.updateItem(this.order)
      }
    },
    updateObjectStatus(object) {
      if (object.type === 'order') {
        if (object.status === 'doneorder') {
          const nafrezer = this.$store.getters.nafrezer.filter(
            item => item.orderId === object.id
          )

          nafrezer.forEach(item => {
            item.dateFinish = getDateNow
            item.status = 'arhivefrezer'
            this.updateItem(item)
          })
        } else if (
          object.status === 'successorder' ||
          object.status === 'failorder'
        ) {
          object.dateFinish = getDateNow
        } else {
          object.dateFinish = ''
        }
      } else if (object.type === 'nafrezer') {
        if (object.status === 'donefrezer') {
          object.dateFinish = getDateNow
        } else {
          object.dateFinish = ''
          let parentOrder = this.$store.getters.parentOrder(object.orderId)
          parentOrder.status = 'nafrezer'
          this.updateItem(parentOrder)
        }
      }
      this.updateItem(object)
    },
    updateObjectDatefinish(object) {
      if (object.type === 'order') {
        object.status = 'success'
      } else if (object.type === 'nafrezer') {
        object.status = 'donefrezer'
      }
      this.updateItem(object)
    },
    saveItem() {
      if (this.order.title) {
        console.log('save order:', this.order)
        //this.$store.commit('addItem', { item: this.order })
        this.$store.dispatch('addItemRT', { item: this.order })
      }
    },
    updateItem(item) {
      if (item.title && this.mod === 'edit') {
        //this.$store.commit('updateItem', { item })
        this.$store.dispatch('updateItemRT', { item })
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