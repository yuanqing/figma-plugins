export function setAttribute(attributes, targetKey, newValue) {
  const result = {}
  for (const key in attributes) {
    const object = attributes[key]
    if (key === targetKey) {
      result[key] =
        typeof object === 'object'
          ? setAllAttributes(object, newValue)
          : newValue
      continue
    }
    if (typeof object === 'object') {
      result[key] = setAttribute(object, targetKey, newValue)
      continue
    }
    result[key] = object
  }
  return result
}

function setAllAttributes(attributes, newValue) {
  const result = {}
  for (const key in attributes) {
    const value = attributes[key]
    result[key] =
      typeof value === 'object' ? setAllAttributes(value, newValue) : newValue
  }
  return result
}
