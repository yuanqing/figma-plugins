import {
  computeSiblingNodes,
  formatErrorMessage,
  formatSuccessMessage,
  isWithinInstance,
  pluralize
} from '@create-figma-plugin/utilities'

import { createMaskGroup } from './utilities/create-mask-group'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const siblingNodes = computeSiblingNodes(figma.currentPage.selection.slice())
  if (siblingNodes.length > 1) {
    figma.closePlugin(
      formatErrorMessage('Select sibling layers at the same hierarchy')
    )
    return
  }
  const nodes = siblingNodes[0]
  if (isWithinInstance(nodes[0]) === true) {
    figma.closePlugin(
      formatErrorMessage('Select layers outside instance layers')
    )
    return
  }
  const mask = createMaskGroup(nodes) // `createMaskGroup` returns the underlying mask
  figma.currentPage.selection = [mask]
  figma.closePlugin(
    formatSuccessMessage(
      `Drew mask under ${nodes.length} ${pluralize(
        nodes.length,
        'selected layer'
      )}`
    )
  )
}
