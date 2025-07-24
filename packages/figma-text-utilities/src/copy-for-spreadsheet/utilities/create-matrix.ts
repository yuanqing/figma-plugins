import { getAbsolutePosition } from '@create-figma-plugin/utilities'

import { sortNodesByPosition } from '../../utilities/sort-nodes-by-position.js'

export function createMatrix(nodes: Array<TextNode>): Array<Array<string>> {
  const rows = mapNodeIdsToIndex(groupNodesByAxis(nodes, 'y'))
  const columns = mapNodeIdsToIndex(groupNodesByAxis(nodes, 'x'))
  const result: Array<Array<string>> = []
  for (const node of nodes) {
    const rowIndex = rows[node.id]
    const columnIndex = columns[node.id]
    if (typeof result[rowIndex] === 'undefined') {
      extendArray(result, rowIndex, createEmptyArray)
    }
    if (typeof result[rowIndex][columnIndex] === 'undefined') {
      extendArray(result[rowIndex], columnIndex, createEmptyString)
    }
    if (result[rowIndex][columnIndex] === '') {
      result[rowIndex][columnIndex] = node.characters
    } else {
      result[rowIndex][columnIndex] =
        `${result[rowIndex][columnIndex]}\n${node.characters}`
    }
  }
  return result
}

function groupNodesByAxis(
  nodes: Array<TextNode>,
  axis: keyof Vector
): Array<Array<TextNode>> {
  const [firstNode, ...rest] = sortNodesByPosition(nodes, axis)
  const result: Array<Array<TextNode>> = []
  let group: Array<TextNode> = [firstNode]
  let endPosition =
    getAbsolutePosition(firstNode)[axis] + computeTextNodeDimension(firstNode)
  for (const node of rest) {
    const position = getAbsolutePosition(node)[axis]
    const dimension = computeTextNodeDimension(node)
    if (position > endPosition) {
      endPosition = position + dimension
      result.push(group)
      group = [node]
      continue
    }
    endPosition = Math.max(endPosition, position + dimension)
    group.push(node)
  }
  result.push(group)
  return result
}

function computeTextNodeDimension(node: TextNode): number {
  const lineHeight = node.getRangeLineHeight(0, 1) as LineHeight
  if (lineHeight.unit === 'PIXELS') {
    return lineHeight.value
  }
  const fontSize = node.getRangeFontSize(0, 1) as number
  if (lineHeight.unit === 'PERCENT') {
    return (fontSize * lineHeight.value) / 100
  }
  return Math.round(fontSize * 1.2)
}

function mapNodeIdsToIndex(
  groups: Array<Array<TextNode>>
): Record<string, number> {
  const result: Record<string, number> = {}
  let index = 0
  for (const group of groups) {
    for (const node of group) {
      result[node.id] = index
    }
    index += 1
  }
  return result
}

function extendArray<T>(
  array: Array<T>,
  endIndex: number,
  createArrayItem: () => T
): void {
  let index = 0
  while (index <= endIndex) {
    if (typeof array[index] === 'undefined') {
      array[index] = createArrayItem()
    }
    index += 1
  }
  return
}

function createEmptyString() {
  return ''
}
function createEmptyArray() {
  return []
}
