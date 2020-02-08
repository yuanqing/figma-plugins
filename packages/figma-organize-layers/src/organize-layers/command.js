import {
  addEventListener,
  extractAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  mapNumberToWord,
  onSelectionChange,
  pluralize,
  saveSettings,
  setRelaunchButton,
  showUI,
  triggerEvent
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
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function () {
    const layers = getLayers()
    triggerEvent('SELECTION_CHANGED', {
      layers,
      maximumGroupDefinition: computeMaximumGroupDefinition(layers)
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    await saveSettings(settings)
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
        `Organized ${mapNumberToWord(layers.length)} ${pluralize(
          layers.length,
          'layer'
        )} on page`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 357 },
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
