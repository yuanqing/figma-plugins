/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  pluralize,
  saveSettings,
  showUI,
  traverseLayer,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { filterLayersByName } from './filter-layers-by-name'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function () {
    triggerEvent(
      'SELECTION_CHANGED',
      getLayerIdsAndNames(),
      figma.currentPage.selection.length > 0
    )
  })
  addEventListener('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const { exactMatch, layerName } = settings
    const layers = filterLayersByName(
      getLayerIdsAndNames(),
      layerName,
      exactMatch
    )
    figma.currentPage.selection = layers.map(function ({ id }) {
      return figma.getNodeById(id)
    })
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${layers.length} ${pluralize(layers.length, 'layer')}`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  const { layerName, exactMatch } = settings
  showUI(
    { width: 240, height: 156 },
    {
      layerName,
      exactMatch,
      layers: getLayerIdsAndNames(),
      hasSelection: figma.currentPage.selection.length > 0
    }
  )
}

export function getLayerIdsAndNames () {
  const result = []
  const layers =
    figma.currentPage.selection.length > 0
      ? figma.currentPage.selection
      : [figma.currentPage]
  for (const layer of layers) {
    traverseLayer(layer, function ({ id, name }) {
      result.push({ id, name })
    })
  }
  return result
}
