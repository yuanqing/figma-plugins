import { MIXED } from './constants'

type Dimensions = {
  width: number | string
  height: number | string
}

export function computeDimensions (
  nodes: Array<{ [key: string]: any }>
): Dimensions {
  if (nodes.length === 0) {
    return { width: '', height: '' }
  }
  if (nodes.length === 1) {
    const { width, height } = nodes[0]
    return { width, height }
  }
  const [firstNode, ...rest] = nodes
  const result: Dimensions = {
    width: firstNode.width,
    height: firstNode.height
  }
  for (const { width, height } of rest) {
    if (result.width !== MIXED && result.width !== width) {
      result.width = MIXED
    }
    if (result.height !== MIXED && result.height !== height) {
      result.height = MIXED
    }
  }
  return result
}
