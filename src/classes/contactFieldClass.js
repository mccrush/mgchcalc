import getId from './../scripts/getId'

export default class ContactField {
  constructor(title = 'Поле', description = 'Значение', position = 1) {
    this.id = getId()
    this.title = title
    this.description = description
    this.position = position
  }
}