<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12"><AdminHeader /></div>
      <div class="col-3 mt-2">
        <component :is="adminList" />
      </div>
      <div class="col-9 ps-0 mt-2">
        <component v-if="item" :item="item" :is="adminForm" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from './../components/admin_new/AdminHeader.vue'
import ListContact from './../components/admin_new/ListContact.vue'
import ListObrabotkavid from './../components/admin_new/ListObrabotkavid.vue'

import FormContact from './../components/admin_new/FormContact.vue'

export default {
  components: {
    AdminHeader,
    ListContact,
    ListObrabotkavid,
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
  }
  // methods: {
  //   saveItem({ item }) {
  //     if (item.title || item.name) {
  //       this.$store.dispatch('updateItem', { item })
  //     }
  //   },

  //   removeItem(id) {
  //     this.$store.dispatch('removeItem', { type: this.type, id })
  //   }
  // }
}
</script>