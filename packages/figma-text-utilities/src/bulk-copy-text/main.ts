import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  once,
  pluralize,
  showUI
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import {
  CloseUIHandler,
  CopyTextToClipboardProps,
  CopyTextToClipboardRequest,
  CopyTextToClipboardSuccess,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select at least 1 text layer'))
    return
  }
  const nodes = getSelectedTextNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>('SUBMIT', function () {
    const nodes = getSelectedTextNodes()
    const text = collectText(nodes)
    if (text.length === 0 || text === '\n') {
      figma.closePlugin(formatErrorMessage('Nothing to copy'))
      return
    }
    emit<CopyTextToClipboardRequest>('COPY_TEXT_TO_CLIPBOARD_REQUEST', {
      count: nodes.length,
      text
    })
  })
  once<CopyTextToClipboardSuccess>(
    'COPY_TEXT_TO_CLIPBOARD_SUCCESS',
    function (count: number) {
      figma.closePlugin(
        formatSuccessMessage(
          `Copied ${count} ${pluralize(count, 'text layer')}`
        )
      )
    }
  )
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      getSelectedTextNodes().length
    )
  })
  showUI<CopyTextToClipboardProps>(
    { height: 100, width: 240 },
    { count: nodes.length }
  )
}

function collectText(nodes: Array<TextNode>): string {
  return nodes
    .map(function (node: TextNode) {
      return node.characters
    })
    .join('\n')
}
