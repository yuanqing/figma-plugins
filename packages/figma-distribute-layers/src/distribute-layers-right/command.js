import {
  getAbsolutePosition,
  setAbsoluteX
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'right',
  sortLayers: function (a, b) {
    const aAbsolute = getAbsolutePosition(a)
    const bAbsolute = getAbsolutePosition(b)
    const difference = bAbsolute.x + b.width - (aAbsolute.x + a.width)
    return difference !== 0 ? difference : aAbsolute.y - bAbsolute.y
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
