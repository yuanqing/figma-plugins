import {
  emit,
  formatErrorMessage,
  getSelectedNodesOrAllNodes,
  once,
  showUI
} from '@create-figma-plugin/utilities'

import {
  ExportImageResultHandler,
  ExportImages,
  ExportImagesCompleteHandler,
  ExportImagesRequestHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const nodes = getNodesWithExportSettings()
  const total = nodes.length
  if (total === 0) {
    const scope =
      figma.currentPage.selection.length === 0 ? 'on page' : 'in selection'
    figma.closePlugin(
      formatErrorMessage(`No nodes with export settings ${scope}`)
    )
    return
  }
  once<ExportImagesRequestHandler>('EXPORT_IMAGES_REQUEST', async function () {
    let index = 0
    for (const node of nodes) {
      for (const exportSetting of node.exportSettings) {
        const bytes = await node.exportAsync(exportSetting)
        emit<ExportImageResultHandler>('EXPORT_IMAGE_RESULT', index, {
          bytes,
          format: exportSetting.format,
          name: node.name,
          suffix:
            typeof exportSetting.suffix === 'undefined'
              ? null
              : exportSetting.suffix
        })
      }
      index += 1
    }
  })
  once<ExportImagesCompleteHandler>('EXPORT_IMAGES_COMPLETE', function () {
    figma.closePlugin()
  })
  showUI<ExportImages>(
    {
      height: 120,
      width: 240
    },
    {
      total,
      zipFileName: figma.root.name
    }
  )
}

function getNodesWithExportSettings(): Array<SceneNode> {
  let result: Array<SceneNode> = []
  for (const node of getSelectedNodesOrAllNodes()) {
    if (node.exportSettings.length > 0) {
      result.push(node)
    }
    if ('children' in node) {
      result = result.concat(
        node.findAll(function (node: SceneNode): boolean {
          return node.exportSettings.length > 0
        })
      )
    }
  }
  return result
}
