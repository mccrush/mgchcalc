<template>
  <!-- <ButtonSettings data-bs-toggle="offcanvas" href="#settingsBar" /> -->
  <!-- <div class="m-auto shadow-sm bg-white rounded-3 mt-3" :class="widthBlock"> -->
  <div>
    <Navbar />
    <div class="container-fluid">
      <transition name="fade" mode="out-in" appear>
        <component :is="myComponent" @show-modal="showModal" />
      </transition>
    </div>
  </div>
  <ModalMain
    id="modalOrder"
    :item="modalOrder"
    @show-modal="showModal"
    @show-modal-customer="showModalCustomer"
    :mod="mod"
  />
  <ModalMain id="modalNafrezer" :item="modalNafrezer" :mod="mod" />
  <ModalCustomer id="modalCustomer" />
  <!-- <SettingsBar /> -->
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
//import {Offcanvas, Dropdown, Modal, Tooltip } from 'bootstrap'
//import { Modal } from 'bootstrap'
import Modal from 'bootstrap/js/dist/modal'
import Navbar from '@/components/interface/Navbar'
import Login from '@/views/Login'
import Calc from '@/views/Calc'
import Admin from '@/views/Admin'
import KanbanBoard from '@/views/KanbanBoard'
import ButtonSettings from '@/components/buttons/ButtonSettings'
//import SettingsBar from '@/components/interface/SettingsBar'
import ModalMain from '@/components/modal/ModalMain'
import ModalCustomer from '@/components/modal/ModalCustomer'

export default {
  components: {
    Navbar,
    Login,
    Calc,
    Admin,
    KanbanBoard,
    ButtonSettings,
    ModalMain,
    ModalCustomer
  },
  data() {
    return {
      //order: { siryoArray: [], rabotaArray: [], dopuslugArray: [] },
      modalOrder: null,
      modalNafrezer: null,
      mod: '',
      clearForm: ''
    }
  },
  mounted() {
    let body = document.getElementsByTagName('body')[0]
    body.style.backgroundColor = '#f8f9fa'
  },
  computed: {
    pathname() {
      this.modal = null
      return this.$store.getters.pathname
    },
    widthBlock() {
      if (this.pathname === 'order' || this.pathname === 'nafrezer')
        return 'max-width-100'
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
        }
      } else {
        return 'Login'
      }
    }
  },
  methods: {
    showModal({ modal, mod }) {
      //console.log('modal', modal)
      //this.modal = modal
      this.mod = mod
      //console.log('this.mod', this.mod)

      let myModal
      if (modal.type === 'order') {
        this.modalOrder = modal
        myModal = new Modal(document.getElementById('modalOrder'))
      } else if (modal.type === 'nafrezer') {
        this.modalNafrezer = modal
        myModal = new Modal(document.getElementById('modalNafrezer'))
      }

      myModal.show()
    },
    showModalCustomer() {
      const myModalCustomer = new Modal(
        document.getElementById('modalCustomer')
      )
      myModalCustomer.show()
    }
  }
}
</script>

<style>
.btn:focus,
.btn-close:focus,
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
