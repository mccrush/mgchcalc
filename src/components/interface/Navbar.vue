<template>
  <nav class="
      z-index-1
      navbar navbar-expand-lg navbar-light
      bg-white
      flex-column
      pt-0
      pb-0
    ">
    <div class="progressbar w-100">
      <Progressbar v-if="loading || loadingRT" />
      <ProgressbarOff v-else />
    </div>
    <div class="height-58 container-fluid p-0">
      <div class="
          height-58
          logo-area
          navbar-brand
          d-none d-lg-block
          col-lg-2 col-xxl-1
          me-0
          p-0
          pt-2
        ">
        <img src="/images/logo/logo.svg" height="38" alt="Nafrezer logo" class="m-auto d-block" />
      </div>
      <div class="col-12 col-lg-10 col-xxl-11 d-flex justify-content-between shadow-sm m-0">
        <div class="
              d-flex
              justify-content-end
              align-items-center
              ps-3 pe-1
            ">
          <div class="lh-1 pb-1">
            <span class="fs-4"><strong>Неделя {{ getWeek() }}</strong></span>
            <br />
            <span><small>{{
                getDate()
            }}</small></span>
            <br />
          </div>
        </div>
        <div class="height-58 d-flex justify-content-end m-0 p-0">
          <div class="d-lg-none ps-1 pe-1">
            <button v-if="userId" class="navbar-toggler btn btn-outline-light border mt-2" type="button"
              data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample"
              aria-expanded="false">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class=" d-flex align-items-center ps-1 pe-1">
            <div v-if="pathname === 'order' || pathname === 'nafrezer'" class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckShowArchive"
                :checked="showArchive" @change="setShowArchive" />
              <label class="form-check-label" for="flexSwitchCheckShowArchive">Архивные</label>
            </div>
          </div>
          <div class="
              d-flex
              justify-content-end
              align-items-center
              ps-2 pe-1
            ">
            <div v-if="user" class="text-end lh-1 pe-3 pb-1">
              <span><strong>{{ user.name }}</strong></span>
              <br />
              <span><small>{{ user.roleTitle }}</small></span>
              <br />
            </div>
            <div>
              <button v-if="userId" class="btn btn-outline-light border text-muted" title="Выйти из аккаунта"
                @click="logOut">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { roles } from './../../data/roles'
import getWeek from './../../scripts/getWeek'

import Progressbar from './Progressbar.vue'
import ProgressbarOff from './ProgressbarOff.vue'

export default {
  components: {
    Progressbar,
    ProgressbarOff
  },
  data() {
    return {
      roles
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    loadingRT() {
      return this.$store.getters.loadingRT
    },
    userId() {
      return this.$store.getters.userId
    },
    user() {
      return this.$store.getters.userData
    },
    showArchive() {
      return this.$store.getters.showArchive
    },
    pathname() {
      return this.$store.getters.pathname
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
    },
    setShowArchive() {
      this.$store.commit('setShowArchive', !this.showArchive)
    },
    getWeek() {
      return getWeek()
    },
    getDate() {
      return new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.logo-area {
  background-color: #313a46;
}

.height-58 {
  height: 58px;
}

.z-index-1 {
  z-index: 1;
}

/* .btn {
  font-weight: 500;
}

.active {
  color: #f8f9fa !important;
  background-color: #6c757d !important;
} */
</style>