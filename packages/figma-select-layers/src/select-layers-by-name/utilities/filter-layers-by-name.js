import { traverseLayer } from '@create-figma-plugin/utilities'

export function filterLayersByName (layers, layerName, exactMatch) {
  if (layerName === '') {
    return []
  }
  const result = []
  if (exactMatch === true) {
    for (const layer of layers) {
      traverseLayer(layer, function (layer) {
        if (layer.name === layerName) {
          result.push(layer)
        }
      })
    }
  } else {
    const regex = new RegExp(layerName, 'i')
    for (const layer of layers) {
      traverseLayer(layer, function (layer) {
        if (regex.test(layer.name) === true) {
          result.push(layer)
        }
      })
    }
  }
  return result
}
