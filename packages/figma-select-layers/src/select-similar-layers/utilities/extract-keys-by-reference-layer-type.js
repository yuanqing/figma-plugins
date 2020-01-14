import { extractKeys } from './extract-keys'

export function extractKeysByReferenceLayerType (
  attributes,
  referenceLayerType
) {
  return extractKeys(attributes, function (key) {
    if (
      (referenceLayerType === 'TEXT' && key === 'cornerRadius') ||
      (referenceLayerType !== 'TEXT' && key === 'text')
    ) {
      return false
    }
    return true
  })
}
