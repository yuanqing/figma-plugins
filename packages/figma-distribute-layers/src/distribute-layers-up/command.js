import { commandFactory } from '../command-factory'
import { setAbsoluteY } from '../set-absolute-position'

export default commandFactory({
  direction: 'up',
  sortLayers: function (a, b) {
    return a.y - b.y
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
