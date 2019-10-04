import { commandFactory } from '../command-factory'
import { setAbsoluteX } from '../set-absolute-position'

export default commandFactory({
  direction: 'left',
  sortLayers: function (a, b) {
    return a.x - b.x
  },
  distributeLayers: function (nodes, space) {
    let x = null
    for (const node of nodes) {
      if (x === null) {
        x = node.absoluteTransform[0][2] + node.width + space
        continue
      }
      setAbsoluteX(node, x)
      x = x + node.width + space
    }
  }
})
