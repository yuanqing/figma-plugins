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
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { defaultSettings } from '../default-settings'
import { arrangeGroups } from './arrange-groups'
import { groupLayers } from './group-layers'

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
    const layers = getComponentLayers()
    const groups = groupLayers(layers, groupDefinition)
    arrangeGroups(groups, horizontalSpace, verticalSpace)
    sortLayers(layers)
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
  figma.currentPage.children.forEach(function ({ id, name, type }) {
    if (type === 'COMPONENT') {
      result.push({ id, name })
    }
  })
  return result
}

function sortLayers (layers) {
  const components = layers.map(function ({ id }) {
    return figma.getNodeById(id)
  })
  const result = sortLayersByName(components)
  updateLayersSortOrder(result)
}
