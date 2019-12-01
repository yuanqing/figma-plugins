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
import { arrangeGroups } from './arrange-groups'
import { defaultSettings } from '../default-settings'
import { deleteNonComponents } from './delete-non-components'
import { groupLayers } from './group-layers'
import { sortLayers } from './sort-layers'

export default async function () {
  const layers = getComponentLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No components on page'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  addEventListener('ORGANIZE_COMPONENTS', async function (settings) {
    await saveSettings(settings)
    const {
      groupDefinition,
      horizontalSpace,
      shouldDeleteNonComponents,
      verticalSpace
    } = settings
    if (shouldDeleteNonComponents === true) {
      deleteNonComponents(figma.currentPage.children)
    }
    const layers = getComponentLayers()
    const groups = groupLayers(layers, groupDefinition)
    arrangeGroups(groups, horizontalSpace, verticalSpace)
    sortLayers(layers)
    figma.closePlugin(formatSuccessMessage('Organized components'))
  })
  figma.on('selectionchange', function () {
    const layers = getComponentLayers()
    triggerEvent(
      'SELECTION_CHANGED',
      extractIdAndName(layers),
      computeMaximumGroupDefinition(layers)
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 357 },
    {
      layers: extractIdAndName(layers),
      maximumGroupDefinition: computeMaximumGroupDefinition(layers),
      ...settings
    }
  )
}

function getComponentLayers () {
  return figma.currentPage.children.filter(function ({ type }) {
    return type === 'COMPONENT'
  })
}

function extractIdAndName (layers) {
  return layers.map(function ({ id, name }) {
    return { id, name }
  })
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
