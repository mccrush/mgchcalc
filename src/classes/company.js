import id from '@/scripts/getId'

export default class Company {
  constructor() {
    this.id = id
    this.title = '[]'
    this.type = 'company'
    this.inn = ''
    this.kpp = ''
    this.ogrn = ''
    this.address = ''
    this.bic = ''
    this.rs = ''
    this.ks = ''
  }
}