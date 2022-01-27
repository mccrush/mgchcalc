<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalOrderLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered
      "
    >
      <div class="modal-content border-0">
        <ModalHeader v-if="item">
          <template v-slot:modal-title>
            Параметры {{ item.type === 'order' ? 'заказа' : 'обработки' }}
          </template>
        </ModalHeader>
        <ModalBodyOrder
          v-if="item"
          @update-object="updateItem"
          @update-order-title="updateOrderTitle"
          @update-order-status="updateObjectStatus"
          @update-object-datefinish="updateObjectDatefinish"
          @create-tz="createTZ"
          :item="item"
          :mod="mod"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from '@/components/modal/ModalHeader'
import ModalOrderBody from '@/components/modal/ModalOrderBody'

export default {
  components: {
    ModalHeader,
    ModalOrderBody
  },
  props: ['item']
}
</script>