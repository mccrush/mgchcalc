export default (title, type, alias, ed = '', price = '') => {
  const item = {
    id: Date.now().toString(),
    title,
    type,
    alias,
    ed,
    price
  }

  return item
}