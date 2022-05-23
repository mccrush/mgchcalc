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
    this.minprice = 1
    this.nacenka = 1
    this.ed = ''
    this.normaothoda = ''
    this.ves = ''
    this.objom = ''
    this.postavshikId = ''
  }
}
