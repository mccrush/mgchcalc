<template>
  <div class="row">
    <div class="drag-button ms-1 p-0 pb-1">
      <ButtonDrag />
    </div>
    <div class="position-block border small text-center rounded p-0 pt-1">
      {{ item.position }}
    </div>
    <div class="col-10 col-sm-5 col-md-4 ps-1 pe-sm-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.title"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-12 col-sm-5 col-md-2 mt-2 mt-sm-0 pe-md-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select resourse"
        v-model="item.categoryId"
        @change="$emit('save-item', { item })"
      >
        <option v-for="cat in categorys" :key="cat.id" :value="cat.id">
          {{ cat.title }}
        </option>
      </select>
    </div>
    <div class="col-5 col-md-2 mt-2 mt-md-0 pe-0">
      <select
        class="form-select form-select-sm w-100"
        aria-label="Select Ed"
        v-model="item.ed"
        @change="$emit('save-item', { item })"
      >
        <option v-for="(e, idx) in ed" :key="'e' + idx" :value="e">
          {{ e }}
        </option>
      </select>
    </div>
    <div class="col-5 col-md-2 mt-2 mt-md-0 pe-0">
      <input
        type="number"
        class="form-control form-control-sm"
        min="0"
        max="10000"
        step="10"
        v-model.number="item.price"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-2 col-md-1 text-end mt-2 mt-md-0 pe-md-0">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
  </div>
</template>

<script>
import ed from '@/data/ed'

import ButtonDrag from '@/components/buttons/ButtonDrag'
import ButtonTrash from '@/components/buttons/ButtonTrash'

export default {
  components: {
    ButtonDrag,
    ButtonTrash
  },
  props: ['item', 'categoryId', 'categorys'],
  emits: ['save-item', 'remove-item'],
  data() {
    return {
      ed
    }
  }
}
</script>