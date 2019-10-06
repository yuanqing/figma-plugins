import { setAbsoluteX } from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'left',
  sortLayers: function (a, b) {
    const difference = a.x - b.x
    return difference !== 0 ? difference : a.y - b.y
  },
  distributeLayers: function (layers, space) {
    let x = null
    for (const layer of layers) {
      if (x === null) {
        x = layer.absoluteTransform[0][2] + layer.width + space
        continue
      }
      setAbsoluteX(layer, x)
      x = x + layer.width + space
    }
  }
})
