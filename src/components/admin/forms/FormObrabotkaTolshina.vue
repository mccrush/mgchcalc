<template>
  <div>
    <div class="drag-button ms-1 p-0 pb-1">
      <ButtonDrag />
    </div>
    <div class="position-block border small text-center rounded p-0 pt-1">
      {{ item.position }}
    </div>
    <div class="col-10 col-sm-4 col-md-4 ps-1 pe-sm-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model.trim="item.title"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-12 col-sm-6 col-md-3 mt-1 mt-sm-0 pe-md-0">
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
    <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model="item.priceS"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model="item.priceM"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-3 col-md-1 mt-1 mt-md-0 pe-0">
      <input
        type="text"
        class="form-control form-control-sm"
        v-model="item.priceL"
        @change="$emit('save-item', { item })"
      />
    </div>
    <div class="col-3 col-md-1 mt-1 mt-md-0 text-end">
      <ButtonTrash @click="$emit('remove-item', item.id)" />
    </div>
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
  props: ['item', 'categoryId', 'categorys'],
  emits: ['save-item', 'remove-item']
}
</script>