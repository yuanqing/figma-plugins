import { sortNodesByName } from '@create-figma-plugin/utilities'

import { GroupDefinition } from '../../utilities/types.js'
import { extractGroupName } from './extract-group-name.js'
import { Group } from './types.js'

export function computeGroups(
  nodes: Array<SceneNode>,
  options: {
    combineSingleLayerGroups: boolean
    groupDefinition: GroupDefinition
  }
): Array<Group<SceneNode>> {
  const { combineSingleLayerGroups, groupDefinition } = options
  const groups: Record<string, Group<SceneNode>> = {}
  for (const node of sortNodesByName(nodes).reverse()) {
    const groupName = extractGroupName(node.name, groupDefinition)
    if (typeof groups[groupName] === 'undefined') {
      const group: Group<SceneNode> = { name: groupName, nodes: [] }
      groups[groupName] = group
    }
    groups[groupName].nodes.push(node)
  }
  if (
    combineSingleLayerGroups === false ||
    countSingleLayerGroups(groups) < 2
  ) {
    return Object.values(groups)
  }
  const result = []
  const singleLayers: Group<SceneNode> = { name: null, nodes: [] }
  for (const groupName in groups) {
    const group = groups[groupName]
    if (group.nodes.length === 1) {
      singleLayers.nodes.push(group.nodes[0])
      continue
    }
    result.push(group)
  }
  return [singleLayers, ...result]
}

function countSingleLayerGroups(
  groups: Record<string, Group<SceneNode>>
): number {
  let count = 0
  for (const groupName in groups) {
    const group = groups[groupName]
    if (group.nodes.length === 1) {
      count++
    }
  }
  return count
}
