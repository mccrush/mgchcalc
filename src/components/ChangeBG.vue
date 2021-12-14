<template>
  <div class="position-relative">
    <div class="position-absolute bottom-0 end-0">
      <input
        type="color"
        class="form-control form-control-sm form-control-color"
        title="Изменить цвет фона"
        v-model="bgColor"
        @change="setBG"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgColor: localStorage.getItem('cl-bgcolor') || '#ffffff'
    }
  },
  mounted() {
    this.setBG()
  },
  methods: {
    setBG() {
      let body = document.getElementsByTagName('body')[0]
      body.style.backgroundColor = this.bgColor
      localStorage.setItem('cl-bgcolor', this.bgColor)
    }
  }
}
</script>