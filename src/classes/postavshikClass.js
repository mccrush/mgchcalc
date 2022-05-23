import getId from './../scripts/getId'

export default class Postavshik {
  constructor(title = 'Новый') {
    this.id = getId()
    this.type = 'postavshik'
    this.title = title
    this.description = ''
    this.position = 0
    this.address = ''
    this.contact = ''
    this.phone = ''
    this.phone2 = ''
    this.email = ''
    this.whatsapp = ''
    this.telegram = ''
  }
}