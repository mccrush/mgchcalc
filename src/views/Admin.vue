<template>
  <div>
    <AdminHeader
      v-model:razdel="razdel"
      v-model:categoryId="categoryId"
      v-model:searchText="searchText"
      v-model:sortType="sortType"
      v-model:procent="procent"
      @add-item="addItem"
    />
    <AdminForms
      :type="razdel"
      :categoryId="categoryId"
      :searchText="searchText"
      :sortType="sortType"
      @save-item="saveItem"
      @remove-item="removeItem"
    />
    <AdminFooter />
  </div>
</template>

<script>
import createItem from '@/scripts/createItem'

import AdminHeader from '@/components/admin/AdminHeader'
import AdminForms from '@/components/admin/AdminForms'
import AdminFooter from '@/components/admin/AdminFooter'

export default {
  components: {
    AdminHeader,
    AdminForms,
    AdminFooter
  },
  data() {
    return {
      razdel: localStorage.getItem('cl-razdel') || 'materialvid',
      categoryId: localStorage.getItem('cl-categoryId') || '',
      searchText: '',
      sortType: 'asc',
      procent: 0
    }
  },
  mounted() {
    // console.log('mn razdel:', this.razdel)
    // console.log('mn categoryId:', this.categoryId)
    // console.log('mn searchText:', this.searchText)
    // console.log('mn sortType:', this.sortType)
    setTimeout(() => {
      this.procent = this.materialProcent
    }, 1000)
  },
  computed: {
    materialProcent() {
      if (this.$store.getters.procent.length) {
        return this.$store.getters.procent[0].value
      }
    }
  },
  methods: {
    addItem() {
      //const item = createItem(this.razdel, this.categoryId)
      //const item = Object.assign({}, createItem(this.razdel, this.categoryId))
      const item = createItem(this.razdel, this.categoryId)
      console.log('addItem new item:', item)
      //this.$store.dispatch('addItem', { item })
    },
    saveItem({ item }) {
      if (item.title) {
        //console.log('saveItem 2 item:', item)
        this.$store.dispatch('updateItem', { item })
      }
    },
    removeItem(id) {
      //console.log('removeItem item.id:', id)
      this.$store.dispatch('removeItem', { type: this.razdel, id })
    }
  },
  watch: {
    razdel(n, o) {
      //console.log('razdel n:', this.razdel)
      localStorage.setItem('cl-razdel', this.razdel)
      if (this.razdel === 'obrabotkatolshina' || this.razdel === 'material') {
        this.categoryId = ''
        localStorage.setItem('cl-categoryId', '')
      }
    },
    categoryId(n, o) {
      //console.log('categoryId n:', this.categoryId)
      localStorage.setItem('cl-categoryId', this.categoryId)
    },
    searchText(n, o) {
      //console.log('searchText n:', this.searchText)
    },
    sortType(n, o) {
      //console.log('sortType n:', this.sortType)
    },
    procent(n, o) {
      //console.log('procent n:', this.procent)
      if (n !== this.materialProcent) {
        const item = {
          type: 'procent',
          id: '1639495120848',
          value: this.procent
        }
        this.$store.dispatch('updateItem', { item })
      }
    }
  }
}
</script>