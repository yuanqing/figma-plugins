import { emit, on } from '@create-figma-plugin/utilities'

import { createCanvasElementFromBytesAsync } from './create-canvas-element-from-bytes-async.js'
import { readBytesFromCanvasElement } from './read-bytes-from-canvas-element-async.js'
import {
  TransformImageColorsRequest,
  TransformImageColorsResult,
  UiFactoryOptions
} from './types.js'

export function uiFactory({ transformImageData }: UiFactoryOptions) {
  return function (): void {
    on<TransformImageColorsRequest>(
      'TRANSFORM_IMAGE_COLORS_REQUEST',
      async function (options: { bytes: Uint8Array }) {
        const { bytes } = options
        const canvasElement = await createCanvasElementFromBytesAsync(bytes)
        const context = canvasElement.getContext(
          '2d'
        ) as CanvasRenderingContext2D
        const imageData = context.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const invertedImageData = transformImageData(imageData)
        context.putImageData(invertedImageData, 0, 0)
        emit<TransformImageColorsResult>('TRANSFORM_IMAGE_COLORS_RESULT', {
          bytes: await readBytesFromCanvasElement(canvasElement)
        })
      }
    )
  }
}
