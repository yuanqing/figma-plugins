import { cloneObject, insertBeforeNode } from '@create-figma-plugin/utilities'
import { copyAttributes } from './copy-attributes'
import { getReferenceLayer } from './get-reference-layer'

export function createComponent (layer) {
  const component = figma.createComponent()
  component.name = layer.name
  component.resizeWithoutConstraints(layer.width, layer.height)
  component.x = layer.absoluteTransform[0][2]
  component.y = layer.absoluteTransform[1][2]
  component.fills = []
  // Copy either `layer` itself or `layer.children` into `component`
  if (
    (layer.type === 'FRAME' ||
      layer.type === 'GROUP' ||
      layer.type === 'INSTANCE') &&
    typeof layer.children !== 'undefined'
  ) {
    for (const childLayer of layer.children) {
      component.appendChild(childLayer.clone())
    }
    copyAttributes(layer, component)
  } else {
    const clone = layer.clone()
    component.appendChild(clone)
    clone.x = 0
    clone.y = 0
    if (clone.exportSettings.length > 0) {
      component.exportSettings = cloneObject(clone.exportSettings)
      clone.exportSettings = []
    }
  }
  const referenceLayer = getReferenceLayer(layer)
  insertBeforeNode(component, referenceLayer)
  return component
}
