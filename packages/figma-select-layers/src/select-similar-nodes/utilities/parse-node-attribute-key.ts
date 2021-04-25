import { NodeAttributes } from './types'

export function parseNodeAttributeKey(
  attributeKey: keyof NodeAttributes
): { categoryKey: null | string; nodeAttributeName: string } {
  const index = attributeKey.indexOf('.')
  if (index === -1) {
    return { categoryKey: null, nodeAttributeName: attributeKey }
  }
  return {
    categoryKey: attributeKey.slice(0, index),
    nodeAttributeName: attributeKey.slice(index + 1)
  }
}
