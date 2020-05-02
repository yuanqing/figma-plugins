import {
  getAbsolutePosition,
  isLayerWithinInstance
} from '@create-figma-plugin/utilities'

export function replaceLayersWithinInstancesWithClones (layers) {
  return layers.map(function (layer) {
    if (isLayerWithinInstance(layer) === true) {
      // Clone the `layer`.
      const clone = layer.clone()

      // Copy the position of `layer` onto the `clone`.
      const { x, y } = getAbsolutePosition(layer)
      clone.x = x
      clone.y = y

      // Hide the original `layer` that was within the instance.
      layer.visible = false

      return clone
    }
    return layer
  })
}
