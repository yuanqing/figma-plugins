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
  const { width, height } = await computeImageDimensions(imageBytes)
  const imagePaint = createImagePaint(imageBytes)
  const layer = figma.createRectangle()
  insertBeforeLayer(layer, group)
  layer.resize(width / resolution, height / resolution)
  layer.x = group.x
  layer.y = group.y
  layer.fills = [imagePaint]
  return layer
}

async function computeImageDimensions (imageBytes) {
  return new Promise(function (resolve) {
    once('COMPUTE_IMAGE_WIDTH_RESULT', function (dimensions) {
      figma.ui.hide()
      resolve(dimensions)
    })
    showUI({ visible: false })
    emit('COMPUTE_IMAGE_WIDTH_REQUEST', { imageBytes })
  })
}
