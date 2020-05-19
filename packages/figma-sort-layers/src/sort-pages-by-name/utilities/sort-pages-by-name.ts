import naturalCompare from 'natural-compare-lite'

export function sortPagesByName(): Array<PageNode> {
  return figma.root.children.slice().sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName !== bName) {
      return naturalCompare(aName, bName)
    }
    return naturalCompare(a.id, b.id)
  })
}
