/** @jsx h */
import {
  Button,
  Container,
  Text,
  TextboxNumeric,
  VerticalSpace,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  evaluateNumericExpression,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export function DrawSliceOverSelection (initialState) {
  const { inputs, handleInput, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ hasSelection, padding }) {
      return (
        hasSelection === true && evaluateNumericExpression(padding) !== null
      )
    },
    submit: function ({ padding }) {
      triggerEvent('SUBMIT', {
        padding: evaluateNumericExpression(padding)
      })
    },
    close: function () {
      triggerEvent('CLOSE')
    }
  })
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleInput(hasSelection, 'hasSelection')
      })
    },
    [handleInput]
  )
  const { padding } = inputs
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Padding</Text>
      <VerticalSpace space='small' />
      <TextboxNumeric
        name='padding'
        onChange={handleInput}
        propagateEscapeKeyDown
        value={padding}
        focused
      />
      <VerticalSpace space='extraLarge' />
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
