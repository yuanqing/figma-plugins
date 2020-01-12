export function setAllAttributes (attributes, newValue) {
  const result = {}
  for (const key in attributes) {
    const value = attributes[key]
    result[key] =
      typeof value === 'object' ? setAllAttributes(value, newValue) : newValue
  }
  return result
}
