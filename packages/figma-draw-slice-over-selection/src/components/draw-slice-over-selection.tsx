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
    onClose: function () {
      emit('CLOSE_UI')
    },
    onSubmit: function ({ padding }) {
      emit('SUBMIT', {
        padding: evaluateNumericExpression(padding)
      })
    },
    validate: function ({ hasSelection, padding }) {
      return (
        hasSelection === true && evaluateNumericExpression(padding) !== null
      )
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
        minimum={0}
        name="padding"
        onChange={handleChange}
        value={padding}
      />
      <VerticalSpace space="extraLarge" />
      <Button disabled={isValid() === false} fullWidth onClick={handleSubmit}>
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}
