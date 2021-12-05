export default (title) => {
  const item = {
    id: Date.now().toString(),
    title,
    type: 'group'
  }

  return item
}