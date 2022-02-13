import id from '@/scripts/getId'

export default class Material {
  constructor() {
    this.id = id
    this.title = '[]'
    this.type = 'material'
    this.position = 0
    this.categoryId = ''
    this.ed = ''
    this.price = 0
  }
}