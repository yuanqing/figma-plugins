/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  pluralize,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { filterLayersByName } from './filter-layers-by-name'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  addEventListener('FILTER_LAYERS_BY_NAME_REQUEST', async function (settings) {
    const { exactMatch, layerName } = settings
    const layers = filterLayersByName(layerName, exactMatch)
    triggerEvent('FILTER_LAYERS_BY_NAME_RESULT', {
      layerName,
      exactMatch,
      selectedLayersCount: layers.length
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const { exactMatch, layerName } = settings
    const layers = filterLayersByName(layerName, exactMatch)
    figma.currentPage.selection = layers
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
  const layers = filterLayersByName(layerName, exactMatch)
  showUI(
    { width: 240, height: 156 },
    { layerName, exactMatch, selectedLayersCount: layers.length }
  )
}
