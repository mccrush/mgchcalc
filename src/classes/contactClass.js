import getId from './../scripts/getId'

export default class Contact {
  constructor(title = 'Поле', description = 'Значение', position = 1) {
    this.id = getId()
    this.title = title
    this.description = description
    this.position = position
  }
}