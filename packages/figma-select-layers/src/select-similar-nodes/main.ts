import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { CloseUIHandler } from '../select-nodes-by-name/utilities/types'
import { defaultSettings } from '../utilities/default-settings'
import { computeSimilarNodes } from './utilities/compute-similar-nodes'
import { parseNodeAttributeKey } from './utilities/parse-node-attribute-key'
import {
  NodeAttributes,
  SelectionChangedHandler,
  SelectSimilarNodesProps,
  SubmitHandler
} from './utilities/types'
import { SelectSimilarNodesSettings } from './utilities/types'

export default async function (): Promise<void> {
  const selection = figma.currentPage.selection
  const length = selection.length
  if (length !== 1) {
    figma.closePlugin(createErrorMessage(length))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function (selectSimilarLayersSettings: SelectSimilarNodesSettings) {
      await saveSettingsAsync({
        ...settings,
        selectSimilarLayers: selectSimilarLayersSettings
      })
      const targetNode = figma.currentPage.selection[0]
      const result = computeSimilarNodes(
        targetNode,
        extractSelectedNodeAttributeNames(selectSimilarLayersSettings)
      )
      if (result.length === 1) {
        figma.closePlugin(formatErrorMessage('No similar layers on page'))
        return
      }
      figma.currentPage.selection = result
      figma.viewport.scrollAndZoomIntoView(result)
      figma.closePlugin(
        formatSuccessMessage(
          `Selected ${result.length} ${pluralize(
            result.length,
            'similar layer'
          )}`
        )
      )
    }
  )
  figma.on('selectionchange', function () {
    const selection = figma.currentPage.selection
    if (selection.length === 1) {
      const targetNodeType = selection[0].type
      const validNodeAttributeNames = computeValidNodeAttributeKeys(
        nodeAttributes,
        targetNodeType
      )
      emit<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        validNodeAttributeNames
      )
      return
    }
    figma.notify(createErrorMessage(selection.length))
    emit<SelectionChangedHandler>('SELECTION_CHANGED', [])
  })
  const nodeAttributes = settings.selectSimilarNodes
  const targetNodeType = selection[0].type
  const validNodeAttributeKeys = computeValidNodeAttributeKeys(
    nodeAttributes,
    targetNodeType
  )
  showUI<SelectSimilarNodesProps>(
    { height: 436, width: 240 },
    {
      nodeAttributes,
      validNodeAttributeKeys
    }
  )
}

function createErrorMessage(count: number): string {
  return formatErrorMessage(
    count === 0 ? 'Select a reference layer' : 'Select only one reference layer'
  )
}

function extractSelectedNodeAttributeNames(
  nodeAttributes: NodeAttributes
): Array<string> {
  const result: Array<string> = []
  const keys = Object.keys(nodeAttributes) as Array<keyof NodeAttributes>
  for (const key of keys) {
    if (nodeAttributes[key] === false) {
      continue
    }
    const { nodeAttributeName } = parseNodeAttributeKey(key)
    result.push(nodeAttributeName)
  }
  return result
}

// Computes the list of node attributes that are valid for the
// given `nodeType`.
export function computeValidNodeAttributeKeys(
  nodeAttributes: NodeAttributes,
  nodeType: NodeType
): Array<keyof NodeAttributes> {
  const result: Array<keyof NodeAttributes> = []
  const keys = Object.keys(nodeAttributes) as Array<keyof NodeAttributes>
  for (const key of keys) {
    if (nodeType === 'TEXT') {
      if (key.indexOf('cornerRadius') === 0) {
        continue
      }
    } else {
      if (key.indexOf('text') === 0) {
        continue
      }
    }
    result.push(key)
  }
  return result
}
