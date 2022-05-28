<template>
  <div class="row">
    <div class="drag-button ms-1 p-0 pb-1">
      <ButtonDrag />
    </div>
    <div class="position-block border small text-center rounded p-0 pt-1">
      {{ item.position }}
    </div>
    <div class="col-8 col-md-6 ps-1 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.title"
        @change="$emit('save-item', { item })"
        draggable="true"
      />
    </div>
    <div class="col-2 col-md-1 text-end">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
    <div class="col-5"></div>
  </div>
</template>


<script>
import ButtonDrag from './../../elements/buttons/ButtonDrag.vue'
import ButtonTrash from './../../elements/buttons/ButtonTrash.vue'

export default {
  components: {
    ButtonDrag,
    ButtonTrash
  },
  props: ['item'],
  emits: ['save-item', 'remove-item']
}
</script>