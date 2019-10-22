export function smartSortChildLayers (layer, childLayerIds) {
  const children = layer.children
  if (
    typeof children === 'undefined' ||
    children.length < 2 ||
    layer.type === 'INSTANCE'
  ) {
    return null
  }
  /* eslint-disable indent */
  const childLayers =
    typeof childLayerIds === 'undefined'
      ? children
      : children.filter(function (layer) {
          return childLayerIds.indexOf(layer.id) !== -1
        })
  const [firstChildLayer, ...remainingChildLayers] = childLayers
  /* eslint-enable indent */
  const result = [firstChildLayer]
  for (const childLayer of remainingChildLayers) {
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
  if (didLayerOrderChange(childLayers, result) === true) {
    return result
  }
  return null
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

function didLayerOrderChange (oldChildLayers, newChildLayers) {
  let result = false
  const reversed = [].concat(newChildLayers).reverse()
  oldChildLayers.forEach(function (layer, index) {
    if (layer.id !== reversed[index].id) {
      result = true
    }
  })
  return result
}
