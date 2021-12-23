import getDateNow from './getDateNow'

export default () => {
  const item = {
    id: Date.now().toString(),
    title: '',
    date: getDateNow,
    type: 'order'
  }
  return item
}