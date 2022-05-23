<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-start align-items-center mt-2 mt-md-0">
        <ButtonBack />
        <h4 v-if="item" class="m-0 ms-2">{{ item.title }}</h4>
      </div>
      <hr class="mt-2" />
    </div>
    <div class="col-5">
      <FormMaterialInfo v-if="item" :item="item" @save-item="saveItem" />
    </div>
    <div class="col-7"><FormMaterialVkladki /></div>
  </div>
</template>

<script>
import ButtonBack from './../elements/buttons/ButtonBack.vue'
import FormMaterialInfo from './FormMaterialInfo.vue'
import FormMaterialVkladki from './FormMaterialVkladki.vue'

export default {
  components: {
    ButtonBack,
    FormMaterialInfo,
    FormMaterialVkladki
  },
  props: ['item'],
  emits: ['save-item'],
  methods: {
    saveItem() {
      this.$emit('save-item', { item: this.item })
    }
  }
}
</script>