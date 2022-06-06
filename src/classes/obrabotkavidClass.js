import getId from './../scripts/getId'

export default class Obrabotkavid {
  constructor(title = 'Новая обработка') {
    this.id = getId()
    this.type = 'obrabotkavid'
    this.title = title
    this.description = ''
    this.position = 1
  }
}