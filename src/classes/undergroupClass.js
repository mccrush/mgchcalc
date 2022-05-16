import getId from './../scripts/getId.js'

export default class Undergroup {
  constructor(title = '', groupId = '') {
    this.id = getId()
    this.type = 'undergroup'
    this.title = title
    this.description = ''
    this.groupId = groupId
    this.position = 0
  }
}
