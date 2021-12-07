export default (title, categoryId, priceS, priceM, priceL) => {
  const item = {
    id: Date.now().toString(),
    title,
    categoryId,
    categoryTitle: '',
    priceS,
    priceM,
    priceL,
    type: 'rabota'
  }

  return item
}