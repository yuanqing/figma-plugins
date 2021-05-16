import { compareStringArrays } from '@create-figma-plugin/utilities'
import arrayShuffle from 'array-shuffle'

import { extractNodeIds } from '../../utilities/extract-node-ids.js'

export function randomizeNodesSortOrder(
  nodes: Array<SceneNode>
): null | Array<SceneNode> {
  let result
  do {
    result = arrayShuffle(nodes)
  } while (
    compareStringArrays(extractNodeIds(result), extractNodeIds(nodes)) === true
  )
  return result
}
