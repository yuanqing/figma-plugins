import {
  createImagePaint,
  emit,
  insertBeforeLayer,
  once,
  showUI
} from '@create-figma-plugin/utilities'

export async function createImageLayerFromGroupAsync (group, resolution) {
  const exportSettings = {
    format: 'PNG',
    constraint: {
      type: 'SCALE',
      value: resolution
    }
  }
  const imageBytes = await group.exportAsync(exportSettings)
  const dimensions = await computeImageDimensions(imageBytes)
  const imagePaint = createImagePaint(imageBytes)
  const layer = figma.createRectangle()
  insertBeforeLayer(layer, group)
  const width = dimensions.width / resolution
  const height = dimensions.height / resolution
  layer.resize(width, height)
  layer.x = group.x - (width - group.width) / 2
  layer.y = group.y - (height - group.height) / 2
  layer.fills = [imagePaint]
  return layer
}

async function computeImageDimensions (imageBytes) {
  return new Promise(function (resolve) {
    once('COMPUTE_IMAGE_WIDTH_RESULT', function (dimensions) {
      figma.ui.close()
      resolve(dimensions)
    })
    showUI({ visible: false })
    emit('COMPUTE_IMAGE_WIDTH_REQUEST', { imageBytes })
  })
}
