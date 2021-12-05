export default (title, groupId, ed = '', price = '') => {
  const item = {
    id: Date.now().toString(),
    title,
    groupId,
    groupTitle: '',
    ed,
    price,
    ostatok: 0,
    type: 'siryo'
  }

  return item
}