import getDateNow from './getDateNow'

export default (siryoArray, rabotaArray) => {
  const item = {
    id: Date.now().toString(),
    title: '',
    date: getDateNow,
    siryoArray,
    rabotaArray
  }
  return item
}