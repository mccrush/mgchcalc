<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="modalNafrezerLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-centered
      "
    >
      <div class="modal-content border-0">
        <ModalHeader v-if="order">
          <template v-slot:modal-title>
            Параметры {{ order.type === 'order' ? 'заказа' : 'обработки' }}
          </template>
        </ModalHeader>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from '@/components/modal/ModalHeader'

export default {
  components: {
    ModalHeader
  },
  props: ['order']
}
</script>