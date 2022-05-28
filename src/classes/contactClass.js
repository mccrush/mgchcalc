import getId from './../scripts/getId'

export default class Contact {
  constructor(title = 'Новый контакт') {
    this.id = getId()
    this.title = title
    this.type = 'contact'
    this.description = ''
    this.position = 1
    this.contactName = ''
    this.contactNickname = ''
    this.contacts = []
  }
}