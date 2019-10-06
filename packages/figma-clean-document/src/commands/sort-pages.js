/* global figma */
import { sortLayersByName } from '../sort-layers-by-name'

export default function () {
  const pages = sortLayersByName(figma.root.children)
  pages.forEach(function (page, index) {
    figma.root.insertChild(index, page)
  })
  figma.closePlugin('✔ \u00a0 Sorted pages')
}
