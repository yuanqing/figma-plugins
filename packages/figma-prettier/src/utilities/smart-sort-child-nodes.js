export default function (node) {
  if (typeof node.children === 'undefined') {
    return
  }
  const length = node.children.length
  node.children.forEach(function (childNode, i) {
    let j = i + 1
    while (j < length) {
      const siblingNode = node.children[j]
      if (
        checkIfNodesOverlap(childNode, siblingNode) === false &&
        compareYXposition(childNode, siblingNode)
      ) {
        // TODO
      }
      j++
    }
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
