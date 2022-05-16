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

  <div class="accordion" id="accordionGroup">
    <div v-for="group in groups" :key="group.id" class="accordion-item">
      <h2 class="accordion-header" :id="'heading' + group.id">
        <button
          class="accordion-button collapsed p-2"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + group.id"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {{ group.title }}
        </button>
      </h2>
      <div
        :id="'collapse' + group.id"
        class="accordion-collapse collapse"
        :aria-labelledby="'headingOne' + group.id"
        data-bs-parent="#accordionGroup"
      >
        <div class="accordion-body p-1">
          <ListUndergroup :groupId="group.id" />
          <div class="input-group input-group-sm mt-3">
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
import ButtonEdit from './../buttons/ButtonEdit.vue'
import ButtonTrash from './../buttons/ButtonTrash.vue'

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
      return this.$store.getters.materialvid
    }
  },
  methods: {
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
    }
  }
}
</script>