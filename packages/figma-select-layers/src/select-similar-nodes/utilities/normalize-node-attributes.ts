import { parseNodeAttributeKey } from './parse-node-attribute-key.js'
import { NodeAttributes, NormalizedNodeAttributeItem } from './types.js'

export function normalizeNodeAttributes(
  nodeAttributes: NodeAttributes,
  validNodeAttributeKeys: Array<keyof NodeAttributes>
): Array<NormalizedNodeAttributeItem> {
  const result: Array<NormalizedNodeAttributeItem> = []
  const keys = Object.keys(nodeAttributes) as Array<keyof NodeAttributes>
  for (const key of keys) {
    const { categoryKey } = parseNodeAttributeKey(key)
    const disabled = validNodeAttributeKeys.includes(key) === false
    result.push({
      categoryKey,
      disabled,
      nodeAttributeKey: key,
      value: disabled === true ? false : nodeAttributes[key]
    })
  }
  return result
}
