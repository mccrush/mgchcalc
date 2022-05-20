<template>
  <div class="width-960 bg-white shadow-sm rounded-3 mt-4 m-auto p-3">
    <div class="row">
      <div class="col-12 col-md-3 col-lg-3">
        <ViewMenu />
      </div>

      <div class="col-12 col-md-9 col-lg-9 ps-md-0">
        <ViewContent />
      </div>
    </div>
  </div>
</template>

<script>
import ViewMenu from '../components/material/ViewMenu.vue'
import ViewContent from '../components/material/ViewContent.vue'

export default {
  components: {
    ViewMenu,
    ViewContent
  },
  data() {
    return {
      group: null,
      material: null,
      formItem: null
    }
  },
  computed: {
    groups() {
      return this.$store.getters.group
    },
    materials() {
      if (this.group) {
        return this.$store.getters.material.filter(
          item => item.categoryId === this.group.id
        )
      } else {
        return []
      }
    }
  },
  watch: {
    group(newv, oldv) {
      console.log('new group in watch:', newv)
    },
    material(newv, oldv) {
      console.log('new material in watch:', newv)
    }
    // form(newv, oldv) {
    //   console.log('new form in watch:', newv)
    //   if (newv === 'group') {
    //     this.formItem = this.group
    //   } else if (newv === 'material') {
    //     this.formItem = this.material
    //   }
    // }
  }
}
</script>