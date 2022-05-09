import getId from './../scripts/getId.js'

export default class Materialvid {
  constructor(title) {
    this.id = getId()
    this.title = title
    this.type = 'materialvid'
    this.position = 0
    this.nacenka = 0
    this.othody = 0
  }
}
