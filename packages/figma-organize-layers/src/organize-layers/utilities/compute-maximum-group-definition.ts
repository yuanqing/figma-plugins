import { GroupDefinition } from '../../utilities/types'
import { NodeAttributes } from './types'
const slashRegex = /\//g

export function computeMaximumGroupDefinition(
  nodes: Array<NodeAttributes>
): GroupDefinition {
  const groupDefinitions = nodes.map(function ({ name }: NodeAttributes) {
    const matches = name.match(slashRegex)
    if (matches === null) {
      return 1
    }
    return matches.length
  })
  return Math.min(5, Math.max(...groupDefinitions)) as GroupDefinition
}
