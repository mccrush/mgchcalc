import getId from './../scripts/getId'

export default class Postavshik {
  constructor(title = 'Новый') {
    this.id = getId()
    this.type = 'postavshik'
    this.title = title
    this.description = ''
    this.position = 0
    this.contacts = []
    this.address = ''
    this.addressArr = []
    this.contact = ''
    this.phone = ''
    this.phoneArr = []
    this.phone2 = ''
    this.email = ''
    this.whatsapp = ''
    this.telegram = ''
  }
}