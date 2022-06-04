import getId from './../scripts/getId'

export default class Company {
  constructor(title = 'Новая компания') {
    this.id = getId()
    this.title = title
    this.type = 'company'
    this.description = ''
    this.position = 1
    this.contacts = []
    this.fields = []
  }
}