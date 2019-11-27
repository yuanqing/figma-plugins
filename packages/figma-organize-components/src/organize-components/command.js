/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { groupLayers } from './group-layers'
import { arrangeGroups } from './arrange-groups'

export default async function () {
  const layers = getComponentLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No components on the page'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  addEventListener('ORGANIZE_COMPONENTS', async function (settings) {
    await saveSettings(settings)
    const { groupDefinition, horizontalSpace, verticalSpace } = settings
    const groups = groupLayers(getComponentLayers(), groupDefinition)
    arrangeGroups(groups, horizontalSpace, verticalSpace)
    figma.closePlugin(formatSuccessMessage('Organized components'))
  })
  figma.on('selectionchange', function () {
    triggerEvent('SELECTION_CHANGED', getComponentLayers())
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 377 },
    {
      layers,
      ...settings
    }
  )
}

function getComponentLayers () {
  const result = []
  figma.currentPage.children.filter(function ({ id, name, type }) {
    if (type === 'COMPONENT') {
      result.push({ id, name })
    }
  })
  return result
}
