<template>
  <div class="width-960 mt-4 m-auto p-3 pb-1">
    <div v-if="users.length" class="row">
      <div
        v-for="user in users"
        :key="user.email"
        class="col-12 bg-white shadow-sm rounded-3 mt-3 p-3"
      >
        <div class="row lh-sm">
          <div class="col-12 col-sm-4 col-xl-2">
            <strong>{{ user.name }}</strong
            ><br />
            <small class="text-lowercase">{{ getRoleTitle(user.role) }}</small>
          </div>
          <div class="col-12 col-sm-6 col-xl-9 mt-3 mt-sm-0">
            {{ user.phone }}<br />
            {{ user.email }}
          </div>
          <div class="col-12 col-sm-2 col-xl-1 mt-3 mt-sm-0">
            <ButtonEdit @click="$emit('show-modal', { modal: user })" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roles } from '@/data/roles'
import ButtonEdit from '@/components/buttons/ButtonEdit'

export default {
  components: {
    ButtonEdit
  },
  data() {
    return {
      roles,
      users: []
    }
  },
  async mounted() {
    if (!this.$store.getters.user.length) {
      await this.$store.dispatch('getItems', { type: 'user' })
      this.users = this.$store.getters.user
      console.log('users is get')
    } else {
      this.users = this.$store.getters.user
    }
  },
  methods: {
    getRoleTitle(role) {
      return this.roles.find(item => item.role === role).title
    }
  }
}
</script>