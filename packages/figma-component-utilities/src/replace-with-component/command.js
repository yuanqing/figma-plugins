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
  const components = getComponents()
  if (components.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in document'))
    return
  }
  const { shouldResizeToFitLayer, ...settings } = await loadSettings(
    defaultSettings
  )
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', {
      components: getComponents(),
      selectedLayers: getSelectedLayer()
    })
  })
  addEventListener('SUBMIT', async function ({
    componentId,
    shouldResizeToFitLayer
  }) {
    await saveSettings({
      ...settings,
      shouldResizeToFitLayer
    })
    const selectedLayers = figma.currentPage.selection
    const component = figma.getNodeById(componentId)
    const newSelection = []
    let count = 0
    for (const layer of selectedLayers) {
      if (layer.id === componentId) {
        newSelection.push(layer)
        continue
      }
      count++
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
    figma.viewport.scrollAndZoomIntoView(newSelection)
    if (count === 0) {
      figma.closePlugin()
      return
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Replaced ${pluralize(
          count,
          'layer',
          `${mapNumberToWord(count)} layers`
        )} with component`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 340 },
    {
      components,
      selectedLayers: getSelectedLayer(),
      shouldResizeToFitLayer
    }
  )
}

function getComponents () {
  const components = getDocumentComponents()
  return extractLayerAttributes(sortLayersByName(components), ['id', 'name'])
}

function getSelectedLayer () {
  return extractLayerAttributes(figma.currentPage.selection, ['id', 'name'])
}
