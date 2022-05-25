<template>
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-start align-items-center mt-2 mt-md-0">
        <ButtonBack @click="showListMaterial" />
        <input
          type="text"
          class="form-control border-0 fw-bold fs-5 p-0 ps-2"
          v-model.trim="item.title"
          @change="saveItem"
        />
        <!-- <h4 v-if="item" class="m-0 ms-2">{{ item.title }}</h4> -->
      </div>
      <hr class="mt-2" />
    </div>
    <div class="col-5 col-xl-3 pe-0">
      <FormMaterialInfo v-if="item" :item="item" @save-item="saveItem" />
    </div>
    <div class="col-7 col-xl-9">
      <FormMaterialVkladki v-if="item" :item="item" @save-item="saveItem" />
    </div>
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
    },
    showListMaterial() {
      this.$store.commit('setMaterialValue', {
        type: 'materialMode',
        value: 'show'
      })
    }
  }
}
</script>