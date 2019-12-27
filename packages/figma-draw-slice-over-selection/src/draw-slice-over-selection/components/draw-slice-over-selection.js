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
  const { state, handleChange, handleSubmit, isInvalid } = useForm(
    initialState,
    {
      validate: function ({ hasSelection, padding }) {
        return (
          hasSelection === true && evaluateNumericExpression(padding) !== null
        )
      },
      onClose: function () {
        triggerEvent('CLOSE')
      },
      onSubmit: function ({ padding }) {
        triggerEvent('SUBMIT', {
          padding: evaluateNumericExpression(padding)
        })
      }
    }
  )
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleChange({ hasSelection })
      })
    },
    [handleChange]
  )
  const { padding } = state
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Padding</Text>
      <VerticalSpace space='small' />
      <TextboxNumeric
        name='padding'
        onChange={handleChange}
        propagateEscapeKeyDown
        value={padding}
        focused
      />
      <VerticalSpace space='extraLarge' />
      <Button fullWidth disabled={isInvalid() === true} onClick={handleSubmit}>
        Draw Slice Over Selection
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
