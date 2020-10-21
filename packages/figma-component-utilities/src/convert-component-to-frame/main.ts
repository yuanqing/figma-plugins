import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { convertComponentToFrame } from './utilities/convert-component-to-frame'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select a component'))
    return
  }
  const nodes = figma.currentPage.selection.filter(function (node) {
    return node.type === 'COMPONENT' || node.type === 'INSTANCE'
  }) as Array<ComponentNode | InstanceNode>
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No components in selection'))
    return
  }
  const newSelection = []
  for (const node of nodes) {
    const frame = convertComponentToFrame(node)
    newSelection.push(frame)
  }
  figma.currentPage.selection = newSelection
  figma.closePlugin(
    formatSuccessMessage(
      `Converted ${nodes.length} ${pluralize(
        nodes.length,
        'component'
      )} to ${pluralize(nodes.length, 'frame')}`
    )
  )
}
