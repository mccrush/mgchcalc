<template>
  <div
    class="col-10 col-md-4 col-xl-4 m-auto rounded-3 border shadow-sm mt-4 p-3"
  >
    <h5 class="text-center">Авторизация</h5>
    <label for="email">Email</label>
    <br />
    <input
      type="text"
      class="form-control"
      id="email"
      required
      v-model="email"
      placeholder="example@mail.ru"
    />
    <!-- -->
    <br />
    <label for="password">Password</label>
    <div class="input-group">
      <input
        :type="passType ? 'password' : 'text'"
        class="form-control"
        id="password"
        required
        v-model="password"
        ref="pass"
        maxlength="20"
        @keyup.enter="login"
      />

      <button
        class="btn btn-light p-0 ps-2 pe-2 border"
        type="button"
        @click="passType = !passType"
      >
        <img
          v-if="passType"
          src="/images/work_icons/eye-slash.svg"
          width="24"
          height="24"
          alt="Show password"
          class="opacity-06"
        />
        <img
          v-else
          src="/images/work_icons/eye.svg"
          width="24"
          height="24"
          alt="Hide password"
          class="opacity-06"
        />
      </button>
    </div>

    <button class="btn btn-success w-100 mt-3" @click="login">Войти</button>
    <transition name="fade" mode="out-in">
      <LoginMessage
        v-if="showMessage"
        :message="loginMessage.text"
        :class="loginMessage.type"
      />
    </transition>
  </div>
</template>

<script>
import LoginMessage from './LoginMessage.vue'

export default {
  components: {
    LoginMessage
  },
  data() {
    return {
      email: '',
      password: '',
      passType: true,
      showMessage: false
    }
  },
  computed: {
    loginMessage() {
      return this.$store.getters.loginMessage || ''
    }
  },
  methods: {
    async login() {
      const formData = {
        email: this.email,
        password: this.password
      }

      if (this.email && this.password) {
        try {
          await this.$store.dispatch('logIn', formData)
        } catch (err) {
          if (err.code === 'auth/invalid-email') {
            this.$store.commit('addMessage', 'lee')
          } else if (err.code === 'auth/invalid-password') {
            this.$store.commit('addMessage', 'lpi')
          } else if (err.code === 'auth/wrong-password') {
            this.$store.commit('addMessage', 'lpw')
          } else if (err.code === 'auth/user-not-found') {
            this.$store.commit('addMessage', 'lun')
          } else if (err.code === 'auth/too-many-requests') {
            this.$store.commit('addMessage', 'tmr')
          } else {
            this.$store.commit('addMessage', 'err'),
              console.log('Ошибка:', err.code)
          }
        }
      } else {
        this.$store.commit('addMessage', 'fin')
      }
    }
  },
  watch: {
    loginMessage() {
      if (this.loginMessage) {
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
          this.$store.commit('addMessage', 'null')
        }, 3600)
      }
    }
  }
}
</script>