import id from '@/scripts/getId'
import getDateNow from '@/scripts/getDateNow'

export default class Nafrezer {
  constructor(title, orderId, client, dateForReady, rabotaArray) {
    this.id = id
    this.title = title
    this.type = 'nafrezer'
    this.position = 0
    this.client = client
    this.dateCreate = getDateNow
    this.dateFinish = ''
    this.dateForReady = dateForReady
    this.status = 'newfrezer'
    this.rabotaArray = rabotaArray
    this.orderId = orderId
    this.polka = ''
    this.files = []
  }
}