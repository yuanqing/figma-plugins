/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'

export function getLayers () {
  const result = {}
  for (const page of figma.root.children) {
    for (const layer of page.children) {
      traverseLayer(
        layer,
        function (layer) {
          const { id, name, type } = layer
          if (
            (type === 'COMPONENT' || type === 'FRAME') &&
            typeof result[id] === 'undefined'
          ) {
            result[id] = {
              id,
              name,
              pageId: page.id,
              pageName: page.name,
              type
            }
          }
        },
        function ({ type }) {
          return type === 'FRAME' || type === 'GROUP' || type === 'COMPONENT'
        }
      )
    }
  }
  return Object.values(result).sort(sortComparator)
}

function sortComparator (a, b) {
  const options = { numeric: true }
  const aName = a.name.toLowerCase()
  const bName = b.name.toLowerCase()
  if (aName === bName) {
    const aPageName = a.pageName.toLowerCase()
    const bPageName = b.pageName.toLowerCase()
    if (aPageName === bPageName) {
      return a.id.localeCompare(b.id, options)
    }
    return aPageName.localeCompare(bPageName, options)
  }
  return aName.localeCompare(bName, options)
}
