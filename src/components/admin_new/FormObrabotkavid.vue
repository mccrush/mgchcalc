<template>
  <div class="row">
    <!-- Название Обработки -->
    <div class="col-6 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название обработки</label>
      </form>
    </div>

    <!-- Позиция -->
    <div class="col-6 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPosition"
          v-model.number="item.position"
          @blur="$emit('save-item')"
        />
        <label for="inputPosition">Позиция</label>
      </form>
    </div>

    <!-- Комментарий -->
    <div class="col-12 mt-2">
      <form class="form-floating">
        <textarea
          class="form-control form-control-sm border-0"
          id="inputDescription"
          ref="inputDescription"
          v-model.trim="item.description"
          @input="updateTextareaHeight"
          @change="$emit('save-item')"
        ></textarea>
        <label for="inputDescription">Комментарий</label>
      </form>
    </div>
  </div>
</template>


<script>
import { mixinUpdateTextareaHeight } from './../../mixins/mixinUpdateTextareaHeight'

export default {
  props: ['item'],
  emits: ['save-item'],
  mixins: [mixinUpdateTextareaHeight]
}
</script>