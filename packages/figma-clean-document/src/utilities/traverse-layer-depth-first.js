export function traverseLayerDepthFirst (layer, callback, filter) {
  if (layer.removed === true) {
    return
  }
  if (typeof filter === 'function' && filter(layer) === false) {
    return
  }
  if (typeof layer.children !== 'undefined') {
    for (const childLayer of layer.children) {
      traverseLayerDepthFirst(childLayer, callback, filter)
    }
  }
  callback(layer)
}
