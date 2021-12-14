<template>
  <input
    type="text"
    class="form-control form-control-sm"
    placeholder="Поиск"
    v-model.trim="search"
    @input="$emit('search', search)"
  />
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}
</script>