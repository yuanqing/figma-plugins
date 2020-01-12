import { setAllAttributes } from './set-all-attributes'

export function setAttribute (attributes, targetKey, newValue) {
  const result = {}
  for (const key in attributes) {
    const value = attributes[key]
    if (key === targetKey) {
      result[key] =
        typeof value === 'object' ? setAllAttributes(value, newValue) : newValue
      continue
    }
    if (typeof value === 'object') {
      result[key] = setAttribute(value, targetKey, newValue)
      continue
    }
    result[key] = value
  }
  return result
}
