/* global figma */
import {
  addEventListener,
  extractLayerAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { arrangeGroups } from './arrange-groups'
import { defaultSettings } from '../default-settings'
import { groupLayers } from './group-layers'
import { sortLayers } from './sort-layers'

export default async function () {
  const layers = figma.currentPage.children
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function () {
    const layers = figma.currentPage.children
    triggerEvent('SELECTION_CHANGED', {
      layers: extractLayerAttributes(layers, ['id', 'name']),
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
    figma.closePlugin(formatSuccessMessage('Organized layers on page'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 325 },
    {
      layers: extractLayerAttributes(layers, ['id', 'name']),
      maximumGroupDefinition: computeMaximumGroupDefinition(layers),
      ...settings
    }
  )
}

const slashRegex = /\//g

function computeMaximumGroupDefinition (layers) {
  let maximum = 1
  layers.forEach(function ({ name }) {
    const matches = name.match(slashRegex)
    if (matches !== null) {
      maximum = Math.max(maximum, matches.length)
    }
  })
  return maximum
}
