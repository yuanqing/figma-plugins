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
import { useEffect } from 'preact/hooks'

export function MoveLayers (initialState) {
  function submitCallback ({ horizontalOffset, verticalOffset }) {
    triggerEvent('SUBMIT', {
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
  useEffect(
    function () {
      return addEventListener('SELECTION_CHANGED', function ({ hasSelection }) {
        handleInput(hasSelection, 'hasSelection')
      })
    },
    [handleInput]
  )
  const { hasSelection, horizontalOffset, verticalOffset } = inputs
  const evaluatedHorizontalOffset = evaluateNumericExpression(horizontalOffset)
  const evaluatedVerticalOffset = evaluateNumericExpression(verticalOffset)
  const isSubmitButtonDisabled =
    hasSelection === false ||
    ((evaluatedHorizontalOffset === null || evaluatedHorizontalOffset === 0) &&
      (evaluatedVerticalOffset === null || evaluatedVerticalOffset === 0))
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
        disabled={isSubmitButtonDisabled}
        onClick={handleSubmit}
      >
        Move Layers
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
