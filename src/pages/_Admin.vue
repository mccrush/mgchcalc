<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3 pb-1">
    <AdminHeader
      v-model:razdel="razdel"
      v-model:categoryId="categoryId"
      v-model:searchText="searchText"
      v-model:sortType="sortType"
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
  </div>
</template>

<script>
import createItem from './../scripts/createItem'

import AdminHeader from './../components/admin/AdminHeader.vue'
import AdminForms from './../components/admin/AdminForms.vue'

export default {
  components: {
    AdminHeader,
    AdminForms
  },
  data() {
    return {
      razdel: localStorage.getItem('cl-razdel') || 'obrabotkavid',
      categoryId: localStorage.getItem('cl-categoryId') || '',
      searchText: '',
      sortType: 'asc'
    }
  },
  mounted() {},
  methods: {
    addItem() {
      const item = createItem(this.razdel, this.categoryId)
      console.log('addItem new item:', item)
      this.$store.dispatch('addItem', { item })
    },
    saveItem({ item }) {
      if (item.title || item.name) {
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
    }
  }
}
</script>