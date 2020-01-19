const nonDigitRegex = /[^\d.]/

export function castValues (values) {
  const result = []
  for (const value of values) {
    if (nonDigitRegex.test(value) === true) {
      result.push(value)
      continue
    }
    result.push(parseFloat(value))
  }
  return result
}
