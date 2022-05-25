import getId from './../scripts/getId'

export default class Material {
  constructor(title = '', categoryId = '', undergroupId = '', position = 1) {
    this.id = getId()
    this.type = 'material'
    this.title = title
    this.description = ''
    this.position = position
    this.undergroupId = undergroupId
    this.categoryId = categoryId
    this.price = 0
    this.nacenka = 0
    this.minprice = 0
    this.nacenkaMinPrice = 0
    this.ed = ''
    this.normaothoda = ''
    this.ves = ''
    this.objom = ''
    this.postavshikId = ''
    this.minOstatokSklada = ''
  }
}
