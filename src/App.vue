<template>
  <!-- <ButtonSettings data-bs-toggle="offcanvas" href="#settingsBar" /> -->
  <div class="m-auto shadow-sm bg-white rounded-3 mt-3" :class="widthBlock">
    <Navbar @set-path-name="setPathName" :pathname="pathname" />
    <div class="container-fluid">
      <transition name="fade" mode="out-in" appear>
        <component :is="myComponent" @edit-order="editOrder" />
      </transition>
    </div>
  </div>
  <ModalOrder v-if="order" :order="order" :mod="mod" id="staticBackdrop" />
  <!-- <SettingsBar /> -->
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
//import {Offcanvas, Dropdown, Modal, Tooltip } from 'bootstrap'
import { Modal } from 'bootstrap'
import Navbar from '@/components/interface/Navbar'
import Login from '@/views/Login'
import Calc from '@/views/Calc'
import Admin from '@/views/Admin'
import KanbanBoard from '@/views/KanbanBoard'
import Orders from '@/views/Orders'
import NaFrezer from '@/views/NaFrezer'
import ButtonSettings from '@/components/buttons/ButtonSettings'
//import SettingsBar from '@/components/interface/SettingsBar'
import ModalOrder from '@/components/interface/ModalOrder'

export default {
  components: {
    Navbar,
    Login,
    Calc,
    Admin,
    KanbanBoard,
    Orders,
    NaFrezer,
    ButtonSettings,
    ModalOrder
  },
  data() {
    return {
      pathname: localStorage.getItem('cl-pathname') || 'calc',
      order: { siryoArray: [], rabotaArray: [], dopuslugArray: [] },
      mod: ''
    }
  },
  mounted() {
    let body = document.getElementsByTagName('body')[0]
    body.style.backgroundColor = '#f8f9fa'
  },
  computed: {
    widthBlock() {
      if (this.pathname === 'orders') return 'max-width-100'
      return 'max-width-900'
    },
    userId() {
      return this.$store.getters.userId
    },
    myComponent() {
      if (this.userId) {
        if (this.pathname === 'admin') {
          return 'Admin'
        } else if (this.pathname === 'calc') {
          return 'Calc'
        } else if (this.pathname === 'order' || this.pathname === 'nafrezer') {
          return 'KanbanBoard'
          //return 'Orders'
        }
        // else if (this.pathname === 'nafrezer') {
        //   return 'NaFrezer'
        // }
      } else {
        return 'Login'
      }
    }
  },
  methods: {
    setPathName(name) {
      this.pathname = name
      localStorage.setItem('cl-pathname', name)
    },
    editOrder({ order, mod }) {
      this.order = order
      this.mod = mod
      var myModal = new Modal(document.getElementById('staticBackdrop'))
      myModal.show()
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

.form-check-input:focus {
  border-color: rgba(0, 0, 0, 0.25);
  outline: 0;
  box-shadow: none;
}

.cursor-pointer {
  cursor: pointer;
}

.my-h-100 {
  height: calc(100vh - 86px);
}

.max-width-900 {
  max-width: 900px;
}

.max-width-100 {
  max-width: 1870px;
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
