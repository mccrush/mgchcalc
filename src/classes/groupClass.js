import getId from './../scripts/getId.js'

export default class Group {
  constructor(title) {
    this.id = getId()
    this.title = title
    this.type = 'group'
    this.position = 0
  }
}
