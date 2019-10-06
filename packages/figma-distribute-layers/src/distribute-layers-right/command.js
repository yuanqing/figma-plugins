import { setAbsoluteX } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'right',
  sortLayers: function (a, b) {
    const difference = b.x + b.width - (a.x + a.width)
    return difference !== 0 ? difference : a.y - b.y
  },
  distributeLayers: function (nodes, space) {
    let x = null
    for (const node of nodes) {
      if (x === null) {
        x = node.absoluteTransform[0][2]
        continue
      }
      x = x - space - node.width
      setAbsoluteX(node, x)
    }
  }
})
