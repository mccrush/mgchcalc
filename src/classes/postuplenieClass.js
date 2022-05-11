import getId from './../scripts/getId'
import getDateNow from './../scripts/getDateNow'

export default class Postuplenie {
  constructor(obyom = 0, cena = 0, postavshikId = '') {
    this.id = getId()
    this.type = 'postuplenie'
    this.title = ''
    this.description = ''
    this.datePostuplenie = getDateNow()
    this.obyom = obyom
    this.cena = cena
    this.postavshikId = postavshikId
  }
}
