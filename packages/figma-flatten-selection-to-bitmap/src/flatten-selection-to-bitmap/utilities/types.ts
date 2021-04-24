import { EventHandler } from '@create-figma-plugin/utilities'
import { ImageNodeAttributes } from 'figma-insert-big-image/src/utilities/types'

export interface SplitImageRequestHandler extends EventHandler {
  name: 'SPLIT_IMAGE_REQUEST'
  handler: (bytes: Uint8Array) => void
}
export interface SplitImageResultHandler extends EventHandler {
  name: 'SPLIT_IMAGE_RESULT'
  handler: (images: Array<ImageNodeAttributes>) => void
}
