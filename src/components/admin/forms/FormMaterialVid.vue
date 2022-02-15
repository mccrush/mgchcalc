<template>
  <div>
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
      />
    </div>
    <div class="col-2 col-md-1 text-end">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
    <div class="col-5"></div>
  </div>
</template>


<script>
import ButtonDrag from '@/components/buttons/ButtonDrag'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonDrag,
    ButtonTrash
  },
  props: ['item'],
  emits: ['save-item', 'remove-item']
}
</script>