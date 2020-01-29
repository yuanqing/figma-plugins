import { isLayerWithinInstance } from './is-layer-within-instance'

export function deleteHiddenLayer (layer) {
  if (layer.visible === true || isLayerWithinInstance(layer) === true) {
    return false
  }
  layer.remove()
  return true
}
