import {
  formatErrorMessage,
  formatSuccessMessage,
  insertBeforeLayer,
  mapNumberToWord,
  pluralize
} from '@create-figma-plugin/utilities'
import { createComponent } from './utilities/create-component'
import { isLayerWithinInstance } from '../utilities/is-layer-within-instance'
import { OFFSET } from '../utilities/constants'

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
    if (isLayerWithinInstance(layer) === false) {
      const instance = component.createInstance()
      instance.x = layer.x
      instance.y = layer.y
      insertBeforeLayer(instance, layer)
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
        `components from ${mapNumberToWord(layers.length)} layers`
      )}`
    )
  )
}
