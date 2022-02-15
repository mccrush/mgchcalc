import id from '@/scripts/getId'

export default class Obrabotkatolshina {
  constructor(categoryId) {
    this.id = id
    this.title = '[]'
    this.type = 'obrabotkatolshina'
    this.position = 0
    this.categoryId = categoryId
    this.priceL = 0
    this.priceM = 0
    this.priceS = 0
  }
}