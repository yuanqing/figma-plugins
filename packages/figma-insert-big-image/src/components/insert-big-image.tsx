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

import { computeDimensions } from '../utilities/compute-dimensions'
import { createImageFromFileAsync } from '../utilities/create-image-from-file-async'
import { splitImageAsync } from '../utilities/split-image-async'
import { trimExtension } from '../utilities/trim-extension'
import { Loading } from './loading/loading'

export function InsertBigImage (initialState) {
  const { state, handleChange } = useForm(
    {
      ...initialState,
      currentIndex: -1,
      total: 0
    },
    {
      transform: function (state) {
        const { total } = state
        return {
          ...state,
          isLoading: total > 0
        }
      },
      onClose: function () {
        emit('CLOSE_UI')
      }
    }
  )
  const { currentIndex, total, insertAs2x, isLoading } = state
  const handleSelectedFiles = useCallback(
    async function (files) {
      const total = files.length
      handleChange({ total })
      let currentIndex = 0
      for (const file of files) {
        currentIndex++
        handleChange({ currentIndex })
        const image = await createImageFromFileAsync(file)
        const widths = computeDimensions(image.width)
        const heights = computeDimensions(image.height)
        const images = await splitImageAsync(image, widths, heights)
        const name = trimExtension(file.name)
        emit('INSERT_BIG_IMAGE', {
          name,
          images,
          insertAs2x,
          width: image.width,
          isDone: currentIndex === total
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
    <Container space='medium'>
      <VerticalSpace space='medium' />
      <FileUploadDropzone
        acceptedFileTypes={acceptedFileTypes}
        multiple
        onSelectedFiles={handleSelectedFiles}
      >
        <Text align='center' bold>
          Drop image files here
        </Text>
        <VerticalSpace space='small' />
        <Text align='center' muted>
          or
        </Text>
        <VerticalSpace space='small' />
        <FileUploadButton
          acceptedFileTypes={acceptedFileTypes}
          multiple
          onSelectedFiles={handleSelectedFiles}
          loading={isLoading === true}
          disabled={isLoading === true}
          focused
        >
          Choose Image Files
        </FileUploadButton>
        <VerticalSpace space='medium' />
        <Text align='center' muted>
          Supported formats: JPEG, PNG
        </Text>
      </FileUploadDropzone>
      <VerticalSpace space='medium' />
      <Checkbox
        name='insertAs2x'
        value={insertAs2x === true}
        onChange={handleChange}
        disabled={isLoading === true}
      >
        <Text>Insert as a @2x image</Text>
      </Checkbox>
    </Container>
  )
}
