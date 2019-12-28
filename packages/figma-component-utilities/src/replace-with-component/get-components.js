import { traverseLayer } from '@create-figma-plugin/utilities'

export function getComponents () {
  const result = []
  for (const page of figma.root.children) {
    traverseLayer(
      page,
      function ({ id, name, type }) {
        if (type === 'COMPONENT') {
          result.push({
            id,
            name,
            pageName: page.name
          })
          return false
        }
      },
      function ({ type }) {
        return (
          type === 'COMPONENT' ||
          type === 'FRAME' ||
          type === 'GROUP' ||
          type === 'PAGE'
        )
      }
    )
  }
  return result
}
