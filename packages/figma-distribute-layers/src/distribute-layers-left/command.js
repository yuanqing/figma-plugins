import { commandFactory } from '../command-factory'
import { distributeLayersLeft } from './distribute-layers-left'

export default commandFactory('left', distributeLayersLeft)
