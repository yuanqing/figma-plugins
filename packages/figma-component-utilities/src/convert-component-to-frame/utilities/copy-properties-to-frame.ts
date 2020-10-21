import { cloneObject } from '@create-figma-plugin/utilities'

export function copyPropertiesToFrame(
  node: ComponentNode | InstanceNode,
  frame: FrameNode
): void {
  // Base node properties
  frame.name = node.name

  // Scene properties
  frame.visible = node.visible
  frame.locked = node.locked

  // Frame properties
  frame.clipsContent = cloneObject(node.clipsContent)
  frame.guides = cloneObject(node.guides)
  frame.layoutGrids = cloneObject(node.guides)
  frame.gridStyleId = node.gridStyleId
  frame.layoutMode = node.layoutMode
  if (frame.layoutMode !== 'NONE') {
    frame.counterAxisSizingMode = node.counterAxisSizingMode
    frame.horizontalPadding = node.horizontalPadding
    frame.verticalPadding = node.verticalPadding
    frame.itemSpacing = node.itemSpacing
  }

  // Geometry-related properties
  frame.fills = cloneObject(node.fills)
  frame.strokes = cloneObject(node.strokes)
  frame.strokeWeight = node.strokeWeight
  frame.strokeMiterLimit = node.strokeMiterLimit
  frame.strokeAlign = node.strokeAlign
  frame.strokeCap = node.strokeCap
  frame.strokeJoin = node.strokeJoin
  frame.dashPattern = cloneObject(node.dashPattern)
  frame.fillStyleId = node.fillStyleId
  frame.strokeStyleId = node.strokeStyleId

  // Corner-related properties
  frame.cornerRadius = node.cornerRadius
  frame.cornerSmoothing = node.cornerSmoothing
  if (frame.cornerRadius === figma.mixed) {
    frame.topLeftRadius = node.topLeftRadius
    frame.topRightRadius = node.topRightRadius
    frame.bottomLeftRadius = node.bottomLeftRadius
    frame.bottomRightRadius = node.bottomRightRadius
  }

  // Blend-related properties
  frame.opacity = node.opacity
  frame.blendMode = node.blendMode
  frame.isMask = node.isMask
  frame.effects = cloneObject(node.effects)
  frame.effectStyleId = node.effectStyleId

  // Layout-related properties
  frame.resizeWithoutConstraints(node.width, node.height)
  frame.x = node.x
  frame.y = node.y
  frame.rotation = node.rotation
  frame.constrainProportions = node.constrainProportions
  frame.layoutAlign = node.layoutAlign
  frame.constraints = cloneObject(node.constraints)

  // Export-related properties
  frame.exportSettings = cloneObject(node.exportSettings)
}
