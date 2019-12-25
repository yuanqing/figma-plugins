/* global figma */
import {
  addEventListener,
  getDocumentComponents,
  extractLayerAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  mapNumberToWord,
  onSelectionChange,
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
  const layers = getComponents()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in document'))
    return
  }
  const { shouldResizeToFitLayer, ...settings } = await loadSettings(
    defaultSettings
  )
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', { layers: getComponents() })
  })
  addEventListener('SUBMIT', async function ({
    selectedLayerId,
    shouldResizeToFitLayer
  }) {
    await saveSettings({
      ...settings,
      shouldResizeToFitLayer
    })
    const layers = figma.currentPage.selection
    const component = figma.getNodeById(selectedLayerId)
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
        )} with “${component.name}”`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 340 },
    {
      layers,
      shouldResizeToFitLayer
    }
  )
}

function getComponents () {
  const components = getDocumentComponents()
  return extractLayerAttributes(sortLayersByName(components), ['id', 'name'])
}
