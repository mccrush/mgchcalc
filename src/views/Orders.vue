<template>
  <div>
    <div class="row pt-2 ps-2 pe-2 pb-3">
      <div v-for="etap in voronkaOrders" :key="etap.id" class="col-4">
        <OrderList
          :title="etap.title"
          :array="getArray(etap.alias)"
          @edit-order="editOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import voronkaOrders from '@/data/voronkaOrders'
import OrderList from '@/components/orders/OrderList'

export default {
  components: {
    OrderList
  },
  data() {
    return {
      voronkaOrders
    }
  },
  computed: {
    orders() {
      return this.$store.getters.order
    }
  },
  methods: {
    getArray(alias) {
      return this.orders.filter(item => item.status === alias)
    },
    editOrder(order) {
      this.$emit('edit-order', { order, mod: 'edit' })
    }
  }
}
</script>