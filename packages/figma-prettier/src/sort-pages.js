import naturalCompare from 'natural-compare-lite'

export default function (document) {
  const pages = document.children.slice().sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName === bName) {
      return naturalCompare(a.id, b.id)
    }
    return naturalCompare(aName, bName)
  })
  pages.forEach(function (page, index) {
    document.insertChild(index, page)
  })
}
