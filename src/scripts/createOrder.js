import getId from './getId'
import getWeek from './getWeek'
import getDateNow from './getDateNow'

export default (orderNumber, siryoArray, rabotaArray, dopuslugArray, summa) => {
  const id = getId()
  const weekFormat = getWeek() < 10 ? '0' + getWeek() : getWeek()
  const titleFormar = '_' + weekFormat + '_'

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
    summa,
    files: []
  }
}