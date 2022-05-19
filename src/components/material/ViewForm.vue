<template>
  <div class="row">
    <div class="col-12">ViewForm.vue</div>
    <div class="col-12">
      <component v-if="form" :is="form" :item="item" @save-item="saveItem" />
    </div>
  </div>
</template>

<script>
import FormGroup from './FormGroup.vue'
import FormUndergroup from './FormUndergroup.vue'
import FormMaterial from './FormMaterial.vue'

export default {
  components: {
    FormGroup,
    FormUndergroup,
    FormMaterial
  },
  props: ['item'],
  computed: {
    form() {
      if (this.item) {
        const formString =
          'Form' +
          this.item.type.substring(0, 1).toUpperCase() +
          this.item.type.substring(1)
        console.log('formString: ', formString)
        return formString
      } else {
        return ''
      }
    }
  },
  methods: {
    saveItem() {
      console.log('have item for update = ', this.item)
      this.$store.dispatch('updateItem', { item: this.item })
    }
  }
}
</script>