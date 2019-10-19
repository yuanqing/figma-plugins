import {
  getAbsolutePosition,
  setAbsoluteY
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'down',
  sortLayers: function (a, b) {
    const aAbsolute = getAbsolutePosition(a)
    const bAbsolute = getAbsolutePosition(b)
    const difference = bAbsolute.y + b.height - (aAbsolute.y + a.height)
    return difference !== 0 ? difference : aAbsolute.x - bAbsolute.x
  },
  distributeLayers: function (layers, space) {
    let y = null
    for (const layer of layers) {
      if (y === null) {
        y = layer.absoluteTransform[1][2]
        continue
      }
      y = y - space - layer.height
      setAbsoluteY(layer, y)
    }
  }
})
