import getId from './../scripts/getId'

export default class Contact {
  constructor(title = 'Новый контакт', contactName = 'Новый контакт') {
    this.id = getId()
    this.title = title
    this.type = 'contact'
    this.description = ''
    this.position = 1
    this.contactName = contactName
    this.contactNickname = ''
    this.contacts = []
    this.companyId = ''
  }
}