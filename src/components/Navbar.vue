<template>
  <div class="d-flex justify-content-between p-2 border border-success">
    <div class="logo"></div>
    <div class="buttons">
      <button
        class="btn btn-sm btn-light me-2"
        @click="$emit('set-path-name', 'calc')"
      >
        Калькулятор
      </button>
      <button
        class="btn btn-sm btn-light me-2"
        @click="$emit('set-path-name', 'admin')"
      >
        Сырье
      </button>
      <button class="btn btn-sm btn-light text-dark">Выйти</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>