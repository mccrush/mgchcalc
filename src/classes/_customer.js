import id from '@/scripts/getId'

export default class Customer {
  constructor() {
    this.id = id
    this.title = '[]'
    this.type = 'customer'
    this.address = ''
    this.inn = ''
    this.kpp = ''
    this.ogrn = ''
    this.bic = ''
    this.rs = ''
    this.ks = ''
  }
}