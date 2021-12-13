<template>
  <div class="position-relative">
    <div class="position-absolute top-0 end-0">
      <input
        type="color"
        class="form-control form-control-color"
        id="exampleColorInput"
        title="Choose your color"
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