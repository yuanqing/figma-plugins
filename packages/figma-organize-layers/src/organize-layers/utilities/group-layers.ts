import { sortNodesByName } from '@create-figma-plugin/utilities'

import { Group } from '../../types'
import { extractGroupName } from './extract-group-name'

export function groupLayers(
  layers: Array<SceneNode>,
  combineSingleLayerGroups: boolean,
  groupDefinition: number
): Array<Group> {
  const groups: { [key: string]: Group } = {}
  for (const layer of sortNodesByName(layers).reverse()) {
    const groupName = extractGroupName(layer.name, groupDefinition)
    if (typeof groups[groupName] === 'undefined') {
      groups[groupName] = { groupName, layers: [] }
    }
    groups[groupName].layers.push(layer)
  }
  if (
    combineSingleLayerGroups === false ||
    countSingleLayerGroups(groups) < 2
  ) {
    return Object.values(groups)
  }
  const result = []
  const singleLayers: Group = { groupName: null, layers: [] }
  for (const groupName in groups) {
    const group = groups[groupName]
    if (group.layers.length === 1) {
      singleLayers.layers.push(group.layers[0])
      continue
    }
    result.push(group)
  }
  return [singleLayers, ...result]
}

function countSingleLayerGroups(groups: { [key: string]: Group }): number {
  let count = 0
  for (const groupName in groups) {
    const group = groups[groupName]
    if (group.layers.length === 1) {
      count++
    }
  }
  return count
}
