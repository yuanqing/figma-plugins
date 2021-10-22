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
  CopyTextToClipboardRequest,
  CopyTextToClipboardResult
} from '../utilities/types.js'
import { mapTextNodesTo2dMatrix } from './utilities/map-text-nodes-to-2d-matrix.js'
import { stringify2dMatrix } from './utilities/stringify-2d-matrix.js'

export default function (): void {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const nodes = getSelectedTextNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  once<CopyTextToClipboardResult>('COPY_TEXT_TO_CLIPBOARD_RESULT', function () {
    figma.closePlugin(
      formatSuccessMessage(
        `Copied ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
      )
    )
  })
  showUI({ height: 129, width: 240 })
  const matrix = mapTextNodesTo2dMatrix(nodes)
  const string = stringify2dMatrix(matrix)
  emit<CopyTextToClipboardRequest>('COPY_TEXT_TO_CLIPBOARD_REQUEST', string)
}
