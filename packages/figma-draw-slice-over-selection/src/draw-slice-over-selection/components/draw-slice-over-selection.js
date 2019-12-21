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
import { useEffect, useState } from 'preact/hooks'

export function DrawSliceOverSelection (initialState) {
  function submitCallback ({ padding }) {
    triggerEvent('DRAW_SLICE_OVER_SELECTION', {
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
  const [hasSelection, setHasSelection] = useState(true)
  useEffect(function () {
    return addEventListener('SELECTION_CHANGED', function (hasSelection) {
      setHasSelection(hasSelection)
    })
  }, [])
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Text muted>Padding</Text>
      <VerticalSpace space='small' />
      <TextboxNumeric
        name='padding'
        onChange={handleInput}
        value={inputs.padding}
        focused
      />
      <VerticalSpace space='extraLarge' />
      <Button
        fullWidth
        disabled={hasSelection === false || isNaN(parseFloat(inputs.padding))}
        onClick={handleSubmit}
      >
        Draw Slice Over Selection
      </Button>
    </Container>
  )
}
