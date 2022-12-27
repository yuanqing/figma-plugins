import { mainFactory } from '../utilities/main-factory.js'
import { invertRgb } from './utilities/invert-rgb.js'

export default mainFactory({
  successMessagePrefix: 'Inverted colors of',
  transformRgb: invertRgb
})
