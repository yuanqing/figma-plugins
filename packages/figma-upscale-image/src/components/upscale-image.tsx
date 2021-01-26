/** @jsx h */
import {
  Button,
  Container,
  SegmentedControl,
  Text,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on, once } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import Upscaler from 'upscaler'

import { models } from '../utilities/models'
import { upscaleImageAsync } from '../utilities/upscale-image-async'

export function UpscaleImage(props: { [key: string]: any }): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(
    { ...props, isLoading: false },
    {
      onClose: function () {
        emit('CLOSE_UI')
      },
      onSubmit: function ({ scale }) {
        handleChange({ isLoading: true })
        emit('SUBMIT', { scale })
      },
      validate: function ({ hasSelection }) {
        return hasSelection === true
      }
    }
  )
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  useEffect(function () {
    once('UPSCALE_IMAGES', async function ({ scale, images }) {
      const parentElement = document.createElement('div')
      document.body.appendChild(parentElement)
      parentElement.style.cssText =
        'position: absolute; pointer-events: none; visibility: hidden; overflow: hidden;'
      const upscaler = new Upscaler({
        model: models[`${scale}` as '2' | '3' | '4']
      })
      for (const image of images) {
        const result = await upscaleImageAsync(
          image,
          scale,
          parentElement,
          upscaler
        )
        emit('UPSCALE_IMAGE_RESULT', result)
      }
      emit('CLOSE_UI')
    })
  }, [])
  const { isLoading, scale } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Scale</Text>
      <VerticalSpace space="small" />
      <SegmentedControl
        name="scale"
        onChange={handleChange}
        options={[
          { text: '2x', value: 2 },
          { text: '3x', value: 3 },
          { text: '4x', value: 4 }
        ]}
        value={scale}
      />
      <VerticalSpace space="large" />
      <Button
        disabled={isValid() === false}
        fullWidth
        loading={isLoading === true}
        onClick={handleSubmit}
      >
        Upscale Image
      </Button>
    </Container>
  )
}
