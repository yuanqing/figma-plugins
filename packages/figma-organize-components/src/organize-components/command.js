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
  addEventListener('ORGANIZE_COMPONENTS', async function ({
    layers,
    groupDefinition,
    horizontalSpace,
    verticalSpace
  }) {
    await saveSettings({ groupDefinition, horizontalSpace, verticalSpace })
    const groups = groupLayers(layers, groupDefinition)
    arrangeGroups(groups, horizontalSpace, verticalSpace)
    figma.closePlugin(formatSuccessMessage('Organized components'))
  })
  figma.on('selectionchange', function () {
    triggerEvent('SELECTION_CHANGED', extractLayerNames(getComponentLayers()))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 377 },
    {
      layers: extractLayerNames(layers),
      ...settings
    }
  )
}

function getComponentLayers () {
  return figma.currentPage.children.filter(function (layer) {
    return layer.type === 'COMPONENT'
  })
}

function extractLayerNames (layers) {
  return layers.map(function ({ id, name }) {
    return { id, name }
  })
}
