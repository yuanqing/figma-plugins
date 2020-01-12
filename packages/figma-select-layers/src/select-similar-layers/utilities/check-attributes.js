export function checkAttributes (attributes, expectedValue) {
  for (const key in attributes) {
    const value = attributes[key]
    if (typeof value === 'object') {
      if (checkAttributes(value, expectedValue) === false) {
        return false
      }
      continue
    }
    if (value !== expectedValue) {
      return false
    }
  }
  return true
}
