import { MIXED_NUMBER } from '@create-figma-plugin/utilities'

import { Dimensions } from './types'

export function computeDimensions(nodes: Array<SceneNode>): Dimensions {
  if (nodes.length === 0) {
    return {
      height: null,
      width: null
    }
  }
  if (nodes.length === 1) {
    const { height, width } = nodes[0]
    return { height, width }
  }
  const [firstNode, ...rest] = nodes
  const result: Dimensions = {
    height: firstNode.height,
    width: firstNode.width
  }
  for (const { width, height } of rest) {
    if (result.width !== MIXED_NUMBER && result.width !== width) {
      result.width = MIXED_NUMBER
    }
    if (result.height !== MIXED_NUMBER && result.height !== height) {
      result.height = MIXED_NUMBER
    }
  }
  return result
}
