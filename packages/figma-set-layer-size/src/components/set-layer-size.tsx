import {
  Button,
  Checkbox,
  Columns,
  Container,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  emit,
  mapTextboxNumberToString,
  MIXED_NUMBER,
  on
} from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  Dimensions,
  SelectionChangedHandler,
  SetLayerSizeProps,
  SubmitHandler
} from '../utilities/types'

export function SetLayerSize(props: SetLayerSizeProps): JSX.Element {
  const { state, handleChange, handleSubmit, initialFocus, isValid } = useForm(
    props,
    {
      onClose: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      onSubmit: function ({
        width,
        height,
        resizeWithConstraints
      }: SetLayerSizeProps) {
        emit<SubmitHandler>('SUBMIT', { height, resizeWithConstraints, width })
      },
      validate: function ({ width, height }: SetLayerSizeProps) {
        return (
          (width !== null && width !== MIXED_NUMBER && width !== 0) ||
          (height !== null && height !== MIXED_NUMBER && height !== 0)
        )
      }
    }
  )
  const [width, setWidth] = useState(mapTextboxNumberToString(state.width))
  const [height, setHeight] = useState(mapTextboxNumberToString(state.height))
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function ({ width, height }: Dimensions) {
          setWidth(mapTextboxNumberToString(width))
          setHeight(mapTextboxNumberToString(height))
        }
      )
    },
    [setWidth, setHeight]
  )
  const disabled = state.width === null && state.height === null
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          {...initialFocus}
          disabled={disabled === true}
          icon="W"
          minimum={0}
          name="width"
          onChange={setWidth}
          onNumberChange={handleChange}
          value={width}
        />
        <TextboxNumeric
          disabled={disabled === true}
          icon="H"
          minimum={0}
          name="height"
          onChange={setHeight}
          onNumberChange={handleChange}
          value={height}
        />
      </Columns>
      <VerticalSpace space="medium" />
      <Checkbox
        disabled={disabled === true}
        name="resizeWithConstraints"
        onChange={handleChange}
        value={state.resizeWithConstraints === true}
      >
        <Text>Resize with constraints</Text>
      </Checkbox>
      <VerticalSpace space="medium" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Set Layer Size
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
