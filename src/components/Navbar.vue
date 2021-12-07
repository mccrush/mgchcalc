<template>
  <div class="d-flex justify-content-between p-2">
    <div class="progressbar col-3 ps-2 pt-2 pe-2">
      <Progressbar v-if="loading" />
    </div>
    <div class="buttons">
      <button
        v-if="pathname === 'admin'"
        class="btn btn-sm btn-light me-2"
        @click="$emit('set-path-name', 'calc')"
      >
        Калькулятор
      </button>
      <button
        v-if="pathname === 'calc'"
        class="btn btn-sm btn-light me-2"
        @click="$emit('set-path-name', 'admin')"
      >
        Админка
      </button>
      <button class="btn btn-sm btn-light text-dark">Выйти</button>
    </div>
  </div>
</template>

<script>
import Progressbar from '@/components/Progressbar'

export default {
  components: {
    Progressbar
  },
  props: ['pathname'],
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>