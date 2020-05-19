import {
  formatErrorMessage,
  formatSuccessMessage,
  insertBeforeNode,
  isWithinInstance,
  pluralize
} from '@create-figma-plugin/utilities'

import { OFFSET } from '../utilities/constants'
import { createComponent } from './utilities/create-component'

export default async function () {
  const layers = figma.currentPage.selection
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const newSelection = []
  for (const layer of layers) {
    const component =
      layer.type === 'COMPONENT' ? layer : createComponent(layer)
    if (isWithinInstance(layer) === false) {
      const instance = component.createInstance()
      instance.x = layer.x
      instance.y = layer.y
      insertBeforeNode(instance, layer)
      if (layer.type !== 'COMPONENT') {
        layer.remove()
      }
    }
    component.x += OFFSET
    component.y += OFFSET
    newSelection.push(component)
  }
  figma.currentPage.selection = newSelection
  figma.closePlugin(
    formatSuccessMessage(
      `Created ${pluralize(
        layers.length,
        'component from layer',
        `components from ${layers.length} layers`
      )}`
    )
  )
}
