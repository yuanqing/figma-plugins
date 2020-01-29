import { isLayerWithinInstance } from '@create-figma-plugin/utilities'

export function makePixelPerfect (layer) {
  if (
    layer.type === 'GROUP' ||
    layer.type === 'VECTOR' ||
    isLayerWithinInstance(layer) === true
  ) {
    return false
  }
  let didChange = false
  if (Number.isInteger(layer.x) === false) {
    didChange = true
    layer.x = Math.round(layer.x)
  }
  if (Number.isInteger(layer.y) === false) {
    didChange = true
    layer.y = Math.round(layer.y)
  }
  if (
    Number.isInteger(layer.width) === false ||
    Number.isInteger(layer.height) === false
  ) {
    didChange = true
    if (layer.type === 'LINE') {
      if (layer.width === 0) {
        layer.resize(0, Math.round(layer.height))
      }
      if (layer.height === 0) {
        layer.resize(Math.round(layer.width), 0)
      }
    } else {
      layer.resize(Math.round(layer.width), Math.round(layer.height))
    }
  }
  return didChange
}
