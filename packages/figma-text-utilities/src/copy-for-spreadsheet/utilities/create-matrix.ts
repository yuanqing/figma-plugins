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
      result[rowIndex][
        columnIndex
      ] = `${result[rowIndex][columnIndex]}\n${node.characters}`
    }
  }
  return result
}

function groupNodesByAxis(
  nodes: Array<TextNode>,
  axis: keyof Vector
): Array<Array<TextNode>> {
  const dimension = axis === 'x' ? 'width' : 'height'
  const [firstNode, ...rest] = sortNodesByPosition(nodes, axis)
  const result: Array<Array<TextNode>> = []
  let group: Array<TextNode> = [firstNode]
  let endPosition = getAbsolutePosition(firstNode)[axis] + firstNode[dimension]
  for (const node of rest) {
    const position = getAbsolutePosition(node)[axis]
    if (position > endPosition) {
      endPosition = position + node[dimension]
      result.push(group)
      group = [node]
      continue
    }
    endPosition = Math.max(endPosition, position + node[dimension])
    group.push(node)
  }
  result.push(group)
  return result
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
