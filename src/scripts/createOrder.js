import getWeek from './getWeek'
import getDateNow from './getDateNow'

const weekFormat = getWeek() < 10 ? '0' + getWeek() : getWeek()
const titleFormar = '_' + weekFormat + '_'

export default (orderNumber, client, siryoArray, rabotaArray, dopuslugArray) => {
  const item = {
    id: Date.now().toString(),
    title: titleFormar + orderNumber,
    client: '',
    dateCreate: getDateNow,
    dateCreateWeek: getWeek(),
    dateForReady: '',
    dateFinish: '',
    type: 'order',
    status: 'neworder',
    siryoArray,
    rabotaArray,
    dopuslugArray
  }
  return item
}