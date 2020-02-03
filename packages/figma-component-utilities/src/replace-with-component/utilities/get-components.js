import { sortLayersByName, traverseLayer } from '@create-figma-plugin/utilities'

export function getComponents () {
  const result = []
  for (const page of figma.root.children) {
    traverseLayer(
      page,
      function ({ id, name, type, x, y }) {
        if (type === 'COMPONENT') {
          result.push({
            id,
            name,
            pageName: page.name,
            x,
            y
          })
        }
      },
      function ({ type }) {
        return type === 'COMPONENT' || type === 'INSTANCE'
      }
    )
  }
  return sortLayersByName(result)
}
