export default (title, categoryId, ed = '', price = '') => {
  const item = {
    id: Date.now().toString(),
    title,
    categoryId,
    categoryTitle: '',
    ed,
    price,
    ostatok: 0,
    type: 'siryo'
  }

  return item
}