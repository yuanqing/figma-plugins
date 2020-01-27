import {
  sortLayersByName,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'
import { arrangeGroups } from './arrange-groups'
import { groupLayers } from './group-layers'

export function organizeLayers (
  layers,
  combineSingleLayerGroups,
  groupDefinition,
  horizontalSpace,
  verticalSpace
) {
  const groups = groupLayers(layers, combineSingleLayerGroups, groupDefinition)
  arrangeGroups(groups, horizontalSpace, verticalSpace)
  const result = sortLayersByName(layers)
  updateLayersSortOrder(result)
}
