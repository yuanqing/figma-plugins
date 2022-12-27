import { mainFactory } from '../utilities/main-factory.js'
import { desaturateRgbColor } from './utilities/desaturate-rgb-color.js'

export default mainFactory({
  successMessagePrefix: 'Desaturated',
  transformRgb: desaturateRgbColor
})
