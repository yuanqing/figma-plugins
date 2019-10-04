import { commandFactory } from '../command-factory'
import { setAbsoluteY } from '../set-absolute-position'

export default commandFactory({
  direction: 'down',
  sortLayers: function (a, b) {
    return b.y + b.height - (a.y + a.height)
  },
  distributeLayers: function (nodes, space) {
    let y = null
    for (const node of nodes) {
      if (y === null) {
        y = node.absoluteTransform[1][2]
        continue
      }
      y = y - space - node.height
      setAbsoluteY(node, y)
    }
  }
})
