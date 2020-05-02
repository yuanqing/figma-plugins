import {
  emit,
  extractAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  on,
  pluralize,
  saveSettingsAsync,
  setRelaunchButton,
  showUI
} from '@create-figma-plugin/utilities'
import { computeMaximumGroupDefinition } from './utilities/compute-maximum-group-definition'
import { defaultSettings } from '../utilities/default-settings'
import { organizeLayers } from './utilities/organize-layers'

export default async function () {
  const layers = getLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    const layers = getLayers()
    emit('SELECTION_CHANGED', {
      layers,
      maximumGroupDefinition: computeMaximumGroupDefinition(layers)
    })
  })
  on('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const {
      combineSingleLayerGroups,
      groupDefinition,
      horizontalSpace,
      verticalSpace
    } = settings
    const layers = figma.currentPage.children
    organizeLayers(
      layers,
      combineSingleLayerGroups,
      groupDefinition,
      horizontalSpace,
      verticalSpace
    )
    figma.viewport.scrollAndZoomIntoView(layers)
    setRelaunchButton(figma.currentPage, 'organizeLayers')
    figma.closePlugin(
      formatSuccessMessage(
        `Organized ${layers.length} ${pluralize(
          layers.length,
          'layer'
        )} on page`
      )
    )
  })
  on('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 361 },
    {
      ...settings,
      layers,
      maximumGroupDefinition: computeMaximumGroupDefinition(layers)
    }
  )
}

function getLayers () {
  return extractAttributes(figma.currentPage.children, ['id', 'name'])
}
