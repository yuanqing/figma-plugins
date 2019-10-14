export function updateLayersSortOrder (layers) {
  const insertIndex = calculateInsertIndex(layers)
  const parentLayer = layers[0].parent // we've already checked that `layers` have a common parent
  layers.forEach(function (layer) {
    parentLayer.insertChild(insertIndex, layer)
  })
}

function calculateInsertIndex (layers) {
  const childLayerIds = layers[0].parent.children.map(function (layer) {
    return layer.id
  })
  let insertIndex = -1
  layers.forEach(function (layer) {
    const index = childLayerIds.indexOf(layer.id)
    if (index > insertIndex) {
      insertIndex = index
    }
  })
  return insertIndex + 1
}
