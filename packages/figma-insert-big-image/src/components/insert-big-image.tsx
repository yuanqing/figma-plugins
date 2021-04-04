/** @jsx h */
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
import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import { splitImageAsync } from '../utilities/split-image-async'
import { Loading } from './loading/loading'

export function InsertBigImage(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange } = useForm(
    {
      ...props,
      currentIndex: -1,
      total: 0
    },
    {
      onClose: function () {
        emit('CLOSE_UI')
      },
      transform: function (state) {
        const { total } = state
        return {
          ...state,
          isLoading: total > 0
        }
      }
    }
  )
  const { currentIndex, total, insertAs2x, isLoading } = state
  const handleSelectedFiles = useCallback(
    async function (files: Array<File>) {
      const total = files.length
      handleChange({ total })
      let currentIndex = 0
      for (const file of files) {
        currentIndex++
        handleChange({ currentIndex })
        const images = await splitImageAsync(file)
        const name = trimExtension(file.name)
        emit('INSERT_BIG_IMAGE', {
          images,
          insertAs2x,
          isDone: currentIndex === total,
          name
        })
      }
    },
    [handleChange, insertAs2x]
  )
  if (isLoading === true) {
    return (
      <Loading>
        {total === 1
          ? 'Uploading image…'
          : `Uploading image ${currentIndex} of ${total}…`}
      </Loading>
    )
  }
  const acceptedFileTypes = ['image/png', 'image/jpeg']
  return (
    <Container space="medium">
      <VerticalSpace space="medium" />
      <FileUploadDropzone
        acceptedFileTypes={acceptedFileTypes}
        multiple
        onSelectedFiles={handleSelectedFiles as any} // FIXME
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
          acceptedFileTypes={acceptedFileTypes}
          disabled={isLoading === true}
          focused // FIXME
          loading={isLoading === true}
          multiple
          onSelectedFiles={handleSelectedFiles as any}
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
        disabled={isLoading === true}
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
