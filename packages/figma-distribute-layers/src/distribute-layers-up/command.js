import {
  getAbsolutePosition,
  setAbsoluteY
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'up',
  sortLayers: function (a, b) {
    const aAbsolute = getAbsolutePosition(a)
    const bAbsolute = getAbsolutePosition(b)
    const difference = aAbsolute.y - bAbsolute.y
    return difference !== 0 ? difference : aAbsolute.x - bAbsolute.x
  },
  distributeLayers: function (layers, space) {
    let y = null
    for (const layer of layers) {
      if (y === null) {
        y = layer.absoluteTransform[1][2] + layer.height + space
        continue
      }
      setAbsoluteY(layer, y)
      y = y + layer.height + space
    }
  }
})
