<template>
  <div>
    <div
      class="kanban row flex-nowrap overflow-auto pt-2 ps-2 pe-2 pb-3"
      id="rowScroll"
    >
      <div v-for="etap in etaps" :key="etap.id" class="wrap-order-list">
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
//import orderStatus from '@/data/orderStatus'
import voronkaOrders from '@/data/voronkaOrders'
import voronkaNafrezer from '@/data/voronkaNafrezer'
import OrderList from '@/components/orders/OrderList'

export default {
  components: {
    OrderList
  },
  emits: ['edit-order'],
  computed: {
    pathname() {
      return this.$store.getters.pathname
    },
    etaps() {
      if (this.pathname === 'order') return voronkaOrders
      return voronkaNafrezer
    },
    items() {
      //return this.$store.getters.order
      return this.$store.getters[this.pathname]
    }
  },
  methods: {
    getArray(alias) {
      if (this.pathname === 'order') {
        if (alias === 'nafrezer') {
          return this.items.filter(
            item =>
              item.status === 'nafrezer' ||
              item.status === 'newfrezer' ||
              item.status === 'prinyat' ||
              item.status === 'inprogress'
          )
        } else {
          return this.items.filter(item => item.status === alias)
        }
      } else {
        return this.items.filter(item => item.status === alias)
      }
    },
    editOrder(order) {
      this.$emit('edit-order', { order, mod: 'edit' })
    }
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
  }
}
</script>

<style scoped>
.kanban {
  height: calc(100vh - 87px);
  overflow-x: auto;
}

.wrap-order-list {
  width: 280px;
}

.active {
  cursor: grabbing;
}
</style>