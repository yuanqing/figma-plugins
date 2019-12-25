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
  const { inputs, handleInput, handleSubmit, isValid } = useForm(initialState, {
    validate: function ({ hasSelection, horizontalOffset, verticalOffset }) {
      const evaluatedHorizontalOffset = evaluateNumericExpression(
        horizontalOffset
      )
      const evaluatedVerticalOffset = evaluateNumericExpression(verticalOffset)
      return (
        hasSelection === true &&
        ((evaluatedHorizontalOffset !== null &&
          evaluatedHorizontalOffset !== 0) ||
          (evaluatedVerticalOffset !== null && evaluatedVerticalOffset !== 0))
      )
    },
    submit: function ({ horizontalOffset, verticalOffset }) {
      triggerEvent('SUBMIT', {
        horizontalOffset: evaluateNumericExpression(horizontalOffset),
        verticalOffset: evaluateNumericExpression(verticalOffset)
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
      <Button fullWidth disabled={isValid() === false} onClick={handleSubmit}>
        Move Layers
      </Button>
      <VerticalSpace space='small' />
    </Container>
  )
}
