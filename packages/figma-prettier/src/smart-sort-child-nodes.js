export default function (node) {
  if (typeof node.children === 'undefined') {
    return
  }
  const [firstChildNode, ...children] = node.children
  const result = [firstChildNode]
  for (const childNode of children) {
    let i = 0
    let insertedChildNode = false
    while (i < result.length) {
      const resultNode = result[i]
      if (
        checkIfNodesOverlap(childNode, resultNode) === false &&
        compareYXposition(childNode, resultNode)
      ) {
        result.splice(i - 1, 0, childNode)
        insertedChildNode = true
        break
      }
      i++
    }
    if (insertedChildNode === false) {
      result.splice(result.length, 0, childNode)
    }
  }
  result.forEach(function (resultNode, index) {
    node.insertChild(result.length - 1 - index, resultNode)
  })
}

function checkIfNodesOverlap (a, b) {
  // Returns `true` if `a` and `b` overlap
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  )
}

function compareYXposition (a, b) {
  // Returns `true` if `a` should be moved before `b`
  const yPositionDifference = a.y - b.y
  if (yPositionDifference !== 0) {
    return yPositionDifference < 0
  }
  return a.x - b.x < 0
}
