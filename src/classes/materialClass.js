import getId from './../scripts/getId'

export default class Material {
  constructor(title = '', categoryId) {
    this.id = getId()
    this.title = title
    this.type = 'material'
    this.description = ''
    this.position = 0
    this.categoryId = categoryId
    this.price = 0
    this.ed = ''
    this.postupleniya = []
  }
}
