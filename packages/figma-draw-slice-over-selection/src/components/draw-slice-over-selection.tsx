/** @jsx h */
import {
  Button,
  Container,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace
} from '@create-figma-plugin/ui'
import {
  emit,
  evaluateNumericExpression,
  on
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function DrawSliceOverSelection(props: {
  [key: string]: any
}): h.JSX.Element {
  const { state, handleChange, handleSubmit, isValid } = useForm(props, {
    validate: function ({ hasSelection, padding }) {
      return (
        hasSelection === true && evaluateNumericExpression(padding) !== null
      )
    },
    onSubmit: function ({ padding }) {
      emit('SUBMIT', {
        padding: evaluateNumericExpression(padding)
      })
    },
    onClose: function () {
      emit('CLOSE_UI')
    }
  })
  useEffect(
    function () {
      return on('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { padding } = state
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Padding</Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        name="padding"
        value={padding}
        minimum={0}
        onChange={handleChange}
      />
      <VerticalSpace space="extraLarge" />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
