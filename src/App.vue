<template>
  <div class="container">
    <component :is="myComponent" />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, Modal, Tooltip } from 'bootstrap'

export default {
  name: 'App',
  data() {
    return {
      pathname: JSON.parse(localStorage.getItem('pathname')) || 'calc'
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId
    },
    myComponent() {
      if (this.userId) {
        if (this.pathname === 'admin') {
          return 'Admin'
        } else {
          return 'Calc'
        }
      } else {
        return 'Login'
      }
    }
  }
}
</script>

<style>
.btn:focus,
.btn-check:focus + .btn-outline-dark,
.form-control:focus,
.form-select:focus,
.accordion-button:focus,
.navbar-toggler:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

.cursor-pointer {
  cursor: pointer;
}

.my-h-100 {
  height: calc(100vh - 86px);
}
</style>
