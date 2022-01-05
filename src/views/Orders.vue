<template>
  <div>
    <div
      class="row flex-nowrap overflow-auto pt-2 ps-2 pe-2 pb-3"
      id="rowScroll"
    >
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
  mounted() {
    const slider = document.querySelector('#rowScroll')

    let isDown = false
    let startX
    let scrollLeft

    slider.addEventListener('mousedown', e => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mouseup', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 1 //scroll-fast
      slider.scrollLeft = scrollLeft - walk
    })
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

<style scoped>
.active {
  cursor: grabbing;
}
</style>