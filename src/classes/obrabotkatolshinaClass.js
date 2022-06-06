import getId from './../scripts/getId'

export default class Obrabotkatolshina {
  constructor(title = 'Новая толщина', categoryId = '') {
    this.id = getId()
    this.type = 'obrabotkatolshina'
    this.title = title
    this.description = ''
    this.position = 1
    this.categoryId = categoryId
    this.priceL = 0
    this.priceM = 0
    this.priceS = 0
  }
}