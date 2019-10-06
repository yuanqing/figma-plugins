import { setAbsoluteY } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'up',
  sortLayers: function (a, b) {
    const difference = a.y - b.y
    return difference !== 0 ? difference : a.x - b.x
  },
  distributeLayers: function (nodes, space) {
    let y = null
    for (const node of nodes) {
      if (y === null) {
        y = node.absoluteTransform[1][2] + node.height + space
        continue
      }
      setAbsoluteY(node, y)
      y = y + node.height + space
    }
  }
})
