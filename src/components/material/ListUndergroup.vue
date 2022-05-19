<template>
  <ul class="list-group list-group-flush">
    <li
      v-for="undergroup in undergroups"
      :key="undergroup.id"
      class="
        cursor-pointer
        list-group-item
        bg-light
        border-white
        d-flex
        justify-content-between
        align-items-center
        lh-1
        p-1
        ps-4
      "
      :class="{ active: undergroup.id === materialUndergroupId }"
      @click="setMaterialUndergroupId(undergroup.id)"
    >
      <span class="small">{{ undergroup.title }}</span>
      <div class="d-flex align-items-center">
        <ButtonEdit
          @click.stop="setMaterialMode"
          class="my-btn-hide border-0 me-1"
        />
        <ButtonTrash @click.stop class="my-btn-hide border-0" />
      </div>
    </li>
  </ul>
</template>

<script>
import ButtonEdit from './../elements/buttons/ButtonEdit.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonEdit,
    ButtonTrash
  },
  computed: {
    materialGroupId() {
      return this.$store.getters.materialGroupId
    },
    materialUndergroupId() {
      return this.$store.getters.materialUndergroupId
    },
    undergroups() {
      return this.$store.getters.undergroup.filter(
        item => item.groupId === this.materialGroupId
      )
    }
  },
  methods: {
    setMaterialUndergroupId(id) {
      this.$store.commit('setMaterialValue', {
        type: 'materialUndergroupId',
        value: id
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'show'
      })
    },
    setMaterialMode() {
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'edit'
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialForm',
        value: 'FormUndergroup'
      })
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  color: #212529;
}

.my-btn-hide {
  visibility: hidden;
}

.list-group-item.active .my-btn-hide {
  visibility: visible;
}
</style>