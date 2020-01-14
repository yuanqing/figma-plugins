export function extractKeys (attributes, callback, result = []) {
  for (const key in attributes) {
    const value = attributes[key]
    if (callback(key, value) === true) {
      result.push(key)
      if (typeof value === 'object') {
        extractKeys(value, callback, result)
      }
    }
  }
  return result
}
