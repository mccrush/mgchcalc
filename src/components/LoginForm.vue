<template>
  <div class="col-4 m-auto border shadow-sm mt-4 p-2">
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
      />

      <button
        class="btn btn-light p-0 ps-2 pe-2 border"
        type="button"
        @click="passType = !passType"
      >
        <img
          v-if="passType"
          src="img/work_icons/eye-slash.svg"
          width="24"
          height="24"
          alt="Show password"
          class="opacity-06"
        />
        <img
          v-else
          src="img/work_icons/eye.svg"
          width="24"
          height="24"
          alt="Hide password"
          class="opacity-06"
        />
      </button>
    </div>

    <button class="btn btn-success w-100 mt-3" type="submit">Войти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      passType: true
    }
  },
  methods: {
    login() {
      const formData = {
        email: this.email,
        password: this.password
      }

      if (this.email && this.password) {
        this.$store.dispatch('logIn', formData)
        // this.$emit('log-in')
      }
    }
  }
}
</script>