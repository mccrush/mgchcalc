<template>
  <div class="max-width-840 m-auto shadow bg-white rounded-3 mt-3">
    <Navbar @set-path-name="setPathName" :pathname="pathname" />
    <div class="container-fluid">
      <transition name="fade" mode="out-in" appear>
        <component :is="myComponent" />
      </transition>
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
import ChangeBG from '@/components/ChangeBG'

export default {
  components: {
    Navbar,
    Login,
    Calc,
    Admin,
    ChangeBG
  },
  data() {
    return {
      pathname: localStorage.getItem('cl-pathname') || 'calc'
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
  },
  methods: {
    setPathName(name) {
      this.pathname = name
      localStorage.setItem('cl-pathname', name)
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
  max-width: 920px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
