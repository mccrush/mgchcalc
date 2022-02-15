<template>
  <div class="row">
    <div class="drag-button ms-1 p-0 pb-1">
      <ButtonDrag />
    </div>
    <div class="position-block border small text-center rounded p-0 pt-1">
      {{ item.position }}
    </div>
    <div class="col-9 col-sm-10 col-md-5 ps-1 pe-md-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.title"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-4 col-md-2 mt-1 mt-md-0 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        placeholder="alias uslugi"
        v-model.trim="item.alias"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-3 col-md-2 mt-1 mt-md-0 pe-0">
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
    <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
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
    <div class="col-2 col-md-1 mt-1 mt-md-0 text-end">
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
  props: ['item'],
  emits: ['save-item', 'remove-item'],
  data() {
    return {
      ed
    }
  }
}
</script>