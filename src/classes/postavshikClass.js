import getId from './../scripts/getId'

export default class Postavshik {
  constructor(title = 'Новый поставщик') {
    this.id = getId()
    this.type = 'postavshik'
    this.title = title
    this.description = ''
    this.position = 1
    this.contacts = []
    this.fields = []
  }
}