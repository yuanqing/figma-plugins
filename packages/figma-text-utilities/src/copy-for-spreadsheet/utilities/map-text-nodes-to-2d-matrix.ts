import { groupNodesByAxis } from './group-nodes-by-axis.js'

export function mapTextNodesTo2dMatrix(
  nodes: Array<TextNode>
): Array<Array<string>> {
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
    result[rowIndex][columnIndex] = node.characters
  }
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
