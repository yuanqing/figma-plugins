import { traverseLayer } from '@create-figma-plugin/utilities'

export function getLayers () {
  const result = {}
  for (const page of figma.root.children) {
    for (const layer of page.children) {
      traverseLayer(
        layer,
        function (layer) {
          const { type, id } = layer
          if (
            (type === 'COMPONENT' || type === 'FRAME') &&
            typeof result[id] === 'undefined'
          ) {
            result[id] = layer
          }
        },
        function ({ type }) {
          return type === 'FRAME' || type === 'GROUP' || type === 'COMPONENT'
        }
      )
    }
  }
  return Object.values(result)
}
