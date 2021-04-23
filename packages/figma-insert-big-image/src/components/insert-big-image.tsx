import {
  Checkbox,
  Container,
  FileUploadButton,
  FileUploadDropzone,
  Text,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { splitImageAsync } from '../utilities/split-image-async'
import {
  CloseUIHandler,
  InsertBigImageHandler,
  Settings
} from '../utilities/types'
import { Loading } from './loading/loading'

export function InsertBigImage(props: Settings): JSX.Element {
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const isLoading = total > 0
  const { state, handleChange, initialFocus } = useForm(props, {
    onClose: function () {
      if (isLoading === true) {
        return
      }
      emit<CloseUIHandler>('CLOSE_UI')
    }
  })
  const { insertAs2x } = state
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
        index += 1
        setIndex(index)
      }
    },
    [insertAs2x, setIndex, setTotal]
  )
  if (isLoading === true) {
    return (
      <Loading>
        {total === 1
          ? 'Uploading image…'
          : `Uploading image ${index + 1} of ${total}…`}
      </Loading>
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
        onChange={handleChange}
        value={insertAs2x === true}
      >
        <Text>Insert as a @2x image</Text>
      </Checkbox>
    </Container>
  )
}

function trimExtension(fileName: string): string {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}
