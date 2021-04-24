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
  mapTextboxNumericValueToString,
  MIXED_NUMBER,
  on
} from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  Dimensions,
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types'

export function SetLayerSize(props: FormState): JSX.Element {
  const {
    formState,
    setFormState,
    handleSubmit,
    initialFocus,
    disabled
  } = useForm(props, {
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
  const [width, setWidth] = useState(
    mapTextboxNumericValueToString(formState.width)
  )
  const [height, setHeight] = useState(
    mapTextboxNumericValueToString(formState.height)
  )
  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function ({ width, height }: Dimensions) {
          setWidth(mapTextboxNumericValueToString(width))
          setHeight(mapTextboxNumericValueToString(height))
        }
      )
    },
    [setWidth, setHeight]
  )
  const hasSelection = formState.width !== null && formState.height !== null
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
          onNumericValueChange={setFormState}
          onValueChange={setWidth}
          value={width}
        />
        <TextboxNumeric
          disabled={hasSelection === false}
          icon="H"
          minimum={0}
          name="height"
          onNumericValueChange={setFormState}
          onValueChange={setHeight}
          value={height}
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
      <VerticalSpace space="medium" />
      <Button disabled={disabled} fullWidth onClick={handleSubmit}>
        Set Layer Size
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
