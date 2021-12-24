export default (dlina, shirina = 1) => {
  const size1 = dlina + dlina * 0.1
  const size2 = shirina + shirina * 0.1
  const fullSize = (size1 * size2).toFixed(2)
  return fullSize
}