import getId from './../scripts/getId'

export default class Modification {
  constructor(title = 'Новая модификация', position = 1, postavshikId = '') {
    this.id = getId()
    this.title = title
    this.description = ''
    this.position = position
    this.postavshikId = postavshikId
    this.ed = ''
    this.shirina = ''
    this.visota = ''
    this.objom = ''
    this.ves = ''
    this.metrovvliste = ''
  }
}