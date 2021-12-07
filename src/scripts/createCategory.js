export default (title, type) => {
  const item = {
    id: Date.now().toString(),
    title,
    type
  }

  return item
}