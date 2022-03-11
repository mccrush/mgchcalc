export function formatMoney(sum) {
  sum = String(sum)
  if (sum.length > 4) {
    return (
      sum.slice(0, sum.length - 3) + ' ' + sum.slice(sum.length - 3) + ' ₽'
    )
  } else {
    return sum + ' ₽'
  }
}