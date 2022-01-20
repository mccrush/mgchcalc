<template>
  <div class="modal-footer p-2">
    <button
      v-if="mod === 'edit'"
      type="button"
      class="btn btn-outline-danger"
      @click="$emit('remove-item')"
      data-bs-dismiss="modal"
    >
      Удалить <slot name="modal-footer">элемент</slot>
    </button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Отмена
    </button>
    <button
      v-if="mod === 'create'"
      type="button"
      class="btn btn-success"
      data-bs-dismiss="modal"
      @click="$emit('save-item')"
    >
      Сохранить заказ и закрыть окно
    </button>
    <!-- <slot name="modal-footer">---</slot> -->
  </div>
</template>

<script>
export default {
  props: ['mod']
}
</script>