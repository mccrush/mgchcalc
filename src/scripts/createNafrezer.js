import getDateNow from './getDateNow'

export default (title, orderId, client, dateForReady, rabotaArray) => {
  const item = {
    id: Date.now().toString(),
    title,
    orderId,
    client,
    dateCreate: getDateNow,
    dateForReady,
    dateFinish: '',
    type: 'nafrezer',
    status: 'newfrezer',
    rabotaArray,
    polka: ''
  }
  return item
}