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
      :razdel="razdel"
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
  methods: {
    addItem() {
      const item = createItem(this.razdel, this.categoryId)
      console.log('new item:', item)
      //this.$store.dispatch('addItem', { item })
    }
  }
}
</script>