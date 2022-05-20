<template>
  <div class="row">
    <div class="col-5"><FormMaterialInfo v-if="item" :item="item" /></div>
    <div class="col-7"><FormMaterialVkladki /></div>
  </div>
</template>

<script>
import FormMaterialInfo from './FormMaterialInfo.vue'
import FormMaterialVkladki from './FormMaterialVkladki.vue'

export default {
  components: {
    FormMaterialInfo,
    FormMaterialVkladki
  },
  props: ['item']
}
</script>