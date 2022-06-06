<template>
  <div class="row">
    <!-- Название услуги -->
    <div class="col-6 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputTitle"
          v-model.trim="item.title"
          @change="$emit('save-item')"
        />
        <label for="inputTitle">Название услуги</label>
      </form>
    </div>

    <!-- Алиас -->
    <div class="col-6 ps-1">
      <form @submit.prevent class="form-floating">
        <input
          type="text"
          class="form-control form-control-sm"
          id="inputAlias"
          v-model.trim="item.alias"
          @change="$emit('save-item')"
        />
        <label for="inputAlias">Алиас</label>
      </form>
    </div>

    <!-- Единицы -->
    <div class="col-4 mt-2 pe-1">
      <form @submit.prevent class="form-floating">
        <select
          class="form-select form-select-sm"
          id="inputEd"
          v-model="item.ed"
          @change="$emit('save-item')"
        >
          <option v-for="e in ed" :key="e" :value="e">{{ e }}</option>
        </select>
        <label for="inputEd">Единицы</label>
      </form>
    </div>

    <!-- Цена -->
    <div class="col-4 mt-2 ps-1 pe-1">
      <form @submit.prevent class="form-floating">
        <input
          type="number"
          class="form-control form-control-sm"
          id="inputPrice"
          v-model.number="zakup.price"
          @blur="$emit('update-zakup')"
        />
        <label for="inputPrice">Цена</label>
      </form>
    </div>

    <!-- Позиция -->
    <div class="col-4 mt-2 ps-1">
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
import ed from './../../data/ed'
import { mixinUpdateTextareaHeight } from './../../mixins/mixinUpdateTextareaHeight'

export default {
  props: ['item'],
  emits: ['save-item'],
  mixins: [mixinUpdateTextareaHeight],
  data() {
    return {
      ed
    }
  }
}
</script>