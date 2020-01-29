import { isLayerWithinInstance } from '@create-figma-plugin/utilities'

export function deleteHiddenLayer (layer) {
  if (layer.visible === true || isLayerWithinInstance(layer) === true) {
    return false
  }
  layer.remove()
  return true
}
