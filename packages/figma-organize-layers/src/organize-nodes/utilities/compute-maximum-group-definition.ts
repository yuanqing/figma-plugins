import { GroupDefinition } from '../../utilities/types'
import { NodePlainObject } from './types'
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
