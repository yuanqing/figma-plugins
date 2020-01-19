export function generateAutocompleteItems (value, callback) {
  const result = [callback(value)]
  let i = value * 10
  const max = i + 10
  while (i < max) {
    result.push(callback(i))
    i++
  }
  return result
}
