import {
  createImagePaint,
  emit,
  insertBeforeNode,
  once,
  showUI
} from '@create-figma-plugin/utilities'

export async function createImageFromGroupAsync(
  group: GroupNode,
  resolution: number
): Promise<RectangleNode> {
  const exportSettings: ExportSettingsImage = {
    constraint: {
      type: 'SCALE',
      value: resolution
    },
    format: 'PNG'
  }
  const imageBytes = await group.exportAsync(exportSettings)
  const dimensions = await computeImageDimensions(imageBytes)
  const imagePaint = createImagePaint(imageBytes)
  const node = figma.createRectangle()
  insertBeforeNode(node, group)
  const width = dimensions.width / resolution
  const height = dimensions.height / resolution
  node.resize(width, height)
  node.x = group.x - (width - group.width) / 2
  node.y = group.y - (height - group.height) / 2
  node.fills = [imagePaint]
  return node
}

async function computeImageDimensions(
  imageBytes: Uint8Array
): Promise<{ width: number; height: number }> {
  return new Promise(function (resolve) {
    once('COMPUTE_IMAGE_WIDTH_RESULT', function (dimensions) {
      figma.ui.close()
      resolve(dimensions)
    })
    showUI({ visible: false })
    emit('COMPUTE_IMAGE_WIDTH_REQUEST', { imageBytes })
  })
}
