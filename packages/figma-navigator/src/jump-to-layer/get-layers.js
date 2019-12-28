import { sortLayersByName, traverseLayer } from '@create-figma-plugin/utilities'

export function getLayers () {
  const result = {}
  for (const page of figma.root.children) {
    for (const layer of page.children) {
      traverseLayer(
        layer,
        function (layer) {
          const { id, name, type, x, y } = layer
          if (
            (type === 'COMPONENT' || type === 'FRAME') &&
            typeof result[id] === 'undefined'
          ) {
            result[id] = {
              id,
              name,
              pageId: page.id,
              pageName: page.name,
              type,
              x,
              y
            }
          }
        },
        function ({ type }) {
          return type === 'FRAME' || type === 'GROUP' || type === 'COMPONENT'
        }
      )
    }
  }
  return sortLayersByName(Object.values(result))
}
