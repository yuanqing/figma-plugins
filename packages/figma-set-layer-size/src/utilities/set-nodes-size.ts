import { ResizableNode } from './types'

export function setNodesSize(
  node: ResizableNode,
  options: {
    width: false | number
    height: false | number
    resizeWithConstraints: boolean
  }
): void {
  const { width, height, resizeWithConstraints } = options
  const newWidth = width === false ? node.width : width
  const newHeight = height === false ? node.height : height
  if (node.type === 'GROUP' || resizeWithConstraints === true) {
    node.resize(newWidth, newHeight)
  } else {
    node.resizeWithoutConstraints(newWidth, newHeight)
  }
}
