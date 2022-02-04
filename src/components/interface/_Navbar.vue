<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <!-- <div class="row m-0"> -->
    <div class="progressbar col-12 p-0">
      <Progressbar v-if="loading || loadingRT" />
      <ProgressbarOff v-else />
    </div>
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="col-12 pt-2">
          <div class="buttons d-flex justify-content-end">
            <button
              v-if="userId"
              class="btn btn-sm btn-outline-light text-muted me-2"
              :class="{ active: pathname === 'nafrezer' }"
              @click="setPathName('nafrezer')"
            >
              На Фрезер
            </button>
            <button
              v-if="
                userId === 'uNOE7SInyGQbRptYJq7OiQtG7Ol2' ||
                userId === 'rNl0ejcTSIhMycVqx4XhTqVVhAv1' ||
                userId === 'TbUni6NXcqNlqldnorqpfKkWPJ23'
              "
              class="btn btn-sm btn-outline-light text-muted me-2"
              :class="{ active: pathname === 'order' }"
              @click="setPathName('order')"
            >
              Заказы
            </button>
            <button
              v-if="userId"
              class="btn btn-sm btn-outline-light text-muted me-2"
              :class="{ active: pathname === 'calc' }"
              @click="setPathName('calc')"
            >
              Калькулятор
            </button>
            <button
              v-if="
                userId === 'uNOE7SInyGQbRptYJq7OiQtG7Ol2' ||
                userId === 'rNl0ejcTSIhMycVqx4XhTqVVhAv1'
              "
              class="btn btn-sm btn-outline-light text-muted me-2"
              :class="{ active: pathname === 'admin' }"
              @click="setPathName('admin')"
            >
              Админка
            </button>
            <button
              v-if="userId"
              class="btn btn-sm btn-outline-light text-muted"
              @click="logOut"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
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