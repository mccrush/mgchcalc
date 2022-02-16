import getId from './getId'
import getWeek from './getWeek'
import getDateNow from './getDateNow'

const weekFormat = getWeek() < 10 ? '0' + getWeek() : getWeek()
const titleFormar = '_' + weekFormat + '_'

export default (orderNumber, siryoArray, rabotaArray, dopuslugArray) => {
  const id = getId()
  return {
    id,
    title: titleFormar + orderNumber,
    client: '',
    dateCreate: getDateNow(),
    dateCreateWeek: getWeek(),
    dateForReady: '',
    dateFinish: '',
    type: 'order',
    status: 'neworder',
    siryoArray,
    rabotaArray,
    dopuslugArray,
    files: []
  }
}