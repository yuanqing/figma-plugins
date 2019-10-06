import { setAbsoluteX } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'right',
  sortLayers: function (a, b) {
    const difference = b.x + b.width - (a.x + a.width)
    return difference !== 0 ? difference : a.y - b.y
  },
  distributeLayers: function (layers, space) {
    let x = null
    for (const layer of layers) {
      if (x === null) {
        x = layer.absoluteTransform[0][2]
        continue
      }
      x = x - space - layer.width
      setAbsoluteX(layer, x)
    }
  }
})
