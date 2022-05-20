import getId from './../scripts/getId'

export default class Material {
  constructor(title = '', categoryId = '', undergroupId = '') {
    this.id = getId()
    this.type = 'material'
    this.title = title
    this.description = ''
    this.position = 0
    this.undergroupId = undergroupId
    this.categoryId = categoryId
    this.price = 0
    this.ed = ''
    this.normaothoda = 0
    this.ves = 0
    this.objom = 0
    this.postavchikId = ''
  }
}
