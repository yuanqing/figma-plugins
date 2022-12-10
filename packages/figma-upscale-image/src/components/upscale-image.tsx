import {
  Button,
  Columns,
  Container,
  LoadingIndicator,
  MiddleAlign,
  Muted,
  SegmentedControl,
  Text,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on, once } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Upscaler from 'upscaler'

import { models } from '../utilities/models.js'
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
} from '../utilities/types.js'
import { upscaleImageAsync } from '../utilities/upscale-image-async.js'
import styles from './upscale-image.css'

export function UpscaleImage(props: UpscaleImageProps): JSX.Element {
  const [loading, setLoading] = useState(false)
  const { disabled, formState, initialFocus, handleSubmit, setFormState } =
    useForm<FormState>(props, {
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
      <div class={styles.loading}>
        <MiddleAlign>
          <LoadingIndicator color="brand" />
          <VerticalSpace space="small" />
          <Text align="center">Upscaling image…</Text>
          <VerticalSpace space="extraSmall" />
        </MiddleAlign>
      </div>
    )
  }
  const { scale } = formState
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns>
        <div class={styles.text}>
          <Text>
            <Muted>Scale</Muted>
          </Text>
        </div>
        <SegmentedControl
          {...initialFocus}
          name="scale"
          onValueChange={setFormState}
          options={[
            { children: '2x', value: 2 },
            { children: '3x', value: 3 },
            { children: '4x', value: 4 }
          ]}
          value={scale}
        />
      </Columns>
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Upscale Image
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
