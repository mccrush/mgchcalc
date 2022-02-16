import id from '@/scripts/getId'

export default class Contact {
  constructor() {
    this.id = id
    this.name = '[]'
    this.type = 'contact'
    this.shortname = ''
    this.phone = ''
    this.email = ''
    this.messengers = []
  }
}