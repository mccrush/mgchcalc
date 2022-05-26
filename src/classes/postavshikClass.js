import getId from './../scripts/getId'

export default class Postavshik {
  constructor(title = 'Новый') {
    this.id = getId()
    this.type = 'postavshik'
    this.title = title
    this.description = ''
    this.position = 0
    this.contacts = []
  }
}