<template>
  <div class="kanban row flex-nowrap overflow-auto pt-3 ps-2 pe-2">
    <KanbanList
      v-for="etap in etaps"
      :key="etap.id"
      :title="etap.title"
      :pathname="pathname"
      :status="etap.alias"
      :array="getArray(etap.alias)"
      @edit-item="showModal"
      class="wrap-order-list ps-1 pe-2"
      @mousedown.self="scrollMouseDown($event)"
      @mouseleave.self="scrollMouseLeave($event)"
      @mouseup.self="scrollMouseUp($event)"
      @mousemove.self="scrollMouseMove($event)"
    />
  </div>
</template>

<script>
import voronkaOrders from '@/data/voronkaOrders'
import voronkaNafrezer from '@/data/voronkaNafrezer'
import KanbanList from '@/components/kanban/KanbanList'

export default {
  components: {
    KanbanList
  },
  emits: ['show-modal'],
  computed: {
    pathname() {
      return this.$store.getters.pathname
    },
    etaps() {
      if (this.pathname === 'order') return voronkaOrders
      return voronkaNafrezer
    },
    items() {
      return this.$store.getters[this.pathname]
    }
  },
  data() {
    return {
      isDown: false,
      startX: 0,
      scrollLeft: 0
    }
  },
  methods: {
    scrollMouseDown(e) {
      const slider = e.target.parentNode
      //console.log('slider:', slider)

      this.isDown = true
      slider.classList.add('active')
      this.startX = e.pageX - slider.offsetLeft
      this.scrollLeft = slider.scrollLeft
    },
    scrollMouseLeave(e) {
      const slider = e.target.parentNode
      this.isDown = false
      slider.classList.remove('active')
    },
    scrollMouseUp(e) {
      const slider = e.target.parentNode
      this.isDown = false
      slider.classList.remove('active')
    },
    scrollMouseMove(e) {
      const slider = e.target.parentNode
      if (!this.isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - this.startX) * 1 //scroll-fast
      slider.scrollLeft = this.scrollLeft - walk
    },
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
        } else if (alias === 'readyorder') {
          return this.items.filter(item => item.status === 'readyorder')
        } else {
          return this.items.filter(item => item.status === alias)
        }
      } else {
        return this.items.filter(item => item.status === alias)
      }
    },
    showModal(modal) {
      this.$emit('show-modal', { modal, mod: 'edit' })
    }
  }
}
</script>

<style scoped>
.kanban {
  /* height: calc(100vh - 71px); */
  height: calc(100vh - 86px);
  overflow-x: auto;
}

.wrap-order-list {
  width: 249px;
  /* width: 280px; */
}

.active {
  cursor: grabbing;
}
</style>