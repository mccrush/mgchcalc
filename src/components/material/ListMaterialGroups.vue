<template>
  <div>
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
            @click.stop="$emit('show-modal-material', group)"
            class="my-btn-hide border-0 me-1"
          />
          <ButtonTrash
            @click.stop
            class="my-btn-hide border-0"
            @click="removeGroup(group.type, group.id)"
          />
        </div>
      </li>
    </ul>
    <div class="input-group input-group-sm mt-3">
      <input
        type="text"
        class="form-control"
        placeholder="Новая группа"
        aria-describedby="createNewGroup"
        v-model.trim="titleNewGroup"
        @keyup.enter="addNewGroup"
      />
      <button
        class="btn btn-outline-success"
        type="button"
        id="createNewGroup"
        title="Добавить группу"
        @click="addNewGroup"
      >
        &nbsp;+&nbsp;
      </button>
    </div>
  </div>
</template>

<script>
import Materialvid from './../../classes/materialvidClass.js'

import ButtonEdit from './../buttons/ButtonEdit.vue'
import ButtonTrash from './../buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonEdit,
    ButtonTrash
  },
  props: ['groupId', 'groupNacenka', 'groupOthody'],
  emits: [
    'update:groupId',
    'update:groupNacenka',
    'update:groupOthody',
    'show-modal-material'
  ],
  data() {
    return {
      modalItem: null,
      titleNewGroup: ''
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
    },
    addNewGroup() {
      if (this.titleNewGroup) {
        const item = Object.assign({}, new Materialvid(this.titleNewGroup))
        //console.log('item in listgroup:', item)
        this.$store.dispatch('addItem', { item })
        this.titleNewGroup = ''
      }
    },
    removeGroup(type, id) {
      console.log('id:', id)
      if (
        confirm(
          'Точно удалить? Будут удалены и все материалы принадлежащие этой группе!'
        )
      ) {
        // Сначала удалить всех детей, если они есть
        const childArray = this.$store.getters.material.filter(
          item => item.categoryId === id
        )
        console.log('В группе столько детей:', childArray.length)
        // Перебирать массив детей и удалять каждый через forEach
        if (childArray.length) {
          childArray.forEach(item => {
            console.log('Типа удален:', item)
            //this.$store.dispatch('removeItem', { type: item.type, id: item.id })
          })
        }

        // Затем удалить сам объект
        //this.$store.dispatch('removeItem', { type, id })
      }
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