<template>
  <div class="row m-0">
    <div class="progressbar col-12 p-0">
      <Progressbar v-if="loading" />
      <ProgressbarOff v-else />
    </div>
    <div class="col-12 pt-2">
      <div class="buttons d-flex justify-content-end">
        <!-- <button
          v-if="userId"
          class="btn btn-sm btn-outline-light text-muted me-2"
          :class="{ active: pathname === 'nafrezer' }"
          @click="$emit('set-path-name', 'nafrezer')"
        >
          На Фрезер
        </button>
        <button
          v-if="userId"
          class="btn btn-sm btn-outline-light text-muted me-2"
          :class="{ active: pathname === 'orders' }"
          @click="$emit('set-path-name', 'orders')"
        >
          Заказы
        </button> -->
        <button
          v-if="userId"
          class="btn btn-sm btn-outline-light text-muted me-2"
          :class="{ active: pathname === 'calc' }"
          @click="$emit('set-path-name', 'calc')"
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
          @click="$emit('set-path-name', 'admin')"
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
</template>

<script>
import Progressbar from '@/components/interface/Progressbar'
import ProgressbarOff from '@/components/interface/ProgressbarOff'

export default {
  components: {
    Progressbar,
    ProgressbarOff
  },
  props: ['pathname'],
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    userId() {
      return this.$store.getters.userId
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
    }
  }
}
</script>