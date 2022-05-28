<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12"><AdminHeader /></div>
      <div class="col-3 mt-2">
        <!-- <component :is="adminList" /> -->
        <AdminList />
      </div>
      <div class="col-9 ps-0 mt-2">
        <component
          v-if="item"
          :item="item"
          :is="adminForm"
          @save-item="saveItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from './../components/admin_new/AdminHeader.vue'
import AdminList from './../components/admin_new/AdminList.vue'

import FormContact from './../components/admin_new/FormContact.vue'

export default {
  components: {
    AdminHeader,
    AdminList,
    FormContact
  },
  data() {
    return {}
  },
  computed: {
    adminRazdel() {
      return this.$store.getters.adminRazdel
    },

    adminList() {
      return this.$store.getters.adminList
    },

    adminForm() {
      return this.$store.getters.adminForm
    },

    adminItemId() {
      return this.$store.getters.adminItemId
    },

    item() {
      if (this.adminRazdel) {
        console.log('this.adminRazdel:', this.adminRazdel)
        return (
          this.$store.getters[this.adminRazdel].find(
            item => item.id === this.adminItemId
          ) || null
        )
      } else {
        return null
      }
    }
  },
  methods: {
    saveItem() {
      this.$store.dispatch('updateItem', { item: this.item })
    }

    // removeItem(id) {
    //   this.$store.dispatch('removeItem', { type: this.type, id })
    // }
  }
}
</script>