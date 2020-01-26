import { commandFactory } from '../utilities/command-factory'
import { distributeLayersDown } from './utilities/distribute-layers-down'

export default commandFactory('down', distributeLayersDown)
