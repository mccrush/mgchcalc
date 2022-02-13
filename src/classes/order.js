import id from '@/scripts/getId'
import getWeek from '@/scripts/getWeek'
import getDateNow from '@/scripts/getDateNow'

const weekFormat = getWeek() < 10 ? '0' + getWeek() : getWeek()
const titleFormar = '_' + weekFormat + '_'

export default class Order {
  constructor(orderNumber, siryoArray, rabotaArray, dopuslugArray) {
    this.id = id
    this.title = titleFormar + orderNumber
    this.type = 'order'
    this.position = 0
    this.client = ''
    this.dateCreate = getDateNow
    this.dateCreateWeek = getWeek()
    this.dateFinish = ''
    this.dateForReady = ''
    this.status = 'neworder'
    this.siryoArray = siryoArray
    this.rabotaArray = rabotaArray
    this.dopuslugArray = dopuslugArray
    this.files = []
  }
}