import getId from './../scripts/getId.js'

export default class Group {
  constructor(title) {
    this.id = getId()
    this.type = 'group'
    this.title = title
    this.description = ''
    this.position = 0
  }
}
