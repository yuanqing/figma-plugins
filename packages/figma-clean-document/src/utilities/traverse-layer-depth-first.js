export function traverseLayerDepthFirst (layer, processLayer, stopTraversal) {
  if (layer.removed === true) {
    return
  }
  if (
    typeof layer.children !== 'undefined' &&
    (typeof stopTraversal !== 'function' || stopTraversal(layer) === false)
  ) {
    for (const childLayer of layer.children) {
      traverseLayerDepthFirst(childLayer, processLayer, stopTraversal)
    }
  }
  processLayer(layer)
}
