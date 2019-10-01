/* global figma */

import naturalCompare from 'natural-compare-lite'

export function sortPages () {
  const pages = figma.root.children.slice().sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName === bName) {
      return naturalCompare(a.id, b.id)
    }
    return naturalCompare(aName, bName)
  })
  pages.forEach(function (page, index) {
    figma.root.insertChild(index, page)
  })
}
