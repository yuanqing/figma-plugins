export function extractKeysByReferenceLayerType (
  attributes,
  referenceLayerType
) {
  let result = []
  for (const key in attributes) {
    if (
      (referenceLayerType === 'TEXT' && key === 'cornerRadius') ||
      (referenceLayerType !== 'TEXT' && key === 'text')
    ) {
      continue
    }
    result.push(key)
    const object = attributes[key]
    if (typeof object === 'object') {
      result = result.concat(Object.keys(object))
    }
  }
  return result
}
