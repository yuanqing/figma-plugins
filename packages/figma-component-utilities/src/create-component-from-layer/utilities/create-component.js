import { cloneObject, insertBeforeLayer } from '@create-figma-plugin/utilities'

export function createComponent (layer) {
  const component = figma.createComponent()
  component.name = layer.name
  component.resizeWithoutConstraints(layer.width, layer.height)
  component.x = layer.absoluteTransform[0][2]
  component.y = layer.absoluteTransform[1][2]
  // Copy `exportSettings`
  if (layer.exportSettings.length > 0) {
    component.exportSettings = cloneObject(layer.exportSettings)
  }
  // Copy either `layer` itself or `layer.children` into `component`
  if (typeof layer.children !== 'undefined') {
    for (const childLayer of layer.children) {
      component.appendChild(childLayer.clone())
    }
  } else {
    const clone = layer.clone()
    component.appendChild(clone)
    clone.x = 0
    clone.y = 0
  }
  const referenceLayer = getReferenceLayer(layer)
  insertBeforeLayer(component, referenceLayer)
  return component
}

function getReferenceLayer (layer) {
  const parentType = layer.parent.type
  if (parentType === 'PAGE') {
    return layer
  }
  if (parentType === 'COMPONENT') {
    return layer.parent
  }
  return getReferenceLayer(layer.parent)
}
