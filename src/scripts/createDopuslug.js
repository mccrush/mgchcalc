export default (type) => {
  const item = {
    id: Date.now().toString(),
    title: '[]',
    type,
    alias: '',
    ed: '',
    price: 0
  }

  return item
}