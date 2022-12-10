import {
  LoadingIndicator,
  MiddleAlign,
  Text,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { saveImagesAsync } from '../utilities/save-images-async.js'
import {
  ExportImageResultHandler,
  ExportImages,
  ExportImagesCompleteHandler,
  ExportImagesRequestHandler,
  ImagePlainObject
} from '../utilities/types.js'
import styles from './export-images.css'

const UI_MINIMUM_VISIBLE_TIME = 500

const startTimestamp = Date.now()

export function ExportImages(props: ExportImages): JSX.Element {
  const { total, zipFileName } = props
  const [index, setIndex] = useState<number>(0)
  const [images, setImages] = useState<Array<ImagePlainObject>>([])
  useEffect(function () {
    emit<ExportImagesRequestHandler>('EXPORT_IMAGES_REQUEST')
  }, [])
  useEffect(
    function () {
      return on<ExportImageResultHandler>(
        'EXPORT_IMAGE_RESULT',
        async function (index: number, image: ImagePlainObject): Promise<void> {
          setIndex(index)
          images.push(image)
          setImages(images)
          if (index === total - 1) {
            const elapsedTime = Date.now() - startTimestamp
            if (elapsedTime >= UI_MINIMUM_VISIBLE_TIME) {
              await saveImagesAsync({ images, zipFileName })
              emit<ExportImagesCompleteHandler>('EXPORT_IMAGES_COMPLETE')
              return
            }
            setTimeout(async function () {
              await saveImagesAsync({ images, zipFileName })
              emit<ExportImagesCompleteHandler>('EXPORT_IMAGES_COMPLETE')
            }, UI_MINIMUM_VISIBLE_TIME - elapsedTime)
          }
        }
      )
    },
    [images, total, zipFileName]
  )
  return (
    <div class={styles.exportImages}>
      <MiddleAlign>
        <LoadingIndicator color="brand" />
        <VerticalSpace space="small" />
        <Text align="center">
          Exporting image {index + 1} of {total}…
        </Text>
      </MiddleAlign>
    </div>
  )
}
