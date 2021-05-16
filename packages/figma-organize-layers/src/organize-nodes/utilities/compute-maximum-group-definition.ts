import { GroupDefinition } from '../../utilities/types.js'
import { NodePlainObject } from './types.js'
const slashRegex = /\//g

export function computeMaximumGroupDefinition(
  nodePlainObjects: Array<NodePlainObject>
): GroupDefinition {
  const groupDefinitions = nodePlainObjects.map(function ({
    name
  }: NodePlainObject) {
    const matches = name.match(slashRegex)
    if (matches === null) {
      return 1
    }
    return matches.length
  })
  return Math.min(5, Math.max(...groupDefinitions)) as GroupDefinition
}
