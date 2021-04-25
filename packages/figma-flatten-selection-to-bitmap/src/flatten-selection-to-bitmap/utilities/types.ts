import { EventHandler } from '@create-figma-plugin/utilities'
import { ImageNodePlainObject } from 'figma-insert-big-image/src/utilities/types'

export interface SplitImageRequestHandler extends EventHandler {
  name: 'SPLIT_IMAGE_REQUEST'
  handler: (bytes: Uint8Array) => void
}
export interface SplitImageResultHandler extends EventHandler {
  name: 'SPLIT_IMAGE_RESULT'
  handler: (imageNodePlainObjects: Array<ImageNodePlainObject>) => void
}
