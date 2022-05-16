import getId from './../scripts/getId'

export default class Material {
  constructor(title = '', categoryId) {
    this.id = getId()
    this.type = 'material'
    this.title = title
    this.description = ''
    this.position = 0
    this.undergroupId = ''
    this.categoryId = categoryId
    this.price = 0
    this.ed = ''
    this.postuplenie = []
  }
}
