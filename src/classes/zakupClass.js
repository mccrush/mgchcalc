import getId from './../scripts/getId'
import getDateNow from './../scripts/getDateNow'

export default class Zakup {
  constructor() {
    this.id = getId()
    this.title = 'Закуп'
    this.description = ''
    this.position = 1
    this.zakupNomer = ''
    this.nomerScheta = ''
    this.dateCreate = getDateNow()
    this.postavshikId = ''
    this.prihodEdinicy = ''
    this.prihodRubly = ''
    this.price = ''
  }
}