import {
  Button,
  Checkbox,
  Columns,
  Container,
  mapTextboxNumericValueToString,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, MIXED_NUMBER, on } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  Dimensions,
  FormState,
  SelectionChangedHandler,
  SetNodeSizeProps,
  SubmitHandler
} from '../utilities/types.js'

export function SetNodeSize(props: SetNodeSizeProps): JSX.Element {
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<FormState>(props, {
      close: function () {
        emit<CloseUIHandler>('CLOSE_UI')
      },
      submit: function ({ width, height, resizeWithConstraints }: FormState) {
        emit<SubmitHandler>('SUBMIT', { height, resizeWithConstraints, width })
      },
      validate: function ({ width, height }: FormState) {
        return (
          (width !== null && width !== MIXED_NUMBER && width !== 0) ||
          (height !== null && height !== MIXED_NUMBER && height !== 0)
        )
      }
    })
  const [widthString, setWidthString] = useState(
    mapTextboxNumericValueToString(formState.width)
  )
  const [heightString, setHeightString] = useState(
    mapTextboxNumericValueToString(formState.height)
  )
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function ({ width, height }: Dimensions) {
          setWidthString(mapTextboxNumericValueToString(width))
          setHeightString(mapTextboxNumericValueToString(height))
        }
      )
    },
    [setWidthString, setHeightString]
  )
  const { width, height } = formState
  const hasSelection = width !== null && height !== null
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Columns space="extraSmall">
        <TextboxNumeric
          {...initialFocus}
          disabled={hasSelection === false}
          icon="W"
          minimum={0}
          name="width"
          onNumericValueInput={setFormState}
          onValueInput={setWidthString}
          value={widthString}
          variant="border"
        />
        <TextboxNumeric
          disabled={hasSelection === false}
          icon="H"
          minimum={0}
          name="height"
          onNumericValueInput={setFormState}
          onValueInput={setHeightString}
          value={heightString}
          variant="border"
        />
      </Columns>
      <VerticalSpace space="medium" />
      <Checkbox
        disabled={hasSelection === false}
        name="resizeWithConstraints"
        onValueChange={setFormState}
        value={formState.resizeWithConstraints === true}
      >
        <Text>Resize with constraints</Text>
      </Checkbox>
      <VerticalSpace space="large" />
      <Button disabled={disabled === true} fullWidth onClick={handleSubmit}>
        Set Layer Size
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
