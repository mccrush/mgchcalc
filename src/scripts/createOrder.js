import getDateNow from './getDateNow'

let titleFormar = 'Заказ от ' + new Date(getDateNow).getDate() + '.' + (new Date(getDateNow).getMonth() + 1) + '.' + new Date(getDateNow).getFullYear() + ',' + new Date(getDateNow).getHours() + ':' + new Date(getDateNow).getMinutes()

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