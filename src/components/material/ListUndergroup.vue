<template>
  <ul class="list-group list-group-flush">
    <li
      v-for="undergroup in undergroups"
      :key="undergroup.id"
      class="
        cursor-pointer
        list-group-item
        border-white
        d-flex
        justify-content-between
        align-items-center
        lh-1
        p-1
        ps-2
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
        <ButtonTrash
          @click.stop="removeUndergroup(undergroup.type, undergroup.id)"
          class="my-btn-hide border-0"
        />
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
  props: ['groupId'],
  computed: {
    materialUndergroupId() {
      return this.$store.getters.materialUndergroupId
    },
    undergroups() {
      return this.$store.getters.undergroup.filter(
        item => item.groupId === this.groupId
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
    },
    removeUndergroup(type, id) {
      if (
        confirm(
          'Точно удалить? Будут удалены и все материалы принадлежащие этой подгруппе!'
        )
      ) {
        // Сначала удалить всех детей, если они есть
        const childArray = this.$store.getters.material.filter(
          item => item.undergroupId === id
        )
        console.log('В подгруппе столько детей:', childArray.length)
        // Перебирать массив детей и удалять каждый через forEach
        if (childArray.length) {
          childArray.forEach(item => {
            this.$store.dispatch('removeItem', { type: item.type, id: item.id })
          })
        }

        // Затем удалить сам объект
        this.$store.dispatch('removeItem', { type, id })
      }
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  color: #212529;
  /* background-color: #bccee4; */
  background-color: #fff;
}

.my-btn-hide {
  visibility: hidden;
}

.list-group-item.active .my-btn-hide {
  visibility: visible;
}
</style>