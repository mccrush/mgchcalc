export default (title, categoryId, priceS, priceM, PriceL) => {
  const item = {
    id: Date.now().toString(),
    title,
    categoryId,
    categoryTitle: '',
    priceS,
    priceM,
    PriceL,
    type: 'rabota'
  }

  return item
}