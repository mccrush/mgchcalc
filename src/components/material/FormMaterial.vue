<template>
  <div class="row">
    <div class="col-4"><FormMaterialInfo /></div>
    <div class="col-8"><FormMaterialVkladki /></div>
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