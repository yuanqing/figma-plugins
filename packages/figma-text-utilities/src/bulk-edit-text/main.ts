import { emit, once, showUI } from '@create-figma-plugin/utilities'

import { filterTextNodes } from '../utilities/filter-text-nodes.js'
import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import { copyTextNode } from './utilities/copy-text-node.js'
import {
  BulkEditTextProps,
  CloseUIHandler,
  SelectionChangedHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const allTextNodes = getAllTextNodes()
  let selectedTextNodes = getSelectedTextNodes()
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  figma.on('selectionchange', async function () {
    const newSelectedTextNodes = getSelectedTextNodes()
    const changedTextNodes = computeChangedTextNodes(
      selectedTextNodes,
      newSelectedTextNodes
    )
    if (changedTextNodes.length > 0) {
      await updateTextNodes(changedTextNodes, allTextNodes)
    }
    selectedTextNodes = newSelectedTextNodes
    const identicalTextNodeCount =
      selectedTextNodes.length === 1
        ? allTextNodes[selectedTextNodes[0].id].length + 1
        : 0
    emit<SelectionChangedHandler>('SELECTION_CHANGED', identicalTextNodeCount)
  })
  const identicalTextNodeCount =
    selectedTextNodes.length === 1
      ? allTextNodes[selectedTextNodes[0].id].length + 1
      : 0
  showUI<BulkEditTextProps>(
    { height: 120, title: 'Bulk Edit Text', width: 320 },
    { identicalTextNodeCount }
  )
}

function getAllTextNodes(): Record<string, Array<string>> {
  const textNodes = filterTextNodes(figma.currentPage.children.slice())
  const mapContentToIds: Record<string, Array<string>> = {}
  for (const textNode of textNodes) {
    const characters = textNode.characters
    if (typeof mapContentToIds[characters] === 'undefined') {
      mapContentToIds[characters] = []
    }
    mapContentToIds[characters].push(textNode.id)
  }
  const result: Record<string, Array<string>> = {}
  for (const textNode of textNodes) {
    result[textNode.id] = mapContentToIds[textNode.characters].filter(function (
      id: string
    ): boolean {
      return id !== textNode.id
    })
  }
  return result
}

async function updateTextNodes(
  changedTextNodes: Array<TextNode>,
  allTextNodes: Record<string, Array<string>>
): Promise<void> {
  for (const changedTextNode of changedTextNodes) {
    const textNodes = allTextNodes[changedTextNode.id].map(function (
      id: string
    ) {
      return figma.getNodeById(id) as TextNode
    })
    for (const textNode of textNodes) {
      await copyTextNode(changedTextNode, textNode)
    }
  }
}

function computeChangedTextNodes(
  oldSelectedTextNodes: Array<TextNode>,
  newSelectedTextNodes: Array<TextNode>
): Array<TextNode> {
  const newIds: Record<string, boolean> = {}
  for (const textNode of newSelectedTextNodes) {
    newIds[textNode.id] = true
  }
  const result: Array<TextNode> = []
  for (const textNode of oldSelectedTextNodes) {
    if (typeof newIds[textNode.id] === 'undefined') {
      result.push(textNode)
    }
  }
  return result
}
