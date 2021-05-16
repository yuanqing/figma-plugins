import { cloneObject, insertBeforeNode } from '@create-figma-plugin/utilities'

import { copyAttributes } from './copy-attributes.js'
import { getReferenceNode } from './get-reference-node.js'

export function createComponent(node: SceneNode): ComponentNode {
  const component = figma.createComponent()
  component.name = node.name
  component.resizeWithoutConstraints(node.width, node.height)
  component.x = node.absoluteTransform[0][2]
  component.y = node.absoluteTransform[1][2]
  component.fills = []
  // Copy either `node` itself or `node.children` into `component`
  if (
    (node.type === 'FRAME' ||
      node.type === 'GROUP' ||
      node.type === 'INSTANCE') &&
    typeof node.children !== 'undefined'
  ) {
    for (const child of node.children) {
      component.appendChild(child.clone())
    }
    copyAttributes(node, component)
  } else {
    const clone = node.clone()
    component.appendChild(clone)
    clone.x = 0
    clone.y = 0
    if (clone.exportSettings.length > 0) {
      component.exportSettings = cloneObject(clone.exportSettings)
      clone.exportSettings = []
    }
  }
  const referenceNode = getReferenceNode(node)
  insertBeforeNode(component, referenceNode)
  return component
}
