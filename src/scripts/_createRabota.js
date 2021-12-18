export default (categoryId) => {
  const item = {
    id: Date.now().toString(),
    title: '[]',
    categoryId,
    categoryTitle: '',
    priceS: 0,
    priceM: 0,
    priceL: 0,
    type: 'rabota'
  }

  return item
}