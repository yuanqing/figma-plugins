/* global figma */
import {
  addEventListener,
  getDocumentComponents,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  mapNumberToWord,
  pluralize,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { defaultSettings } from '../default-settings'

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const components = getDocumentComponents()
  if (components.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in document'))
    return
  }
  const { shouldResizeToFitLayer, ...settings } = await loadSettings(
    defaultSettings
  )
  addEventListener('SUBMIT', async function ({
    componentId,
    shouldResizeToFitLayer
  }) {
    await saveSettings({
      ...settings,
      shouldResizeToFitLayer
    })
    const layers = figma.currentPage.selection
    const component = figma.getNodeById(componentId)
    const newSelection = []
    for (const layer of layers) {
      const parent = layer.parent
      const index = parent.children.indexOf(layer)
      const instance = component.createInstance()
      parent.insertChild(index, instance)
      instance.x = layer.x
      instance.y = layer.y
      if (shouldResizeToFitLayer === true) {
        instance.resize(layer.width, layer.height)
      }
      layer.remove()
      newSelection.push(instance)
    }
    figma.currentPage.selection = newSelection
    figma.closePlugin(
      formatSuccessMessage(
        `Replaced ${pluralize(
          layers.length,
          'layer',
          `${mapNumberToWord(layers.length)} layers`
        )} with component`
      )
    )
  })
  figma.on('selectionchange', function () {
    triggerEvent('SELECTION_CHANGED', figma.currentPage.selection.length !== 0)
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 347 },
    {
      components: extractComponentLayerNames(sortLayersByName(components)),
      shouldResizeToFitLayer
    }
  )
}

function extractComponentLayerNames (layers) {
  return layers.map(function ({ id, name }) {
    return { id, name }
  })
}
