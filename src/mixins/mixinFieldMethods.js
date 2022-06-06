import FieldClass from './../classes/fieldClass'

export const mixinFieldMethods = {
  methods: {
    addField() {
      if (this.fieldDescription) {
        if (!this.item.fields) {
          this.item.fields = []
        }

        const position = this.item.fields.length + 1
        const newContactField = Object.assign(
          {},
          new FieldClass(this.fieldTitle, this.fieldDescription, this.position)
        )

        this.item.fields.push(newContactField)
        this.$emit('save-item')

        this.fieldTitle = 'Выберите тип поля'
        this.fieldDescription = ''
      }
    },

    removeField(id) {
      this.item.fields = this.item.fields.filter(item => item.id !== id)
      this.$emit('save-item')
    },

    updatePositionFieldUp(id) {
      const formItemIndex = this.item.fields.findIndex(item => item.id === id)
      let formItem = this.item.fields[formItemIndex]
      formItem.position = formItem.position - 1
      this.item.fields[formItemIndex] = formItem
      this.$emit('save-item')
    },

    updatePositionFieldDown(id) {
      const formItemIndex = this.item.fields.findIndex(item => item.id === id)
      let formItem = this.item.fields[formItemIndex]
      formItem.position = formItem.position + 1
      this.item.fields[formItemIndex] = formItem
      this.$emit('save-item')
    }
  }
}