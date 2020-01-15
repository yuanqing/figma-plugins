export function filterLayersByName (layers, layerName, exactMatch) {
  if (layerName === '') {
    return []
  }
  const result = []
  if (exactMatch === true) {
    for (const layer of layers) {
      if (layer.name === layerName) {
        result.push(layer)
      }
    }
  } else {
    const regex = new RegExp(layerName, 'i')
    for (const layer of layers) {
      if (regex.test(layer.name) === true) {
        result.push(layer)
      }
    }
  }
  return result
}
