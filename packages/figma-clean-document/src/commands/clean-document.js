/* global figma */
import { traverseLayer } from '@create-figma-plugin/utilities'
import { deleteHiddenLayer } from '../delete-hidden-layer'
import { smartRenameLayer } from '../smart-rename-layer'
import { smartSortChildLayers } from '../smart-sort-child-layers'
import { sortLayersByName } from '../sort-layers-by-name'

export default function () {
  sortLayersByName(figma.root.children)
  for (const page of figma.root.children) {
    traverseLayer(page, function (layer) {
      if (layer.removed) {
        return
      }
      deleteHiddenLayer(layer)
      smartRenameLayer(layer)
      smartSortChildLayers(layer)
    })
  }
  figma.closePlugin('✔ \u00a0 Cleaned document')
}
