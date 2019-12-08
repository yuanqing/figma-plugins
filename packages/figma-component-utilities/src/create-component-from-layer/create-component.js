/* global figma */
import { cloneObject, insertBeforeLayer } from '@create-figma-plugin/utilities'

export function createComponent (layer) {
  const component = figma.createComponent()
  component.name = layer.name
  component.resizeWithoutConstraints(layer.width, layer.height)
  component.x = layer.x
  component.y = layer.y
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
  insertBeforeLayer(component, layer)
  return component
}
