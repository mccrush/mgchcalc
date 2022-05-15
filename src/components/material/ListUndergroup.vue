<template>
  <ul class="list-group list-group-flush">
    <li
      v-for="undergroup in undergroups"
      :key="undergroup.id"
      class="
        cursor-pointer
        list-group-item list-group-item-action
        d-flex
        justify-content-between
        align-items-center
        lh-1
        p-1
        ps-3
      "
      :class="{ active: undergroup.id === groupId }"
    >
      <span class="small">{{ undergroup.title }}</span>
      <div class="d-flex align-items-center">
        <ButtonEdit class="my-btn-hide border-0 me-1" />
        <ButtonTrash @click.stop class="my-btn-hide border-0" />
      </div>
    </li>
  </ul>
</template>

<script>
import ButtonEdit from './../buttons/ButtonEdit.vue'
import ButtonTrash from './../buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonEdit,
    ButtonTrash
  },
  props: ['groupId'],
  computed: {
    undergroups0() {
      return this.$store.getters.undergroup.filter(
        item => item.groupId === this.groupId
      )
    },
    undergroups() {
      return this.$store.getters.undergroup
    }
  }
}
</script>