import naturalCompare from 'natural-compare-lite'

export function groupLayers (layers, groupDefinition) {
  const result = {}
  for (const layer of layers) {
    const groupName = extractGroupName(layer.name, groupDefinition)
    if (typeof result[groupName] === 'undefined') {
      result[groupName] = []
    }
    result[groupName].push(layer)
  }
  for (const groupName in result) {
    result[groupName].sort(function (a, b) {
      return naturalCompare(a.name, b.name)
    })
  }
  return result
}

const slashRegex = new RegExp(/\//)

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
