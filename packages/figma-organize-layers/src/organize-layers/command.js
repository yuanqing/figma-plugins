import {
  addEventListener,
  extractAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { arrangeGroups } from './arrange-groups'
import { computeMaximumGroupDefinition } from './compute-maximum-group-definition'
import { groupLayers } from './group-layers'
import { sortLayers } from './sort-layers'

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
    const { groupDefinition, horizontalSpace, verticalSpace } = settings
    const layers = figma.currentPage.children
    const groups = groupLayers(layers, groupDefinition)
    arrangeGroups(groups, horizontalSpace, verticalSpace)
    sortLayers(layers)
    figma.viewport.scrollAndZoomIntoView(layers)
    figma.closePlugin(formatSuccessMessage('Organized layers on page'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 325 },
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
