import { commandFactory } from '../command-factory'
import { distributeLayersUp } from './distribute-layers-up'

export default commandFactory('up', distributeLayersUp)
