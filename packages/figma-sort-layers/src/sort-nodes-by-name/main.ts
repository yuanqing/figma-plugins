import { sortNodesByName } from '@create-figma-plugin/utilities'

import { mainFactory } from '../utilities/main-factory'

export default mainFactory({
  sortNodes: sortNodesByName,
  successMessage: 'Sorted selected layers by name'
})
