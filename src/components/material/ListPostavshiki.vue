<template>
  <div class="list-group list-group-flush">
    <button
      v-for="postavshik in postavshiki"
      :key="postavshik.id"
      type="button"
      class="list-group-item list-group-item-action small lh-1 p-1 ps-2 pe-2"
      :class="{ active: postavshik.id === materialPostavshikId }"
      aria-current="true"
      @click="setMaterialPostavshikId(postavshik.id)"
    >
      {{ postavshik.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['postavshiki'],
  computed: {
    materialPostavshikId() {
      return this.$store.getters.materialPostavshikId
    }
  },
  methods: {
    setMaterialPostavshikId(id) {
      this.$store.commit('setMaterialValue', {
        type: 'materialPostavshikId',
        value: id
      })
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  z-index: 2;
  color: #212529;
  background-color: #bccee4;
  border-color: #bccee4;
}
</style>