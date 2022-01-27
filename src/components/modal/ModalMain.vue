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
      <div class="modal-content border-0" v-if="item">
        <ModalHeader>
          <template v-slot:modal-title>
            Параметры {{ item.type === 'order' ? 'заказа' : 'обработки' }}
          </template>
        </ModalHeader>
        <transition name="fade" mode="out-in" appear>
          <component
            :is="modalBody"
            @update-item="updateItem"
            @update-item-title="updateOrderTitle"
            @update-item-status="updateItemStatus"
            @update-item-datefinish="updateItemDatefinish"
            @update-item-polka="updateNafrezerPolka"
            @create-tz="createTZ"
            :item="item"
            :mod="mod"
          />
        </transition>
        <ModalFooter @save-item="saveItem" @remove-item="removeItem" :mod="mod"
          ><template v-slot:modal-footer>
            {{ item.type === 'order' ? 'заказ' : 'обработку' }}
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
  props: ['item', 'mod'],
  emits: [],
  computed: {
    modalBody() {
      console.log('this.item:', this.item)
      if (this.item) {
        if (this.item.type === 'order') {
          return 'ModalBodyOrder'
        } else if (this.item.type === 'nafrezer') {
          return 'ModalBodyNafrezer'
        }
      }
    }
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

      this.$emit('edit-order', { order: item, mod: 'create' })
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
    updateItemDatefinish(object) {
      if (object.type === 'order') {
        object.status = 'success'
      } else if (object.type === 'nafrezer') {
        object.status = 'donefrezer'
      }
      this.updateItem(object)
    },
    updateItemStatus(item) {
      this.$store.dispatch('updateItemStatus', { item })
    },
    updateNafrezerPolka(object) {
      if (object.polka != 0) {
        object.status = 'donefrezer'
        object.dateFinish = getDateNow

        this.updateItem(object)

        const nafrezer = this.$store.getters.nafrezer.filter(
          elem => elem.orderId === object.orderId
        )

        if (
          nafrezer.every(elem => elem.status === 'donefrezer' && elem.polka)
        ) {
          let parentOrder = this.$store.getters.parentOrder(object.orderId)
          parentOrder.status = 'readyorder'
          this.updateItem(parentOrder)
        }
      }
    },
    updateOrderTitle(client) {
      const startPos = this.item.title.indexOf('_')
      const subStr = this.item.title.slice(startPos)
      this.item.title = client.toUpperCase() + subStr
      this.item.client = client
      this.updateItem(this.item)
    },
    saveItem() {
      if (this.item.title) {
        console.log('save item:', this.item)
        this.$store.dispatch('addItemRT', { item: this.item })
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
          type: this.item.type,
          id: this.item.id
        })
      }
    }
  }
}
</script>