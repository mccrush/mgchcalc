<template>
  <div class="bg-light rounded-3 p-2">
    <div class="list-title text-center pt-0">
      <strong>{{ title }}</strong>
    </div>
    <div class="list-items">
      <div
        v-for="item in array"
        :key="item.id"
        class="item bg-white shadow-sm rounded lh-1 mt-3 p-2"
        @dblclick="editItem(item.id)"
      >
        <span class="">{{ item.title }}</span>
      </div>
    </div>
    <ModalOrder :order="order" mod="edit" id="staticBackdrop" />
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import ModalOrder from '@/components/interface/ModalOrder'

export default {
  components: {
    ModalOrder
  },
  props: ['title', 'array'],
  data() {
    return {
      order: {}
    }
  },
  // computed: {
  //   order(id) {
  //     return this.array.find(item => item.id === id) || {}
  //   }
  // },
  methods: {
    editItem(id) {
      this.order = {}
      this.order = this.array.find(item => item.id === id)
      var myModal = new Modal(document.getElementById('staticBackdrop'))
      myModal.show()
    }
  }
}
</script>

<style scoped>
.item {
  user-select: none;
  cursor: default;
}
</style>