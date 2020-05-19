export function toggleAttributes(
  attributes,
  keysByReferenceLayerType,
  newValue
) {
  const result = {}
  for (const key in attributes) {
    const object = attributes[key]
    if (keysByReferenceLayerType.includes(key) === false) {
      result[key] = object
      continue
    }
    if (typeof object === 'object') {
      result[key] = toggleAttributes(object, keysByReferenceLayerType, newValue)
      continue
    }
    result[key] = newValue
  }
  return result
}
