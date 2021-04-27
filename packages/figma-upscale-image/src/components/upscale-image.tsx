import {
  Button,
  Container,
  Loading,
  SegmentedControl,
  Text,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on, once } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Upscaler from 'upscaler'

import { models } from '../utilities/models'
import {
  CloseUIHandler,
  FormState,
  ImageNodePlainObject,
  Scale,
  SelectionChangedHandler,
  SubmitHandler,
  UpscaleImageProps,
  UpscaleImagesRequestHandler,
  UpscaleImagesResultHandler
} from '../utilities/types'
import { upscaleImageAsync } from '../utilities/upscale-image-async'

export function UpscaleImage(props: UpscaleImageProps): JSX.Element {
  const [loading, setLoading] = useState(false)
  const {
    disabled,
    formState,
    initialFocus,
    handleSubmit,
    setFormState
  } = useForm<FormState>(props, {
    close: function () {
      emit<CloseUIHandler>('CLOSE_UI')
    },
    submit: function ({ scale }: FormState) {
      setLoading(true)
      emit<SubmitHandler>('SUBMIT', { scale })
    },
    validate: function ({ hasSelection }: FormState) {
      return hasSelection === true
    }
  })
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (hasSelection: boolean) {
          setFormState(hasSelection, 'hasSelection')
        }
      )
    },
    [setFormState]
  )
  useEffect(function () {
    once<UpscaleImagesRequestHandler>(
      'UPSCALE_IMAGES_REQUEST',
      async function (
        imageNodePlainObjects: Array<ImageNodePlainObject>,
        scale: Scale
      ) {
        const parentElement = document.createElement('div')
        document.body.appendChild(parentElement)
        parentElement.style.cssText =
          'position: absolute; pointer-events: none; visibility: hidden; overflow: hidden;'
        const upscaler = new Upscaler({
          model: models[`${scale}` as '2' | '3' | '4']
        })
        const result: Array<ImageNodePlainObject> = []
        for (const imageNodePlainObject of imageNodePlainObjects) {
          const upscaledImage = await upscaleImageAsync(imageNodePlainObject, {
            parentElement,
            scale,
            upscaler
          })
          result.push(upscaledImage)
        }
        emit<UpscaleImagesResultHandler>('UPSCALE_IMAGES_RESULT', result)
      }
    )
  }, [])
  if (loading === true) {
    return (
      <Loading>
        <Text align="center">Upscaling image…</Text>
        <VerticalSpace space="extraLarge" />
      </Loading>
    )
  }
  const { scale } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Scale</Text>
      <VerticalSpace space="small" />
      <SegmentedControl
        name="scale"
        onValueChange={setFormState}
        options={[
          { children: '2x', value: 2 },
          { children: '3x', value: 3 },
          { children: '4x', value: 4 }
        ]}
        value={scale}
      />
      <VerticalSpace space="large" />
      <Button
        {...initialFocus}
        disabled={disabled}
        fullWidth
        onClick={handleSubmit}
      >
        Upscale Image
      </Button>
    </Container>
  )
}
