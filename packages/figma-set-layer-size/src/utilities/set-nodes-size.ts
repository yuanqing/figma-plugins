export function setNodesSize(
  node: SceneNode,
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
    if ('resize' in node) {
      node.resize(newWidth, newHeight)
    }
  } else {
    if ('resizeWithoutConstraints' in node) {
      node.resizeWithoutConstraints(newWidth, newHeight)
    }
  }
}
