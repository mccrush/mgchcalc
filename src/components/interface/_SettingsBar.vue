<template>
  <div
    class="offcanvas offcanvas-end shadow border-0"
    tabindex="-1"
    data-bs-backdrop="false"
    id="settingsBar"
    aria-labelledby="settingsPanel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="settingsPanel">Настройки</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div>Цвет фона</div>
      <div class="d-flex mt-2">
        <button
          v-for="color in colors"
          :key="color.name"
          class="btn btn-sm border rounded-3 me-2 p-1"
          @click="getBG(color.color)"
        >
          <div :class="color.name" class="rounded-3 p-1 ps-2 pe-2">
            &nbsp;&nbsp;
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        { color: '#ffffff', name: 'bg-white' },
        { color: '#f8f9fa', name: 'bg-light' },
        { color: '#6c757d', name: 'bg-secondary' },
        { color: '#0d6efd', name: 'bg-primary' },
        { color: '#0dcaf0', name: 'bg-info' },
        { color: '#198754', name: 'bg-success' },
        { color: '#ffc107', name: 'bg-warning' }
      ],
      bgColor: localStorage.getItem('cl-bgcolor') || '#f8f9fa'
    }
  },
  mounted() {
    this.setBG()
  },
  methods: {
    getBG(color) {
      this.bgColor = color
      localStorage.setItem('cl-bgcolor', color)
      this.setBG()
    },
    setBG() {
      let body = document.getElementsByTagName('body')[0]
      body.style.backgroundColor = this.bgColor
    }
  }
}
</script>