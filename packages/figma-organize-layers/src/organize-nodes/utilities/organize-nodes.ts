import {
  collapseLayer,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

import { GroupDefinition } from '../../utilities/types'
import { arrangeGroups } from './arrange-groups'
import { computeGroups } from './compute-groups'
import { Group } from './types'

export function organizeNodes(
  nodes: Array<SceneNode>,
  options: {
    combineSingleLayerGroups: boolean
    groupDefinition: GroupDefinition
    horizontalSpace: number
    verticalSpace: number
  }
): void {
  const {
    combineSingleLayerGroups,
    groupDefinition,
    horizontalSpace,
    verticalSpace
  } = options
  const groups = computeGroups(nodes, {
    combineSingleLayerGroups,
    groupDefinition
  })
  arrangeGroups(groups, { horizontalSpace, verticalSpace })
  updateSortOrder(groups)
  collapseLayers(nodes)
}

function updateSortOrder(groups: Array<Group<SceneNode>>): void {
  const layers = []
  for (const group of groups.slice().reverse()) {
    for (const layer of group.nodes.slice().reverse()) {
      layers.push(layer)
    }
  }
  updateNodesSortOrder(layers)
}

function collapseLayers(layers: Array<SceneNode>): void {
  for (const layer of layers) {
    collapseLayer(layer)
  }
}
