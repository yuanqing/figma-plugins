import { labels } from './labels'
import { NodeAttributes } from './types'

export function filterNodeAttributesByName(
  nodeAttributes: NodeAttributes,
  name: string
): Array<keyof NodeAttributes> {
  const result: Array<keyof NodeAttributes> = []
  const keys = Object.keys(nodeAttributes) as Array<keyof NodeAttributes>
  for (const key of keys) {
    if (
      stringContainsSubstring(key, name) === true ||
      stringContainsSubstring(labels[key], name) === true
    ) {
      result.push(key)
    }
  }
  return result
}

function stringContainsSubstring(string: string, substring: string): boolean {
  return string.toLowerCase().indexOf(substring.toLowerCase()) !== -1
}
