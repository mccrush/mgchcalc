export function getArraySum(array) {
  if (array.length) {
    return array.reduce((currentSum, item) => {
      if (item.summa === 'x2') {
        return currentSum
      } else {
        return currentSum + item.summa
      }
    }, 0)
  } else {
    return 0
  }

}