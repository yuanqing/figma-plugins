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
import { createMatrix } from './utilities/create-matrix.js'
import { stringifyMatrixToCSV } from './utilities/stringify-matrix-to-csv.js'
import { stringifyMatrixToHTML } from './utilities/stringify-matrix-to-html.js'

export default function (): void {
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
    const matrix = createMatrix(nodes)
    emit<CopyTextToClipboardRequest>('COPY_TEXT_TO_CLIPBOARD_REQUEST', {
      count: nodes.length,
      html: stringifyMatrixToHTML(matrix),
      text: stringifyMatrixToCSV(matrix)
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
    {
      count: nodes.length
    }
  )
}
