import { uiFactory } from '../utilities/ui-factory.js'
import { invertImageData } from './utilities/desaturate-image-data.js'

export default uiFactory({
  transformImageData: invertImageData
})
