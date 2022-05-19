<template>
  <select
    class="form-select form-select-sm w-100"
    aria-label="Select group resourse"
  >
    <option v-for="elem in array" :key="elem.id" :value="elem.id">
      {{ elem.title }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['array']
}
</script>