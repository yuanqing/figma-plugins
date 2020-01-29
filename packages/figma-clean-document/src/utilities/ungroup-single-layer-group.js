import { isLayerWithinInstance } from '@create-figma-plugin/utilities'

export function ungroupSingleLayerGroup (layer) {
  if (
    isSingleLayerGroup(layer) === false ||
    isLayerWithinInstance(layer) === true
  ) {
    return false
  }
  const index = layer.parent.children.indexOf(layer)
  layer.parent.insertChild(index, layer.children[0])
  return true
}

function isSingleLayerGroup (layer) {
  return (
    layer.type === 'GROUP' &&
    layer.children.length === 1 &&
    layer.backgrounds.length === 0 &&
    layer.blendMode === 'PASS_THROUGH' &&
    typeof layer.constraints === 'undefined' &&
    layer.effects.length === 0 &&
    layer.exportSettings.length === 0
  )
}
