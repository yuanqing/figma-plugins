/** @jsx h */
import {
  Button,
  Columns,
  Container,
  TextboxNumeric,
  VerticalSpace,
  moveDownIcon,
  moveRightIcon,
  useForm
} from '@create-figma-plugin/ui'
import {
  addEventListener,
  evaluateNumericExpression,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export function MoveLayers (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    triggerEvent('MOVE_LAYERS', {
      horizontalOffset: evaluateNumericExpression(horizontalOffset),
      verticalOffset: evaluateNumericExpression(verticalOffset)
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
  const { horizontalOffset, verticalOffset } = inputs
  return (
    <Container space='medium'>
      <VerticalSpace space='large' />
      <Columns space='extraSmall'>
        <TextboxNumeric
          name='horizontalOffset'
          icon={moveRightIcon}
          onChange={handleInput}
          propagateEscapeKeyDown
          value={horizontalOffset}
          focused
        />
        <TextboxNumeric
          name='verticalOffset'
          icon={moveDownIcon}
          onChange={handleInput}
          propagateEscapeKeyDown
          value={verticalOffset}
        />
      </Columns>
      <VerticalSpace space='large' />
      <Button
        fullWidth
        disabled={
          hasSelection === false ||
          (evaluateNumericExpression(horizontalOffset) === null &&
            evaluateNumericExpression(verticalOffset) === null)
        }
        onClick={handleSubmit}
      >
        Move Layers
      </Button>
    </Container>
  )
}
