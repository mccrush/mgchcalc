import getWeek from './../scripts/getWeek'
import getDateNow from './../scripts/getDateNow'

const weekFormat = getWeek() < 10 ? '0' + getWeek() : getWeek()
const titleFormar = '_' + weekFormat + '_'

export default (id, orderNumber, siryoArray, rabotaArray, dopuslugArray) => {
  return {
    id,
    title: titleFormar + orderNumber,
    type: 'order',
    position: 0,
    client: '',
    dateCreate: getDateNow(),
    dateCreateWeek: getWeek(),
    dateFinish: '',
    dateForReady: '',
    status: 'neworder',
    siryoArray,
    rabotaArray,
    dopuslugArray,
    files: []
  }
}