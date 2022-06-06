export const mixinUpdateTextareaHeight = {
  mounted() {
    this.updateTextareaHeight()
  },
  methods: {
    updateTextareaHeight() {
      let inputDescription = this.$refs.inputDescription
      const newHeight = inputDescription.scrollHeight
      inputDescription.style.height = newHeight + 'px'
    }
  }
}