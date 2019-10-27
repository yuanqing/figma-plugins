const CONSECUTIVE_VECTOR_COUNT = 50

export function isLayerAnIllustration (layer) {
  if (
    layer.type !== 'FRAME' ||
    layer.type !== 'GROUP' ||
    typeof layer.children === 'undefined'
  ) {
    return false
  }
  let count = 0
  for (const childLayer of layer.children) {
    if (
      childLayer.type === 'BOOLEAN_OPERATION' ||
      childLayer.type === 'FRAME' ||
      childLayer.type === 'GROUP' ||
      childLayer.type === 'RECTANGLE' ||
      childLayer.type === 'VECTOR'
    ) {
      count++
      if (count === CONSECUTIVE_VECTOR_COUNT) {
        return true
      }
    } else {
      break
    }
  }
  return false
}
