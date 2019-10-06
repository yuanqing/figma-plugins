import { setAbsoluteY } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'down',
  sortLayers: function (a, b) {
    const difference = b.y + b.height - (a.y + a.height)
    return difference !== 0 ? difference : a.x - b.x
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
