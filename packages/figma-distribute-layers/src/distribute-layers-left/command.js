import { setAbsoluteX } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'left',
  sortLayers: function (a, b) {
    const difference = a.x - b.x
    return difference !== 0 ? difference : a.y - b.y
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
