import getId from './../scripts/getId.js'

export default class Undergroup {
  constructor(title = '', groupId = '') {
    this.id = getId()
    this.title = title
    this.type = 'undergroup'
    this.groupId = groupId
    this.position = 0
    this.nacenka = 0
    this.othody = 0
  }
}
