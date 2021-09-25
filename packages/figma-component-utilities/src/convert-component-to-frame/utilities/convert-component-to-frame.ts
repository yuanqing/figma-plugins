import { copyPropertiesToFrame } from './copy-properties-to-frame.js'

export function convertComponentToFrame(
  node: ComponentNode | InstanceNode
): FrameNode {
  const frame = figma.createFrame()
  if (node.parent === null) {
    throw new Error('Frame has no parent')
  }
  node.parent.insertChild(node.parent.children.indexOf(node), frame)
  for (const child of node.children) {
    if (child.type === 'COMPONENT') {
      const instance = child.createInstance()
      instance.x = child.x
      instance.y = child.y
      frame.appendChild(instance)
    } else {
      if ('clone' in child) {
        frame.appendChild(child.clone())
      }
    }
  }
  node.remove()
  copyPropertiesToFrame(node, frame)
  return frame
}
