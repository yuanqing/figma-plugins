export function everyAttribute (attributes, keys, targetValue) {
  for (const key in attributes) {
    if (keys.includes(key) === false) {
      continue
    }
    const object = attributes[key]
    if (typeof object === 'object') {
      if (everyAttribute(object, keys, targetValue) === false) {
        return false
      }
      continue
    }
    if (object !== targetValue) {
      return false
    }
  }
  return true
}
