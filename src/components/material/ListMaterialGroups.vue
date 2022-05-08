<template>
  <ul class="list-group">
    <li
      v-for="group in materialGroups"
      :key="group.id"
      class="
        cursor-pointer
        list-group-item list-group-item-action
        d-flex
        justify-content-between
        align-items-center
        lh-1
        p-1
        ps-2
      "
      :class="{ active: groupId === group.id }"
      @click="emitsGroup(group.id, group.nacenka, group.othody)"
    >
      <span class="small">{{ group.title }}</span>
      <div class="d-flex align-items-center">
        <ButtonEdit
          @click.stop="modalItem = group"
          class="my-btn-hide border-0 me-1"
          data-bs-toggle="modal"
          data-bs-target="#modalMaterial"
        />
        <ButtonTrash @click.stop class="my-btn-hide border-0 disabled" />
      </div>
    </li>
  </ul>
  <ModalMaterial formType="ListMaterialGroups" :item="modalItem" />
</template>

<script>
import ModalMaterial from './ModalMaterial.vue'
import ButtonEdit from './../buttons/ButtonEdit.vue'
import ButtonTrash from './../buttons/ButtonTrash.vue'

export default {
  components: {
    ModalMaterial,
    ButtonEdit,
    ButtonTrash
  },
  props: ['groupId', 'groupNacenka', 'groupOthody'],
  emits: ['update:groupId', 'update:groupNacenka', 'update:groupOthody'],
  data() {
    return {
      modalItem: null
    }
  },
  computed: {
    materialGroups() {
      return this.$store.getters.materialvid
    }
  },
  methods: {
    emitsGroup(groupId, groupNacenka, groupOthody) {
      this.$emit('update:groupId', groupId)
      this.$emit('update:groupNacenka', groupNacenka)
      this.$emit('update:groupOthody', groupOthody)
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  color: #fff;
  background-color: #313a46;
  border-color: #313a46;
}

.my-btn-hide {
  visibility: hidden;
}

.list-group-item.active .my-btn-hide {
  visibility: visible;
}
</style>