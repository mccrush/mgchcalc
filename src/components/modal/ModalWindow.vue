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
          @update-object="updateItem"
          @update-order-title="updateOrderTitle"
          @update-order-status="updateObjectStatus"
          @update-object-datefinish="updateObjectDatefinish"
          @create-tz="createTZ"
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
import createNafrezer from '@/scripts/createNafrezer'
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
    createTZ(rabotaArray) {
      const item = createNafrezer(
        this.order.title,
        this.order.id,
        this.order.client,
        this.order.dateForReady,
        rabotaArray
      )
      console.log('createTZ elem:', item)

      //this.$emit('edit-order', { order: item, mod: 'create' })
      //this.$store.dispatch('addItemRT', { item })

      // rabotaArray.forEach(elem => {
      //   this.updateStatusInRabotaArray(elem.id)
      // })
    },
    updateStatusInRabotaArray(id) {
      let array = this.order.rabotaArray.map(item => {
        if (item.id === id) {
          console.log('item:', item)
          item.status = 'inprogress'
          return item
        }
      })

      console.log('array:', array)
      // this.order.rabotaArray = array
      //this.updateItem(this.order)
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
      }
    },
    updateOrderTitle(client) {
      const startPos = this.order.title.indexOf('_')
      const subStr = this.order.title.slice(startPos)
      this.order.title = client.toUpperCase() + subStr
      this.order.client = client
      if (this.order.title && this.mod === 'edit') {
        this.updateItem(this.order)
      }
    },
    updateObjectStatus(item) {
      this.$store.dispatch('updateItemStatus', { item })
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
        this.$store.dispatch('addItemRT', { item: this.order })
      }
    },
    updateItem(item) {
      if (item.title && this.mod === 'edit') {
        this.$store.dispatch('updateItemRT', { item })
      }
    },
    removeItem() {
      if (confirm('Действительно удалить элемент?')) {
        this.$store.dispatch('removeItemRT', {
          type: this.order.type,
          id: this.order.id
        })
      }
    }
  }
}
</script>