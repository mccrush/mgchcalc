export default (type) => {
  const item = {
    id: Date.now().toString(),
    title: '[]',
    type
  }

  return item
}