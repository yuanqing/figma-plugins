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

import { defaultSettings } from './utilities/default-settings'
import { getComponentNodes } from './utilities/get-component-nodes'
import { getValidSelectedNodes } from './utilities/get-valid-selected-nodes'
import {
  CloseUIHandler,
  ReplaceWithComponentProps,
  SelectionChangedHandler,
  SubmitHandler
} from './utilities/types'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const selectedNodes = getValidSelectedNodes()
  if (selectedNodes.length === 0) {
    figma.closePlugin(
      formatErrorMessage('Can only replace layers not within an instance')
    )
    return
  }
  const componentNodes = getComponentNodes()
  if (componentNodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in document'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function (options: {
      componentId: string
      shouldResizeToFitNode: boolean
    }) {
      const { componentId, shouldResizeToFitNode } = options
      await saveSettingsAsync({ shouldResizeToFitNode })
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
    }
  )
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>('SELECTION_CHANGED', {
      componentNodes: getComponentNodes(),
      selectedNodes: getValidSelectedNodes()
    })
  })
  showUI<ReplaceWithComponentProps>(
    { height: 402, width: 360 },
    {
      ...settings,
      componentNodes,
      selectedNodes
    }
  )
}
