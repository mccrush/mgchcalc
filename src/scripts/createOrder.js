import getWeek from './getWeek'
import getDateNow from './getDateNow'

let titleFormar = '_' + getWeek() + '_'

export default (siryoArray, rabotaArray, dopuslugArray) => {
  const item = {
    id: Date.now().toString(),
    title: titleFormar,
    date: getDateNow,
    type: 'order',
    status: 'new',
    siryoArray,
    rabotaArray,
    dopuslugArray
  }
  return item
}