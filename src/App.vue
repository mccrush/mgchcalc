<template>
  <!-- <ButtonSettings data-bs-toggle="offcanvas" href="#settingsBar" /> -->
  <!-- <div class="m-auto shadow-sm bg-white rounded-3 mt-3" :class="widthBlock"> -->
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <div class="d-none d-lg-block col-lg-2 col-xxl-1 p-0">
          <Sidebar />
        </div>
        <div
          class="offcanvas offcanvas-start d-lg-none ps-0 pe-0"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Меню</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body p-0">
            <SidebarOffcanvas />
          </div>
        </div>

        <div class="my-h-100 col-12 col-lg-10 col-xxl-11 overflow-auto">
          <transition name="fade" mode="out-in" appear>
            <component :is="myComponent" @show-modal="showModal" />
          </transition>
        </div>
      </div>
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
  <ModalUser id="modalUserData" :user="modalUserData" />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import Modal from 'bootstrap/js/dist/modal'

import Navbar from '@/components/interface/Navbar'
import Sidebar from '@/components/interface/Sidebar'
import SidebarOffcanvas from '@/components/interface/SidebarOffcanvas'
import Login from '@/views/Login'
import Calc from '@/views/Calc'
import Admin from '@/views/Admin'
import KanbanBoard from '@/views/KanbanBoard'
import Backup from '@/views/Backup'
import Users from '@/views/Users'
import Material from '@/views/Material2.vue'

import ButtonSettings from '@/components/buttons/ButtonSettings'
import ModalMain from '@/components/modal/ModalMain'
import ModalCustomer from '@/components/modal/ModalCustomer'
import ModalUser from '@/components/modal/ModalUser'

export default {
  components: {
    Navbar,
    Sidebar,
    SidebarOffcanvas,
    Login,
    Calc,
    Admin,
    KanbanBoard,
    Backup,
    Users,
    Material,
    ButtonSettings,
    ModalMain,
    ModalCustomer,
    ModalUser
  },
  data() {
    return {
      //order: { siryoArray: [], rabotaArray: [], dopuslugArray: [] },
      modalOrder: null,
      modalNafrezer: null,
      modalUserData: null,
      mod: '',
      clearForm: ''
    }
  },
  // mounted() {
  //   let body = document.getElementsByTagName('body')[0]
  //   body.style.backgroundColor = '#f8f9fa'
  // },
  computed: {
    pathname() {
      this.modal = null
      return this.$store.getters.pathname
    },
    // widthBlock() {
    //   if (this.pathname === 'order' || this.pathname === 'nafrezer')
    //     return 'max-width-100'
    //   return 'max-width-900'
    // },
    userId() {
      return this.$store.getters.userId
    },
    userData() {
      return this.$store.getters.userData
    },
    myComponent() {
      if (this.userId) {
        if (this.pathname === 'admin' && this.userData.role === '1') {
          return 'Admin'
        } else if (this.pathname === 'calc') {
          return 'Calc'
        } else if (this.pathname === 'order' || this.pathname === 'nafrezer') {
          return 'KanbanBoard'
        } else if (this.pathname === 'backup' && this.userData.role === '1') {
          return 'Backup'
        } else if (this.pathname === 'users') {
          return 'Users'
        } else if (this.pathname === 'material') {
          return 'Material'
        } else {
          return this.myComponent
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
      } else if (modal.type === 'user') {
        this.modalUserData = modal
        myModal = new Modal(document.getElementById('modalUserData'))
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
body {
  /* background-color: #f8f9fa; */
  background-color: #fafbfe;
}

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

.form-check-input:checked {
  background-color: #fd0d5f;
  border-color: #fd0d5f;
}

.cursor-pointer {
  cursor: pointer;
}

.my-h-100 {
  height: calc(100vh - 62px);
}

.width-960 {
  max-width: 960px;
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
