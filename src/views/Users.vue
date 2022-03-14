<template>
  <div class="width-960 mt-4 m-auto p-3 pb-1">
    <!-- <div class="row pt-3 border">
      <div class="col-12 col-sm-6 col-md-3"></div>
      <div class="col-12 col-sm-6 col-md-3"></div>
      <div class="col-12 col-sm-6 col-md-3"></div>
      <div class="col-12 col-sm-6 col-md-3"></div>
    </div> -->
    <div v-if="users.length" class="row">
      <div
        v-for="user in users"
        :key="user.email"
        class="col-12 bg-white shadow-sm rounded-3 mt-3 p-3"
      >
        <div class="row lh-sm">
          <div class="col-12 col-sm-4 col-xl-2">
            <strong>Имя</strong><br />
            <small>должность</small>
          </div>
          <div class="col-12 col-sm-6 col-xl-9 mt-3 mt-sm-0">
            Телефон<br />
            {{ user.email }}
          </div>
          <div class="col-12 col-sm-2 col-xl-1 mt-3 mt-sm-0">
            <ButtonEdit />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonEdit from '@/components/buttons/ButtonEdit'

export default {
  components: {
    ButtonEdit
  },
  data() {
    return {
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
  methods: {}
}
</script>