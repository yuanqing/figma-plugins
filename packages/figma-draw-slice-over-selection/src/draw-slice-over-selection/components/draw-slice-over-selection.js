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
  function submitCallback ({ padding }) {
    triggerEvent('SUBMIT', {
      padding: evaluateNumericExpression(padding)
    })
  }
  function closeCallback () {
    triggerEvent('CLOSE')
  }
  const { inputs, handleInput, handleSubmit } = useForm(
    initialState,
    submitCallback,
    closeCallback,
    true
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleInput(hasSelection, 'hasSelection')
      })
    },
    [handleInput]
  )
  const { hasSelection, padding } = inputs
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
      <Button
        fullWidth
        disabled={
          hasSelection === false || evaluateNumericExpression(padding) === null
        }
        onClick={handleSubmit}
      >
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
