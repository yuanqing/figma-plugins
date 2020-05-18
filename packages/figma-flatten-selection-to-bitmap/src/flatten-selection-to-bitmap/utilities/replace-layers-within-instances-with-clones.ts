import {
  getAbsolutePosition,
  isWithinInstance
} from '@create-figma-plugin/utilities'

export function replaceLayersWithinInstancesWithClones(layers) {
  return layers.map(function(layer) {
    if (isWithinInstance(layer) === true) {
      const clone = layer.clone()
      const { x, y } = getAbsolutePosition(layer)
      clone.x = x
      clone.y = y
      layer.visible = false
      return clone
    }
    return layer
  })
}
