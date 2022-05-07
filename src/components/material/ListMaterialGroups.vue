<template>
  <ul class="list-group">
    <li
      v-for="group in materialGroups"
      :key="group.id"
      class="cursor-pointer list-group-item list-group-item-action small lh-1"
    >
      {{ group.title }}
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    materialGroups() {
      return this.$store.getters.materialvid
    }
  }
}
</script>