import { sortLayersByName } from '@create-figma-plugin/utilities'

export function groupLayers (layers, groupDefinition) {
  const result = {}
  for (const layer of sortLayersByName(layers)) {
    const groupName = extractGroupName(layer.name, groupDefinition)
    if (typeof result[groupName] === 'undefined') {
      result[groupName] = []
    }
    result[groupName].push(layer)
  }
  return result
}

const slashRegex = /\//

function extractGroupName (layerName, groupDefinition) {
  const split = layerName.split(slashRegex)
  if (split.length === 1) {
    return layerName
  }
  if (split.length <= groupDefinition) {
    return layerName
  }
  return split.slice(0, groupDefinition).join('/')
}
