import getWeek from './getWeek'
import getDateNow from './getDateNow'

let titleFormar = '_' + getWeek() + '_'

export default (orderNumber, siryoArray, rabotaArray, dopuslugArray) => {
  const item = {
    id: Date.now().toString(),
    title: titleFormar + orderNumber,
    dateCreate: getDateNow,
    dateCreateWeek: getWeek(),
    dateForReady: '',
    dateFinish: '',
    type: 'order',
    status: 'new',
    siryoArray,
    rabotaArray,
    dopuslugArray
  }
  return item
}