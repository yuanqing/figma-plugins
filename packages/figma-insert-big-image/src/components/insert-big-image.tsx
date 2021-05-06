import {
  Checkbox,
  Container,
  FileUploadButton,
  FileUploadDropzone,
  LoadingIndicator,
  MiddleAlign,
  Text,
  useInitialFocus,
  useWindowKeyDownHandler,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { splitImageAsync } from '../utilities/split-image-async'
import {
  CloseUIHandler,
  InsertBigImageHandler,
  InsertBigImageProps
} from '../utilities/types'

export function InsertBigImage(props: InsertBigImageProps): JSX.Element {
  const [insertAs2x, setInsertAs2x] = useState(props.insertAs2x)
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  useWindowKeyDownHandler('Escape', function () {
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
          insertAs2x,
          name
        })
        setIndex(index)
        index += 1
      }
    },
    [insertAs2x, setIndex, setTotal]
  )
  const initialFocus = useInitialFocus()
  if (total > 0) {
    return (
      <MiddleAlign>
        <LoadingIndicator color="blue" />
        <VerticalSpace space="small" />
        <Text align="center" numeric>
          {total === 1
            ? 'Inserting image…'
            : `Inserting image ${index + 1} of ${total}…`}
        </Text>
        <VerticalSpace space="extraLarge" />{' '}
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
        <Text align="center" bold>
          Drop image files here
        </Text>
        <VerticalSpace space="small" />
        <Text align="center" muted>
          or
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
        <Text align="center" muted>
          Supported formats: JPEG, PNG
        </Text>
      </FileUploadDropzone>
      <VerticalSpace space="medium" />
      <Checkbox
        name="insertAs2x"
        onValueChange={setInsertAs2x}
        value={insertAs2x}
      >
        <Text>Insert as a @2x image</Text>
      </Checkbox>
      <VerticalSpace space="medium" />
    </Container>
  )
}

function trimExtension(fileName: string): string {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}
