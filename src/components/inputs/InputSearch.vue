<template>
  <input
    type="text"
    class="form-control form-control-sm"
    placeholder="Поиск"
    :value="search"
    @input="$emit('update:search', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['search'],
  emits: ['update:search']
}
</script>