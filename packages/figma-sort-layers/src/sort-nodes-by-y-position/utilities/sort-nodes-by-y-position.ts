import naturalCompare from 'natural-compare-lite'

export function sortNodesByYPosition (
  nodes: Array<SceneNode>
): null | Array<SceneNode> {
  const parent = nodes[0].parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  if ('layoutMode' in parent && parent.layoutMode === 'VERTICAL') {
    return null
  }
  const result = nodes.slice().sort(function (a, b) {
    if (a.y !== b.y) {
      return b.y - a.y
    }
    if (a.x !== b.x) {
      return b.x - a.x
    }
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName !== bName) {
      return naturalCompare(bName, aName)
    }
    return naturalCompare(b.id, a.id)
  })
  return result
}
