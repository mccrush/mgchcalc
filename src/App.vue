<template>
  <div class="max-width-840 m-auto shadow-sm rounded-3 mt-3">
    <Navbar @set-path-name="setPathName" :pathname="pathname" />
    <div class="container-fluid">
      <component :is="myComponent" />
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
//import { Dropdown, Modal, Tooltip } from 'bootstrap'
import Navbar from '@/components/Navbar'
import Login from '@/views/Login'
import Calc from '@/views/Calc'
import Admin from '@/views/Admin'

export default {
  components: {
    Navbar,
    Login,
    Calc,
    Admin
  },
  data() {
    return {
      pathname: localStorage.getItem('pathname') || 'calc'
    }
  },
  computed: {
    userId() {
      console.log('UserId change in APP:', this.$store.getters.userId)
      return this.$store.getters.userId
    },
    myComponent() {
      if (true) {
        if (this.pathname === 'admin') {
          console.log('myComponent in APP:', 'Admin')
          return 'Login'
        } else {
          console.log('myComponent in APP:', 'Calc')
          return 'Calc'
        }
      } else {
        console.log('myComponent in APP:', 'Login')
        return 'Login'
      }
    }
  },
  methods: {
    setPathName(name) {
      this.pathname = name
      localStorage.setItem('pathname', name)
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

.max-width-840 {
  max-width: 840px;
}
</style>
