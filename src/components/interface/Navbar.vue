<template>
  <div class="d-flex justify-content-between p-2">
    <div class="progressbar col-3 ps-2 pt-2 pe-2">
      <Progressbar v-if="loading" />
    </div>
    <div class="buttons">
      <button
        v-if="userId"
        class="btn btn-sm btn-outline-light text-muted me-2"
        :class="{ active: pathname === 'making' }"
        @click="$emit('set-path-name', 'making')"
        disabled
      >
        Производство
      </button>
      <button
        v-if="userId"
        class="btn btn-sm btn-outline-light text-muted me-2"
        :class="{ active: pathname === 'order' }"
        @click="$emit('set-path-name', 'order')"
        disabled
      >
        Заказы
      </button>
      <button
        v-if="userId"
        class="btn btn-sm btn-outline-light text-muted me-2"
        :class="{ active: pathname === 'calc' }"
        @click="$emit('set-path-name', 'calc')"
      >
        Калькулятор
      </button>
      <button
        v-if="userId"
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
</template>

<script>
import Progressbar from '@/components/interface/Progressbar'

export default {
  components: {
    Progressbar
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