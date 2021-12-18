export default (categoryId) => {
  const item = {
    id: Date.now().toString(),
    title: '[]',
    categoryId,
    categoryTitle: '',
    ed: '',
    price: 0,
    ostatok: 0,
    type: 'siryo'
  }

  return item
}