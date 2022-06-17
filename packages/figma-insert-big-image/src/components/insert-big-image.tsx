import {
  Bold,
  Checkbox,
  Container,
  FileUploadButton,
  FileUploadDropzone,
  LoadingIndicator,
  MiddleAlign,
  Muted,
  Text,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { splitImageAsync } from '../utilities/split-image-async.js'
import {
  CloseUIHandler,
  DropImagesHandler,
  DroppedImage,
  InsertBigImageHandler,
  InsertBigImageProps,
  SaveSettingsHandler
} from '../utilities/types.js'

export function InsertBigImage(props: InsertBigImageProps): JSX.Element {
  const [insertAs2x, setInsertAs2x] = useState(props.insertAs2x)
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  useWindowKeyDown('Escape', function () {
    if (total > 0) {
      return
    }
    emit<CloseUIHandler>('CLOSE_UI')
  })
  const handleSelectedFiles = useCallback(
    async function (files: Array<File>) {
      const total = files.length
      setTotal(total)
      let index = 0
      for (const file of files) {
        const images = await splitImageAsync(file)
        const name = trimExtension(file.name)
        emit<InsertBigImageHandler>('INSERT_BIG_IMAGE', images, {
          done: index === total - 1,
          name
        })
        setIndex(index)
        index += 1
      }
    },
    [setIndex, setTotal]
  )
  useEffect(
    function () {
      return on<DropImagesHandler>(
        'DROP_IMAGES',
        async function (droppedImages: Array<DroppedImage>) {
          const files: Array<File> = []
          for (const droppedImage of droppedImages) {
            const blob = new Blob([droppedImage.bytes], {
              type: droppedImage.type
            })
            const file = new File([blob], droppedImage.name)
            files.push(file)
          }
          await handleSelectedFiles(files)
        }
      )
    },
    [handleSelectedFiles]
  )
  const handleCheckboxValueChange = useCallback(async function (
    insertAs2x: boolean
  ) {
    setInsertAs2x(insertAs2x)
    emit<SaveSettingsHandler>('SAVE_SETTINGS', insertAs2x)
  },
  [])
  const initialFocus = useInitialFocus()
  if (total > 0) {
    return (
      <MiddleAlign>
        <LoadingIndicator color="brand" />
        <VerticalSpace space="small" />
        <Text align="center" numeric>
          {total === 1
            ? 'Inserting image…'
            : `Inserting image ${index + 1} of ${total}…`}
        </Text>
        <VerticalSpace space="extraLarge" />
        {/* To optically middle-align things */}
      </MiddleAlign>
    )
  }
  const acceptedFileTypes = ['image/jpeg', 'image/png']
  return (
    <Container space="medium">
      <VerticalSpace space="medium" />
      <FileUploadDropzone
        acceptedFileTypes={acceptedFileTypes}
        multiple
        onSelectedFiles={handleSelectedFiles}
      >
        <Text align="center">
          <Bold>Drop images on the canvas</Bold>
        </Text>
        <VerticalSpace space="small" />
        <Text align="center">
          <Muted>or</Muted>
        </Text>
        <VerticalSpace space="small" />
        <FileUploadButton
          {...initialFocus}
          acceptedFileTypes={acceptedFileTypes}
          multiple
          onSelectedFiles={handleSelectedFiles}
        >
          Choose Image Files
        </FileUploadButton>
        <VerticalSpace space="medium" />
        <Text align="center">
          <Muted>Supported formats: JPEG, PNG</Muted>
        </Text>
      </FileUploadDropzone>
      <VerticalSpace space="medium" />
      <Checkbox
        name="insertAs2x"
        onValueChange={handleCheckboxValueChange}
        value={insertAs2x}
      >
        <Text>Insert as a @2x image</Text>
      </Checkbox>
      <VerticalSpace space="medium" />
    </Container>
  )
}

function trimExtension(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf('.'))
}
