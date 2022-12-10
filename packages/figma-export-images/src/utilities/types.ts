import { EventHandler } from '@create-figma-plugin/utilities'

export type ExportImages = {
  total: number
  zipFileName: string
}

export type ImagePlainObject = {
  name: string
  format: ExportSettings['format']
  suffix: null | string
  bytes: Uint8Array
}

export interface ExportImageResultHandler extends EventHandler {
  name: 'EXPORT_IMAGE_RESULT'
  handler: (index: number, imagePlainObject: ImagePlainObject) => void
}

export interface ExportImagesRequestHandler extends EventHandler {
  name: 'EXPORT_IMAGES_REQUEST'
  handler: () => void
}
export interface ExportImagesCompleteHandler extends EventHandler {
  name: 'EXPORT_IMAGES_COMPLETE'
  handler: () => void
}
