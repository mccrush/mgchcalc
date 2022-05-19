<template>
  <!-- <ul class="list-group">
    <li
      v-for="group in groups"
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
      :class="{ active: group.id === groupId }"
      @click.stop="selectGroup(group)"
    > -->

  <div class="accordion accordion-flush" id="accordionGroup">
    <div v-for="group in groups" :key="group.id" class="accordion-item">
      <h2 class="accordion-header" :id="'heading' + group.id">
        <button
          class="
            accordion-button
            collapsed
            shadow-0
            d-flex
            justify-content-between
            p-1
            ps-2
          "
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + group.id"
          aria-expanded="true"
          :aria-controls="'collapse' + group.id"
          @click.self="setMaterialGroupId(group.id)"
        >
          <span class="small">{{ group.title }}</span>
          <div class="d-flex align-items-center">
            <ButtonEdit
              @click.stop="setMaterialMode"
              class="my-btn-hide border-0 me-1"
            />
            <ButtonTrash
              @click.stop="removeGroup(group.type, group.id)"
              class="my-btn-hide border-0"
            />
          </div>
        </button>
      </h2>
      <div
        :id="'collapse' + group.id"
        class="accordion-collapse collapse"
        :aria-labelledby="'heading' + group.id"
        data-bs-parent="#accordionGroup"
      >
        <div class="accordion-body bg-light p-1">
          <ListUndergroup :groupId="group.id" />
          <div class="input-group input-group-sm mt-1">
            <input
              type="text"
              class="form-control"
              placeholder="Новая подгруппа"
              aria-describedby="createNewGroup"
              v-model.trim="titleNewUndergroup"
              @keyup.enter="addNewUndergroup(group.id)"
            />
            <button
              class="btn btn-outline-success"
              type="button"
              id="createNewGroup"
              title="Добавить подгруппу"
              @click="addNewUndergroup(group.id)"
            >
              &nbsp;+&nbsp;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <span class="small">{{ group.title }}</span>
      <div class="d-flex align-items-center">
        <ButtonEdit
          @click.stop="$emit('update:form', 'group')"
          class="my-btn-hide border-0 me-1"
        />
        <ButtonTrash
          @click.stop
          class="my-btn-hide border-0"
          @click="removeGroup(group.type, group.id)"
        />
      </div>
    </li>
  </ul> -->
</template>

<script>
import 'bootstrap/js/dist/collapse'

import Undergroup from './../../classes/undergroupClass'
import ListUndergroup from './ListUndergroup.vue'
import ButtonEdit from './../elements/buttons/ButtonEdit.vue'
import ButtonTrash from './../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ListUndergroup,
    ButtonEdit,
    ButtonTrash
  },
  data() {
    return {
      titleNewUndergroup: ''
    }
  },
  computed: {
    groups() {
      return this.$store.getters.group
    }
  },
  methods: {
    setMaterialGroupId(id) {
      this.$store.commit('setMaterialValue', {
        type: 'materialGroupId',
        value: id
      })
    },
    setMaterialMode() {
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'edit'
      })
      this.$store.commit('setMaterialValue', {
        type: 'materialForm',
        value: 'FormGroup'
      })
    },
    addNewUndergroup(groupId) {
      if (this.titleNewUndergroup) {
        const item = Object.assign(
          {},
          new Undergroup(this.titleNewUndergroup, groupId)
        )
        //console.log('item in ListGroup.vue:', item)
        this.$store.dispatch('addItem', { item })
        this.titleNewUndergroup = ''
      }
    },
    removeGroup(type, id) {
      if (
        confirm(
          'Точно удалить? Также будут удалены все Подгруппы и Материалы принадлежащие этой Группе!'
        )
      ) {
        // Сначала удалить все подгруппы, если они есть
        const childArray = this.$store.getters.undergroup.filter(
          item => item.groupId === id
        )
        console.log('В Группе столько Подгруп:', childArray.length)

        // Перебирать массив Подгрупп и удалять каждый через forEach
        if (childArray.length) {
          childArray.forEach(item => {
            // Здесь сначала удалить всех детей Подгруппы
            const childArrayMaterial = this.$store.getters.material.filter(
              mater => mater.undergroupId === item.id
            )
            console.log(
              'В Подруппе столько Материалов:',
              childArrayMaterial.length
            )

            if (childArrayMaterial.length) {
              childArrayMaterial.forEach(item => {
                this.$store.dispatch('removeItem', {
                  type: item.type,
                  id: item.id
                })
              })
            }

            this.$store.dispatch('removeItem', { type: item.type, id: item.id })
          })
        }

        // Затем удалить сам объект Группы
        this.$store.dispatch('removeItem', { type, id })
      }
    }
  }
}
</script>

<style scoped>
/* .my-btn-hide {
  visibility: hidden;
} */

.accordion-button:not(.collapsed) {
  color: #fff;
  background-color: #313a46;
  /* box-shadow: inset 0 -1px 0 #313a46; */
}

.accordion-button::after {
  content: none;
}

.accordion-button.collapsed .my-btn-hide {
  visibility: hidden;
}

.accordion-button .my-btn-hide {
  visibility: visible;
}
</style>