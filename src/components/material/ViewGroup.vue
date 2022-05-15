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
        >
          &nbsp;+&nbsp;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ListGroup from './ListGroup.vue'

export default {
  components: {
    ListGroup
  },
  data() {
    return {
      titleNewGroup: ''
    }
  }
}
</script>