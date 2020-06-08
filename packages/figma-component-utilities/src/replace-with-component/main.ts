import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  isWithinInstance,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { getComponents } from './utilities/get-components'
import { getSelection } from './utilities/get-selection'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const selection = getSelection()
  if (selection.length === 0) {
    figma.closePlugin(
      formatErrorMessage('Can only replace layers not within an instance')
    )
    return
  }
  const components = getComponents()
  if (components.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in document'))
    return
  }
  const { shouldResizeToFitNode, ...settings } = await loadSettingsAsync(
    defaultSettings
  )
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      components: getComponents(),
      selection: getSelection()
    })
  })
  once('SUBMIT', async function ({ componentId, shouldResizeToFitNode }) {
    await saveSettingsAsync({
      ...settings,
      shouldResizeToFitNode
    })
    const selection = figma.currentPage.selection
    const component = figma.getNodeById(componentId) as ComponentNode
    const newSelection = []
    let count = 0
    for (const node of selection) {
      if (isWithinInstance(node) === true) {
        continue
      }
      if (node.id === componentId) {
        newSelection.push(node)
        continue
      }
      count++
      const parent = node.parent
      if (parent === null) {
        throw new Error('Node has no parent')
      }
      const index = parent.children.indexOf(node)
      const instance = component.createInstance()
      parent.insertChild(index, instance)
      instance.x = node.x
      instance.y = node.y
      if (shouldResizeToFitNode === true) {
        instance.resize(node.width, node.height)
      }
      node.remove()
      newSelection.push(instance)
    }
    figma.currentPage.selection = newSelection
    if (count === 0) {
      figma.closePlugin()
      return
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Replaced ${pluralize(
          count,
          'layer',
          `${count} layers`
        )} with component`
      )
    )
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { height: 402, width: 360 },
    {
      components,
      selection,
      shouldResizeToFitNode
    }
  )
}
