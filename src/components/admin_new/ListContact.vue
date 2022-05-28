<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group">
        <li
          v-for="contact in contacts"
          :key="contact.id"
          class="cursor-pointer list-group-item small lh-1"
          :class="{ active: contact.id === adminItemId }"
          @click="setAdminItemId(contact.id)"
        >
          {{ contact.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contacts() {
      return this.$store.getters.contact
    },
    adminItemId() {
      return this.$store.getters.adminItemId
    }
  },
  methods: {
    setAdminItemId(id) {
      this.$store.commit('setAdminValue', {
        type: 'adminItemId',
        value: id
      })
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  color: #212529;
  background-color: #bccee4;
  border-color: #bccee4;
}
</style>