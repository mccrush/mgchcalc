<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white flex-column pt-0 pb-0"
  >
    <div class="progressbar w-100">
      <Progressbar v-if="loading || loadingRT" />
      <ProgressbarOff v-else />
    </div>
    <div class="height-58 container-fluid p-0">
      <div
        class="
          height-58
          logo-area
          navbar-brand
          d-none d-lg-block
          col-lg-2 col-xxl-1
          me-0
          p-0
          ps-3
          pt-3
          pe-3
          pb-2
        "
      >
        <img src="/images/logo2/favicon-32x32.png" width="32" alt="Calc logo" />
      </div>
      <div class="col-12 col-lg-10 col-xxl-11 shadow-sm m-0">
        <div class="height-58 row m-0 p-0">
          <div class="col-2 d-lg-none">
            <button
              v-if="userId"
              class="navbar-toggler btn btn-outline-light border mt-2"
              type="button"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              aria-controls="offcanvasExample"
              aria-expanded="false"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="col-2 d-flex align-items-center">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckShowArchive"
                :checked="showArchive"
                @change="setShowArchive"
              />
              <label class="form-check-label" for="flexSwitchCheckShowArchive"
                >Архивные</label
              >
            </div>
          </div>
          <div
            class="
              col-8 col-lg-10
              d-flex
              justify-content-end
              align-items-center
            "
          >
            <div v-if="user" class="text-end lh-1 pe-3 pb-1">
              <span
                ><strong>{{ user.name }}</strong></span
              >
              <br />
              <span
                ><small>{{ user.roleTitle }}</small></span
              >
              <br />
            </div>
            <div>
              <button
                v-if="userId"
                class="btn btn-outline-light border text-muted"
                title="Выйти из аккаунта"
                @click="logOut"
              >
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
import { roles } from '@/data/roles'
import Progressbar from '@/components/interface/Progressbar'
import ProgressbarOff from '@/components/interface/ProgressbarOff'

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
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
    },
    setShowArchive() {
      this.$store.commit('setShowArchive', !this.showArchive)
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

/* .btn {
  font-weight: 500;
}

.active {
  color: #f8f9fa !important;
  background-color: #6c757d !important;
} */
</style>