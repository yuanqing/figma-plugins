/** @jsx h */
import {
  Checkbox,
  Container,
  ButtonUploadFile,
  Text,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import { triggerEvent } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import { computeDimensions } from '../utilities/compute-dimensions'
import { createImageFromFile } from '../utilities/create-image-from-file'
import { splitImage } from '../utilities/split-image'
import { trimExtension } from '../utilities/trim-extension'

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
        triggerEvent('CLOSE')
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
        const image = await createImageFromFile(file)
        const widths = computeDimensions(image.width)
        const heights = computeDimensions(image.height)
        const images = await splitImage(image, widths, heights)
        const name = trimExtension(file.name)
        triggerEvent('INSERT_BIG_IMAGE', {
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
  return (
    <Container space='medium'>
      <VerticalSpace space='extraLarge' />
      <Checkbox
        name='insertAs2x'
        value={insertAs2x === true}
        onChange={handleChange}
        disabled={isLoading === true}
      >
        <Text>Insert as 2x</Text>
      </Checkbox>
      <VerticalSpace space='medium' />
      <ButtonUploadFile
        accept='image/png, image/jpeg'
        multiple
        onSelectedFiles={handleSelectedFiles}
        fullWidth
        loading={isLoading === true}
        disabled={isLoading === true}
      >
        Choose image files
      </ButtonUploadFile>
      <VerticalSpace space='medium' />
      <Text align='center' muted>
        {total === 0
          ? 'Supported formats: JPEG, PNG'
          : total === 1
          ? 'Processing image…'
          : `Processing image ${currentIndex} of ${total}…`}
      </Text>
      <VerticalSpace space='extraLarge' />
    </Container>
  )
}
