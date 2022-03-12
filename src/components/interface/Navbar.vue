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
      <div class="height-58 col-12 col-lg-11 shadow-sm m-0">
        <button
          class="navbar-toggler ms-2 mt-2"
          type="button"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          aria-controls="offcanvasExample"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->
      <!-- <div
        class="collapse navbar-collapse justify-content-end bg-warning"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-sm-0">
          <li class="nav-item pe-sm-2">
            <button
              v-if="userId"
              class="
                btn btn-outline-light
                text-muted
                w-100
                me-2
                mt-2 mt-sm-0
                ps-1
                pe-1
              "
              :class="{ active: pathname === 'nafrezer' }"
              @click="setPathName('nafrezer')"
            >
              На Фрезер
            </button>
          </li>
          <li class="nav-item pe-sm-2">
            <button
              v-if="
                userId === 'uNOE7SInyGQbRptYJq7OiQtG7Ol2' ||
                userId === 'rNl0ejcTSIhMycVqx4XhTqVVhAv1' ||
                userId === 'TbUni6NXcqNlqldnorqpfKkWPJ23'
              "
              class="btn btn-outline-light text-muted w-100 me-2 mt-2 mt-sm-0"
              :class="{ active: pathname === 'order' }"
              @click="setPathName('order')"
            >
              Заказы
            </button>
          </li>
          <li class="nav-item pe-sm-2">
            <button
              v-if="userId"
              class="
                btn btn-outline-light
                text-muted
                w-100
                me-2
                mt-2 mt-sm-0
                ps-1
                pe-1
              "
              :class="{ active: pathname === 'calc' }"
              @click="setPathName('calc')"
            >
              Калькулятор
            </button>
          </li>
          <li class="nav-item pe-sm-2">
            <button
              v-if="
                userId === 'uNOE7SInyGQbRptYJq7OiQtG7Ol2' ||
                userId === 'rNl0ejcTSIhMycVqx4XhTqVVhAv1'
              "
              class="
                btn btn-outline-light
                text-muted
                w-100
                me-2
                mt-2 mt-sm-0
                ps-1
                pe-1
              "
              :class="{ active: pathname === 'admin' }"
              @click="setPathName('admin')"
            >
              Админка
            </button>
          </li>
          <li class="nav-item">
            <button
              v-if="userId"
              class="btn btn-outline-light text-muted w-100 me-2 mt-2 mt-sm-0"
              @click="logOut"
            >
              Выйти
            </button>
          </li>
        </ul>
      </div> -->
    </div>
  </nav>
</template>

<script>
import 'bootstrap/js/dist/collapse'
import Progressbar from '@/components/interface/Progressbar'
import ProgressbarOff from '@/components/interface/ProgressbarOff'

export default {
  components: {
    Progressbar,
    ProgressbarOff
  },
  computed: {
    pathname() {
      return this.$store.getters.pathname
    },
    loading() {
      return this.$store.getters.loading
    },
    loadingRT() {
      return this.$store.getters.loadingRT
    },
    userId() {
      return this.$store.getters.userId
    }
  },
  methods: {
    setPathName(path) {
      this.$store.commit('setPath', path)
    },
    async logOut() {
      await this.$store.dispatch('logOut')
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