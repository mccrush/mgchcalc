<template>
  <input
    type="text"
    class="form-control form-control-sm"
    placeholder="Поиск"
    :value="searchText"
    @input="$emit('update:searchText', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['searchText'],
  emits: ['update:searchText']
}
</script>