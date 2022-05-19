<template>
  <div class="row">
    <div class="col-12">
      <ListGroup />
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
  </div>
</template>

<script>
import Group from './../../classes/groupClass'
import ListGroup from './ListGroup.vue'

export default {
  components: {
    ListGroup
  },
  data() {
    return {
      titleNewGroup: ''
    }
  },
  methods: {
    addNewGroup() {
      if (this.titleNewGroup) {
        const item = Object.assign({}, new Group(this.titleNewGroup))
        //console.log('item in ViewGroup.vue:', item)
        this.$store.dispatch('addItem', { item })
        this.titleNewGroup = ''
      }
    }
  }
}
</script>