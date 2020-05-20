import {
  collapseLayer,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

import { Group } from '../../types'
import { arrangeGroups } from './arrange-groups'
import { groupLayers } from './group-layers'

export function organizeLayers(
  layers: Array<SceneNode>,
  combineSingleLayerGroups: boolean,
  groupDefinition: number,
  horizontalSpace: number,
  verticalSpace: number
): void {
  const groups = groupLayers(layers, combineSingleLayerGroups, groupDefinition)
  arrangeGroups(groups, horizontalSpace, verticalSpace)
  updateSortOrder(groups)
  collapseLayers(layers)
}

function updateSortOrder(groups: Array<Group>): void {
  const layers = []
  for (const group of groups) {
    for (const layer of group.layers) {
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
