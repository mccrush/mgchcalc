<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group">
        <li
          v-for="contact in contacts"
          :key="contact.id"
          class="cursor-pointer list-group-item small lh-1"
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