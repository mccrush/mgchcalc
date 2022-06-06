import getId from './../scripts/getId'

export default class Dopuslug {
  constructor(title = 'Новая услуга') {
    this.id = getId()
    this.type = 'dopuslug'
    this.title = title
    this.description = ''
    this.position = 1
    this.ed = ''
    this.price = 0
    this.alias = ''
  }
}