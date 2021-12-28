<template>
  <div>
    <div class="row pt-2 ps-2 pe-2 pb-3">
      <div class="col-4">
        <OrderList title="Новые" :array="ordersNew" @edit-order="editOrder" />
      </div>
      <div class="col-4">
        <OrderList
          title="В работе"
          :array="ordersProgress"
          @edit-order="editOrder"
        />
      </div>
      <div class="col-4">
        <OrderList
          title="Выполненные"
          :array="ordersDone"
          @edit-order="editOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderList from '@/components/orders/OrderList'

export default {
  components: {
    OrderList
  },
  beforeCreate() {
    this.$store.dispatch('getItems', { type: 'order' })
  },
  computed: {
    orders() {
      return this.$store.getters.order
    },
    ordersNew() {
      return this.orders.filter(item => item.status === 'new')
    },
    ordersProgress() {
      return this.orders.filter(item => item.status === 'inprogress')
    },
    ordersDone() {
      return this.orders.filter(item => item.status === 'done')
    }
  },
  methods: {
    editOrder(order) {
      this.$emit('edit-order', { order, mod: 'edit' })
    }
  }
}
</script>