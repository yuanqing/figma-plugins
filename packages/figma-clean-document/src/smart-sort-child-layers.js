export function smartSortChildLayers (layer, childLayerIds) {
  if (
    typeof layer.children === 'undefined' ||
    layer.children.length < 2 ||
    layer.type === 'INSTANCE'
  ) {
    return
  }
  const [firstChildLayer, ...childLayers] =
    typeof childLayerIds === 'undefined'
      ? layer.children
      : filterLayers(layer.children, childLayerIds)
  const result = [firstChildLayer]
  for (const childLayer of childLayers) {
    let i = 0
    let insertedChildLayer = false
    while (i < result.length) {
      const resultLayer = result[i]
      if (
        checkIfLayersOverlap(childLayer, resultLayer) ||
        compareLayerPosition(childLayer, resultLayer)
      ) {
        result.splice(i, 0, childLayer)
        insertedChildLayer = true
        break
      }
      i++
    }
    if (insertedChildLayer === false) {
      result.splice(result.length, 0, childLayer)
    }
  }
  result.reverse().forEach(function (resultLayer, index) {
    layer.insertChild(index, resultLayer)
  })
}

function filterLayers (layers, layerIds) {
  return layers.filter(function (layer) {
    return layerIds.indexOf(layer.id) !== -1
  })
}

function checkIfLayersOverlap (a, b) {
  // Returns `true` if `a` and `b` overlap
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  )
}

function compareLayerPosition (a, b) {
  // Returns `true` if `a` should be moved before `b` in the list
  const yPositionDifference = a.y - b.y
  if (yPositionDifference !== 0) {
    return yPositionDifference < 0
  }
  return a.x - b.x < 0
}
