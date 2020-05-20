import {
  formatErrorMessage,
  formatSuccessMessage,
  insertBeforeNode,
  isWithinInstance,
  pluralize
} from '@create-figma-plugin/utilities'

import { OFFSET } from '../utilities/constants'
import { createComponent } from './utilities/create-component'

export default async function (): Promise<void> {
  const nodes = figma.currentPage.selection
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const newSelection = []
  for (const node of nodes) {
    const component = node.type === 'COMPONENT' ? node : createComponent(node)
    if (isWithinInstance(node) === false) {
      const instance = component.createInstance()
      instance.x = node.x
      instance.y = node.y
      insertBeforeNode(instance, node)
      if (node.type !== 'COMPONENT') {
        node.remove()
      }
    }
    component.x += OFFSET
    component.y += OFFSET
    newSelection.push(component)
  }
  figma.currentPage.selection = newSelection
  figma.closePlugin(
    formatSuccessMessage(
      `Created ${pluralize(
        nodes.length,
        'component from layer',
        `components from ${nodes.length} layers`
      )}`
    )
  )
}
