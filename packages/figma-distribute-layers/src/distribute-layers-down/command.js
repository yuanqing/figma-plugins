import { commandFactory } from '../command-factory'
import { distributeLayersDown } from './distribute-layers-down'

export default commandFactory('down', distributeLayersDown)
