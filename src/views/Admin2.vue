<template>
  <div>
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
      sortType: 'asc'
    }
  },
  mounted() {
    console.log('mn razdel:', this.razdel)
    console.log('mn categoryId:', this.categoryId)
    console.log('mn searchText:', this.searchText)
    console.log('mn sortType:', this.sortType)
  },
  methods: {
    addItem() {
      const item = createItem(this.razdel, this.categoryId)
      console.log('new item:', item)
      //this.$store.dispatch('addItem', { item })
    }
  },
  watch: {
    razdel(n, o) {
      console.log('razdel n:', this.razdel)
      localStorage.setItem('cl-razdel', this.razdel)
      if (this.razdel === 'obrabotkatolshina' || this.razdel === 'material') {
        this.categoryId = ''
        localStorage.setItem('cl-categoryId', '')
      }
    },
    categoryId(n, o) {
      console.log('categoryId n:', this.categoryId)
      localStorage.setItem('cl-categoryId', this.categoryId)
    },
    searchText(n, o) {
      console.log('searchText n:', this.searchText)
    },
    sortType(n, o) {
      console.log('sortType n:', this.sortType)
    }
  }
}
</script>