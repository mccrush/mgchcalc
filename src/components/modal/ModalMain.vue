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
            @show-modal-customer="$emit('show-modal-customer')"
            :item="item"
            :mod="mod"
          />
        </transition>
        <ModalFooter @save-item="saveItem" @remove-item="removeItem" :mod="mod"
          ><template v-slot:modal-footer>
            {{ item.type === 'order' ? 'заказ' : 'обработку' }}
          </template>
          <template v-slot:modal-footer-close>
            {{ mod === 'create' ? 'Отмена' : 'Закрыть' }}
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
  emits: ['show-modal', 'show-modal-customer'],
  computed: {
    modalBody() {
      //console.log('ModalMain, this.item:', this.item)
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
      const newNafrezer = createNafrezer(
        this.item.title,
        this.item.id,
        this.item.client,
        this.item.dateForReady,
        rabotaArray
      )
      console.log('ModalMain: createTZ elem:', newNafrezer)

      this.$emit('show-modal', { modal: newNafrezer, mod: 'edit' })
      this.$store.dispatch('addItemRT', { item: newNafrezer })

      // rabotaArray.forEach(elem => {
      //   this.updateStatusInRabotaArray(elem.id)
      // })
    },
    updateStatusInRabotaArray(id) {
      let array = this.order.rabotaArray.map(item => {
        if (item.id === id) {
          console.log('ModalMain: updateStatusInRabotaArray: item:', item)
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
        console.log('ModalMain, save item:', this.item)
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
        if (this.item.files && this.item.files.length) {
          this.item.files.forEach(item => {
            this.$store.dispatch('removeFile', { fileRef: item.fileRef })
          })
        }

        this.$store.dispatch('removeItemRT', {
          type: this.item.type,
          id: this.item.id
        })
      }
    }
  }
}
</script>