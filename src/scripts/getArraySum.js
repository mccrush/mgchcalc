export function getArraySum(array) {
  return array.reduce((currentSum, item) => {
    if (item.summa === 'x2') {
      return currentSum
    } else {
      return currentSum + item.summa
    }
  }, 0)
}