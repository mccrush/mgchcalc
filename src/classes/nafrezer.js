import getDateNow from './../scripts/getDateNow'

export default (id, title, orderId, client, dateForReady, rabotaArray) => {
  return {
    id,
    title,
    type: 'nafrezer',
    position: 0,
    client,
    dateCreate: getDateNow(),
    dateFinish: '',
    dateForReady,
    status: 'newfrezer',
    rabotaArray,
    orderId,
    polka: '',
    files: []
  }
}